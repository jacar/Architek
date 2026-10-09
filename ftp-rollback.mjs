import * as ftp from 'basic-ftp';

async function rollback() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "archtekstudio.com",
      user: "abordo@archtekstudio.com",
      password: "Fcreative2026**",
      port: 21,
    });
    
    // Attempt to remove the files we just uploaded to prevent breaking the live site
    try { await client.remove("index.html"); } catch(e) {}
    try { await client.removeDir("assets"); } catch(e) {}
    
    console.log("Rollback completed.");
  } catch (err) {
    console.error("FTP Error:", err);
  }
  client.close();
}

rollback();
