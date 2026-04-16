'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Grid, List } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')

  const categories = ['All', 'Wedding', 'Portrait', 'Events', 'Pre-wedding']

  const portfolioImages = [
    { id: 1, category: 'Wedding', title: 'Romantic Sunset Ceremony', aspect: 'portrait' },
    { id: 2, category: 'Portrait', title: 'Professional Headshot', aspect: 'square' },
    { id: 3, category: 'Events', title: 'Corporate Gala Night', aspect: 'landscape' },
    { id: 4, category: 'Pre-wedding', title: 'Beach Couple Shoot', aspect: 'landscape' },
    { id: 5, category: 'Wedding', title: 'Traditional Indian Wedding', aspect: 'portrait' },
    { id: 6, category: 'Portrait', title: 'Creative Fashion Portrait', aspect: 'square' },
    { id: 7, category: 'Events', title: 'Birthday Celebration', aspect: 'landscape' },
    { id: 8, category: 'Pre-wedding', title: 'Urban City Romance', aspect: 'portrait' },
    { id: 9, category: 'Wedding', title: 'Garden Wedding Dreams', aspect: 'landscape' },
    { id: 10, category: 'Portrait', title: 'Artistic Black & White', aspect: 'square' },
    { id: 11, category: 'Events', title: 'Product Launch Event', aspect: 'landscape' },
    { id: 12, category: 'Pre-wedding', title: 'Mountain Adventure', aspect: 'portrait' },
    { id: 13, category: 'Wedding', title: 'Luxury Resort Wedding', aspect: 'landscape' },
    { id: 14, category: 'Portrait', title: 'Environmental Portrait', aspect: 'square' },
    { id: 15, category: 'Events', title: 'Award Ceremony', aspect: 'landscape' },
    { id: 16, category: 'Pre-wedding', title: 'Vintage Romance', aspect: 'portrait' },
  ]

  const filteredImages = selectedCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory)

  const getAspectRatio = (aspect: string) => {
    switch(aspect) {
      case 'portrait': return 'aspect-[3/4]'
      case 'landscape': return 'aspect-[4/3]'
      case 'square': return 'aspect-square'
      default: return 'aspect-square'
    }
  }

  const getMasonryHeight = (aspect: string) => {
    switch(aspect) {
      case 'portrait': return 'h-96'
      case 'landscape': return 'h-64'
      case 'square': return 'h-80'
      default: return 'h-80'
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowRight' && selectedImage !== null) {
        setSelectedImage((prev) => (prev !== null && prev < filteredImages.length - 1) ? prev + 1 : 0)
      }
      if (e.key === 'ArrowLeft' && selectedImage !== null) {
        setSelectedImage((prev) => (prev !== null && prev > 0) ? prev - 1 : filteredImages.length - 1)
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, filteredImages.length])

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Explore our diverse collection of photography work across different categories. 
              Each image tells a unique story captured through our lens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold text-charcoal'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry' ? 'bg-gold text-charcoal' : 'bg-gray-800 text-gray-300'
                }`}
                aria-label="Masonry view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-gold text-charcoal' : 'bg-gray-800 text-gray-300'
                }`}
                aria-label="Grid view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'masonry' ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="break-inside-avoid mb-4"
                >
                  <div
                    className="relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className={getMasonryHeight(image.aspect)}>
                      <Image
                        src={`/api/placeholder/400/${image.aspect === 'portrait' ? 600 : image.aspect === 'landscape' ? 300 : 400}`}
                        alt={image.title}
                        fill
                        className="object-cover image-hover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-gold text-sm font-medium">{image.category}</p>
                      <h3 className="text-white font-semibold">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className={getAspectRatio(image.aspect)}>
                    <Image
                      src={`/api/placeholder/400/${image.aspect === 'portrait' ? 600 : image.aspect === 'landscape' ? 300 : 400}`}
                      alt={image.title}
                      fill
                      className="object-cover image-hover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-gold text-sm font-medium">{image.category}</p>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={`/api/placeholder/1200/800`}
                  alt={filteredImages[selectedImage].title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-gold text-sm font-medium">{filteredImages[selectedImage].category}</p>
                <h3 className="text-white text-xl font-semibold">{filteredImages[selectedImage].title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Portfolio
