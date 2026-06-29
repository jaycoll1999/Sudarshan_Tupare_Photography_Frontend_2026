import fs from 'fs'
import path from 'path'
import { portfolioCategories } from '@/data/portfolioData'
import PortfolioGallery from '@/components/portfolio/PortfolioGallery'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatbotButton from '@/components/ChatbotButton'

export const dynamic = 'force-dynamic';

function getImagesFromFolder(folderName: string): string[] {
  const folderPath = path.join(process.cwd(), 'public', 'images', 'portfolio', folderName)
  try {
    if (!fs.existsSync(folderPath)) return []
    const files = fs.readdirSync(folderPath)
    return files
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map(f => encodeURI(`/images/portfolio/${folderName}/${f}`))
  } catch (error) {
    console.error(`Error reading folder ${folderName}:`, error)
    return []
  }
}

function getVideosFromFolder(folderName: string): string[] {
  const folderPath = path.join(process.cwd(), 'public', 'images', 'portfolio', folderName)
  try {
    if (!fs.existsSync(folderPath)) return []
    const files = fs.readdirSync(folderPath)
    return files
      .filter(f => /\.(mp4|webm|mov)$/i.test(f))
      .map(f => encodeURI(`/images/portfolio/${folderName}/${f}`))
  } catch (error) {
    console.error(`Error reading videos from folder ${folderName}:`, error)
    return []
  }
}

export const metadata = {
  title: 'Portfolio | Sidography Photography & Films',
  description: 'Explore our professional photography portfolio across various styles and occasions.',
}

async function getBackendPortfolio() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    const res = await fetch(`${API_URL}/portfolio/`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching backend portfolio:', error);
  }
  return [];
}

export default async function PortfolioPage() {
  const backendData = await getBackendPortfolio();
  const categoriesWithImages = portfolioCategories.map(cat => ({
    ...cat,
    images: getImagesFromFolder(cat.folder),
    videos: getVideosFromFolder(cat.folder),
  }))

  const allImages = categoriesWithImages.flatMap(cat => 
    cat.images.map(img => ({ src: img, category: cat.title, type: 'image' as const }))
  )

  const allVideos = categoriesWithImages.flatMap(cat =>
    cat.videos.map(vid => ({ src: vid, category: cat.title, type: 'video' as const }))
  )

  const backendMedia = backendData.map((item: any) => ({
    src: item.image_url,
    category: item.category === 'Babyshoot' ? 'Baby Shoot' : item.category,
    type: item.image_url.match(/\.(mp4|webm|mov)$/i) ? 'video' as const : 'image' as const
  }))

  const allMedia = [...allImages, ...allVideos, ...backendMedia]

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-charcoal">
      <Navbar />
      
      {/* Section Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our work across different photography styles. Each click captures a story, a moment, and an emotion frozen in time.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <PortfolioGallery 
          categories={categoriesWithImages} 
          allImages={allMedia} 
        />
      </section>

      <Footer />
      <WhatsAppButton />
      <ChatbotButton />
    </main>
  )
}
