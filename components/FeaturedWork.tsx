'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedProject {
  id: number
  category: string
  title: string
  src: string
}

const featuredProjects: FeaturedProject[] = [
  { id: 1, category: 'Pre Wedding', title: 'Pre-Wedding Romance', src: '/images/portfolio/Pre%20Wedding/DSC_0196ED.webp' },
  { id: 2, category: 'Pre Wedding', title: 'Dreamy Pre-Wedding', src: '/images/portfolio/Pre%20Wedding/SID_1830ED.webp' },
  { id: 3, category: 'Candid', title: 'Candid Moments', src: '/images/portfolio/Candid/DSC_0489ED.webp' },
  { id: 4, category: 'Candid', title: 'Natural Emotions', src: '/images/portfolio/Candid/SID_5356ED.webp' },
  { id: 5, category: 'Engagement', title: 'Engagement Ceremony', src: '/images/portfolio/Engagement/DSC08038ED.webp' },
  { id: 6, category: 'Engagement', title: 'Ring Ceremony', src: '/images/portfolio/Engagement/DSC08042ED.webp' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function FeaturedWork() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-gold/80 text-sm font-medium tracking-[0.2em] uppercase mb-4"
          >
            Portfolio Highlights
          </motion.span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A glimpse into our recent photography sessions — each frame crafted with passion and precision
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/30 ring-1 ring-white/[0.06]">
                {/* Image */}
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={true}
                />

                {/* Default subtle bottom gradient (always visible) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Hover overlay — dark gradient + glass */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out backdrop-blur-[2px]" />

                {/* Bottom content — always visible title, enhanced on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  {/* Category badge */}
                  <span className="inline-block text-gold/90 text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {project.category}
                  </span>
                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg md:text-xl leading-snug mb-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    {project.title}
                  </h3>

                  {/* View Project button — appears on hover */}
                  <div className="flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors duration-200"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/15 backdrop-blur-sm border border-gold/20">
                        <Eye size={14} className="text-gold" />
                      </span>
                      View Project
                    </Link>
                  </div>
                </div>

                {/* Top-right corner accent on hover */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out delay-100">
                  <ArrowRight size={16} className="text-white -rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/portfolio"
            className="group/btn inline-flex items-center gap-3 border border-gold/40 text-gold font-semibold px-8 py-3.5 rounded-full hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
