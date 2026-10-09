import * as ftp from 'basic-ftp';
import * as dotenv from 'dotenv';
dotenv.config();

async function listFTP() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT ? parseInt(process.env.FTP_PORT, 10) : 21,
    });
    console.log("Connected. Listing root directory / :");
    const listRoot = await client.list("/");
    console.log(listRoot.map(item => item.name));
    
  } catch (err) {
    console.error(err);
  }
  client.close();
}
listFTP();
