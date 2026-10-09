import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function uploadIncremental(client, localDirPath, remoteDirPath) {
  await client.ensureDir(remoteDirPath);
  const remoteFiles = await client.list(remoteDirPath);
  const remoteMap = new Map();
  for (const f of remoteFiles) {
    remoteMap.set(f.name, f.size);
  }

  const localFiles = fs.readdirSync(localDirPath, { withFileTypes: true });

  for (const item of localFiles) {
    const localFilePath = path.join(localDirPath, item.name);
    const remoteFilePath = `${remoteDirPath}/${item.name}`;

    if (item.isDirectory()) {
      await uploadIncremental(client, localFilePath, remoteFilePath);
    } else {
      const stats = fs.statSync(localFilePath);
      const remoteSize = remoteMap.get(item.name);
      const alwaysUpload = item.name.endsWith('.php');

      if (!alwaysUpload && remoteSize !== undefined && remoteSize === stats.size) {
        console.log(`[SKIP - up to date] ${item.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      } else {
        console.log(`[UPLOADING${alwaysUpload ? ' (forced)' : ''}] ${item.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        await client.uploadFrom(localFilePath, remoteFilePath);
        console.log(`[DONE] ${item.name}`);
      }
    }
  }

  // Clean up obsolete files from remote assets directory
  if (localDirPath.endsWith('assets')) {
    const localNameSet = new Set(localFiles.map(f => f.name));
    const obsoleteExtensions = ['.png', '.jpg', '.jpeg', '.heic', '.PNG', '.JPG', '.JPEG', '.HEIC'];
    for (const remoteFile of remoteFiles) {
      const isObsoleteBundle = (remoteFile.name.startsWith('index-') && (remoteFile.name.endsWith('.js') || remoteFile.name.endsWith('.css'))) && !localNameSet.has(remoteFile.name);
      const isOldImage = obsoleteExtensions.some(ext => remoteFile.name.endsWith(ext)) && !localNameSet.has(remoteFile.name);
      
      if (isObsoleteBundle || isOldImage) {
        console.log(`[CLEANING OBSOLETE] ${remoteFile.name}...`);
        try {
          await client.remove(`${remoteDirPath}/${remoteFile.name}`);
          console.log(`[REMOVED] ${remoteFile.name}`);
        } catch (e) {
          console.warn(`Could not remove ${remoteFile.name}:`, e.message);
        }
      }
    }
  }
}

async function updateHtaccess(client) {
  try {
    console.log("Checking /public_html/.htaccess for cache accelerator rules...");
    const { PassThrough } = await import('stream');
    const stream = new PassThrough();
    let content = '';
    stream.on('data', d => content += d.toString());
    
    await client.downloadTo(stream, '/public_html/.htaccess');

    const cacheBlock = `
# BEGIN Archtek Cache Accelerator
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(webp|jpg|jpeg|png|gif|svg|ico|woff2|woff|ttf|css|js)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
# END Archtek Cache Accelerator
`;

    if (!content.includes('BEGIN Archtek Cache Accelerator')) {
      const newHtaccess = cacheBlock.trim() + '\n\n' + content.trim();
      fs.writeFileSync('temp-htaccess', newHtaccess);
      await client.uploadFrom('temp-htaccess', '/public_html/.htaccess');
      if (fs.existsSync('temp-htaccess')) fs.unlinkSync('temp-htaccess');
      console.log("Uploaded updated .htaccess with 1-year browser cache and Gzip compression!");
    } else {
      console.log(".htaccess already has Archtek Cache Accelerator configured.");
    }
  } catch (err) {
    console.warn("Could not update .htaccess:", err.message);
  }
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 60000;

  try {
    console.log("Connecting to FTP...");
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21,
    });

    const targetDir = process.env.FTP_DIR || "/public_html/wp-content/themes/archtek-react";
    console.log(`Connected! Target theme directory: ${targetDir}`);

    const localWpTheme = path.join(process.cwd(), 'wp-theme');
    if (!fs.existsSync(localWpTheme)) {
      throw new Error("wp-theme directory does not exist! Run 'node build-wp.mjs' first.");
    }

    console.log("Starting smart incremental deployment...");
    await uploadIncremental(client, localWpTheme, targetDir);

    // Apply Apache Cache & Compression rules to entire WordPress site
    await updateHtaccess(client);

    console.log("=========================================");
    console.log("Deployment and Site Caching completed successfully!");
    console.log("=========================================");
  } catch (err) {
    console.error("FTP Error during deployment:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();

