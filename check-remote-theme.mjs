import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
dotenv.config();

async function checkTheme() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21,
    });
    
    console.log("Connected to FTP.");
    const themeDir = "/public_html/wp-content/themes/archtek-react";
    console.log(`Checking ${themeDir}...`);
    const files = await client.list(themeDir);
    console.log("Files in theme:", files.map(f => f.name));
  } catch (err) {
    console.error("FTP Error:", err);
  }
  client.close();
}

checkTheme();
