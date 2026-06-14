'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  title: string
  folder: string
  images: string[]
  videos?: string[]
}

interface MediaItem {
  src: string
  category: string
  type: 'image' | 'video'
}

interface PortfolioGalleryProps {
  categories: Category[]
  allImages: MediaItem[]
}

export default function PortfolioGallery({ categories, allImages }: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const filteredImages = selectedCategory === 'All' 
    ? (() => {
        // Show 2 items per category as a curated preview in "All" tab
        const grouped: Record<string, MediaItem[]> = {}
        allImages.forEach(img => {
          if (!grouped[img.category]) grouped[img.category] = []
          grouped[img.category].push(img)
        })
        return Object.values(grouped).flatMap(items => items.slice(0, 2))
      })()
    : allImages.filter(img => img.category === selectedCategory)

  const categoryTabs = [{ id: 'all', title: 'All' }, ...categories]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev !== null && prev < filteredImages.length - 1) ? prev + 1 : 0)
      }
      if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((prev) => (prev !== null && prev > 0) ? prev - 1 : filteredImages.length - 1)
      }
    }

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImageIndex, filteredImages.length])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.title)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === tab.title
                ? 'bg-gold text-charcoal scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No photos found in this category yet.</p>
        </div>
      )}

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((media, index) => (
            <motion.div
              key={media.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5]"
              onClick={() => setSelectedImageIndex(index)}
            >
              {media.type === 'video' ? (
                <>
                  <video
                    src={media.src}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Play className="text-gray-900 dark:text-white ml-1" size={28} fill="white" />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={media.src}
                  alt={`${media.category} - Portfolio ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={true}
                />
              )}
              <div className="absolute inset-0 bg-white dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-gray-900 dark:text-white font-medium text-lg border-b-2 border-gold pb-1">
                  {media.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-5 right-5 text-gray-900 dark:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-5 text-gray-900 dark:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : filteredImages.length - 1)
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <button
              className="absolute right-5 text-gray-900 dark:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex(selectedImageIndex < filteredImages.length - 1 ? selectedImageIndex + 1 : 0)
              }}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredImages[selectedImageIndex].type === 'video' ? (
                <video
                  src={filteredImages[selectedImageIndex].src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={filteredImages[selectedImageIndex].src}
                  alt="Enlarged view"
                  fill
                  className="object-contain"
                  priority
                  unoptimized={true}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
