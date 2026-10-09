import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function convertFile(inputPath, outputPath, isLogo = false) {
  try {
    let pipeline = sharp(inputPath);
    if (isLogo) {
      pipeline = pipeline.resize({ width: 400, height: 200, fit: 'inside', withoutEnlargement: true });
      await pipeline.webp({ quality: 90, alphaQuality: 90, effort: 4 }).toFile(outputPath);
    } else {
      pipeline = pipeline.resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
      await pipeline.webp({ quality: 82, effort: 4 }).toFile(outputPath);
    }
    const origSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const saved = ((1 - newSize / origSize) * 100).toFixed(1);
    console.log(`[CONVERTED] ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${(origSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(1)} KB, -${saved}%)`);
    return { origSize, newSize };
  } catch (err) {
    console.error(`[ERROR] converting ${inputPath}:`, err.message);
    return null;
  }
}

async function convertDir(dirPath, isLogo = false) {
  let totalOrig = 0;
  let totalNew = 0;
  let count = 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const sub = await convertDir(fullPath, isLogo);
      totalOrig += sub.totalOrig;
      totalNew += sub.totalNew;
      count += sub.count;
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !entry.name.endsWith('.webp')) {
      // Determine webp output name
      // e.g., 'DSC01090.jpg.jpeg' -> 'DSC01090.webp'
      // or '0930702D.JPG.jpeg' -> '0930702D.webp'
      // or 'DSC00423.png' -> 'DSC00423.webp'
      let cleanName = entry.name.replace(/\.(jpe?g|png)+$/i, '');
      cleanName = cleanName.replace(/\.(jpg|jpeg|png)$/i, '');
      const outPath = path.join(dirPath, `${cleanName}.webp`);

      const res = await convertFile(fullPath, outPath, isLogo);
      if (res) {
        totalOrig += res.origSize;
        totalNew += res.newSize;
        count++;
      }
    }
  }

  return { totalOrig, totalNew, count };
}

async function main() {
  console.log('--- STARTING BULK WEBP CONVERSION ---');

  console.log('\n1. Converting src/PROYECTOS...');
  const projRes = await convertDir(path.join(process.cwd(), 'src', 'PROYECTOS'), false);

  console.log('\n2. Converting src/Marcas Aliadas...');
  const marcasRes = await convertDir(path.join(process.cwd(), 'src', 'Marcas Aliadas'), true);

  console.log('\n3. Converting public/images...');
  const publicRes = await convertDir(path.join(process.cwd(), 'public', 'images'), false);

  const totalOrig = projRes.totalOrig + marcasRes.totalOrig + publicRes.totalOrig;
  const totalNew = projRes.totalNew + marcasRes.totalNew + publicRes.totalNew;
  const totalCount = projRes.count + marcasRes.count + publicRes.count;

  console.log('\n======================================================');
  console.log(`TOTAL CONVERTED: ${totalCount} images`);
  console.log(`ORIGINAL TOTAL SIZE: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`NEW WEBP TOTAL SIZE: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL SAVINGS: ${((1 - totalNew / totalOrig) * 100).toFixed(1)}%`);
  console.log('======================================================\n');
}

main();
