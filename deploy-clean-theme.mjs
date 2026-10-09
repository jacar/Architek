import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
dotenv.config();

async function deployClean() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21,
    });
    
    const themeDir = "/public_html/wp-content/themes/archtek-react";
    console.log("Connected to FTP. Cleaning up old PHP templates in theme...");
    
    const filesToRemove = [
      'front-page.php',
      'page.php',
      'header.php',
      'footer.php',
      'functions.php',
      'assets/archtek-effects.js',
      'assets/archtek-luxury.css'
    ];

    for (const f of filesToRemove) {
      try {
        await client.remove(`${themeDir}/${f}`);
        console.log(`Removed ${f}`);
      } catch (e) {}
    }

    console.log("Uploading pure React theme from wp-theme...");
    await client.uploadFromDir("wp-theme", themeDir);
    console.log("Theme deployed cleanly!");
  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

deployClean();
