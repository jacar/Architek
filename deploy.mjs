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

      if (remoteSize !== undefined && remoteSize === stats.size) {
        console.log(`[SKIP - up to date] ${item.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      } else {
        console.log(`[UPLOADING] ${item.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        await client.uploadFrom(localFilePath, remoteFilePath);
        console.log(`[DONE] ${item.name}`);
      }
    }
  }

  // Clean up obsolete old index-*.js and index-*.css if they are not in local assets
  if (localDirPath.endsWith('assets')) {
    const localNameSet = new Set(localFiles.map(f => f.name));
    for (const remoteFile of remoteFiles) {
      if (
        (remoteFile.name.startsWith('index-') && (remoteFile.name.endsWith('.js') || remoteFile.name.endsWith('.css'))) &&
        !localNameSet.has(remoteFile.name)
      ) {
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

    console.log("=========================================");
    console.log("Deployment completed successfully!");
    console.log("=========================================");
  } catch (err) {
    console.error("FTP Error during deployment:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
