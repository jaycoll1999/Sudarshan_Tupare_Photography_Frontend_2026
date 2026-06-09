const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const portfolioDir = path.join(__dirname, 'public', 'images', 'portfolio');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Only process webp files
      if (ext === '.webp') {
        try {
          // Read into a native Node buffer to avoid ALL file locks
          const inBuffer = fs.readFileSync(fullPath);
          const metadata = await sharp(inBuffer).metadata();
          
          if (metadata.width > 1080) {
            console.log(`Resizing: ${file} (Current width: ${metadata.width})`);
            
            // Process buffer
            const outBuffer = await sharp(inBuffer)
              .resize(1080, null, { withoutEnlargement: true })
              .webp({ quality: 75 })
              .toBuffer();
              
            // Write buffer back to the original file
            fs.writeFileSync(fullPath, outBuffer);
            console.log(`Successfully compressed ${file}`);
          }
        } catch (err) {
          console.error(`Failed to process ${file}:`, err.message);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting perfect buffer-based compression...');
  await processDirectory(portfolioDir);
  console.log('Finished compressing images!');
}

run();
