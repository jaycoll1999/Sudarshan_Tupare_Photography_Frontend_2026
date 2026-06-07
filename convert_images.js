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
      // Only process jpg, jpeg, png files
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const newFilePath = path.join(dir, path.basename(file, path.extname(file)) + '.webp');
        
        try {
          console.log(`Converting: ${fullPath}`);
          // Convert to webp with 80 quality (visually identical but much smaller)
          await sharp(fullPath)
            .webp({ quality: 80, effort: 4 })
            .toFile(newFilePath);
            
          console.log(`Successfully converted. Deleting original: ${fullPath}`);
          // Delete original file
          fs.unlinkSync(fullPath);
        } catch (err) {
          console.error(`Failed to process ${fullPath}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image conversion...');
  await processDirectory(portfolioDir);
  console.log('Finished converting images to WebP!');
}

run();
