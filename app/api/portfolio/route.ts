import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function safeReadDir(folderPath: string): string[] {
  try {
    if (!fs.existsSync(folderPath)) return [];
    return fs.readdirSync(folderPath);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio');
  
  const folders = safeReadDir(portfolioDir);
  const allImages: { src: string; category: string }[] = [];

  folders.forEach(folder => {
    const folderPath = path.join(portfolioDir, folder);
    const stats = fs.statSync(folderPath);
    
    if (stats.isDirectory()) {
      const files = safeReadDir(folderPath);
      files.forEach(file => {
        if (/\.(jpg|jpeg|png|webp|mp4|webm|mov)$/i.test(file)) {
          allImages.push({
            src: `/images/portfolio/${folder}/${file}`,
            category: folder.replace(/_/g, ' ')
          });
        }
      });
    }
  });

  return NextResponse.json(allImages);
}
