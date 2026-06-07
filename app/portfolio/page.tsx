import fs from 'fs'
import path from 'path'
import { portfolioCategories } from '@/data/portfolioData'
import PortfolioGallery from '@/components/portfolio/PortfolioGallery'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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
  title: 'Portfolio | Sudarshan Tupare Photography',
  description: 'Explore our professional photography portfolio across various styles and occasions.',
}

export default function PortfolioPage() {
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

  const allMedia = [...allImages, ...allVideos]

  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      
      {/* Section Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
    </main>
  )
}
