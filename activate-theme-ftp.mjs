import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function run() {
  const phpCode = `<?php
require_once __DIR__ . '/wp-load.php';
if (!defined('ABSPATH')) exit;
switch_theme('archtek-react');
echo 'THEME_SWITCHED:' . get_stylesheet();
`;
  
  fs.writeFileSync('temp-activate.php', phpCode);

  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21,
    });
    
    console.log("Connected to FTP. Uploading temp-activate.php to /public_html...");
    await client.uploadFrom('temp-activate.php', '/public_html/temp-activate.php');
    console.log("Uploaded. Calling endpoint...");

    const res = await fetch('https://www.archtekstudio.com/temp-activate.php');
    const text = await res.text();
    console.log("Server response:", text);

    console.log("Removing temp-activate.php from server...");
    await client.remove('/public_html/temp-activate.php');
    console.log("Cleaned up successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
    if (fs.existsSync('temp-activate.php')) {
      fs.unlinkSync('temp-activate.php');
    }
  }
}

run();
