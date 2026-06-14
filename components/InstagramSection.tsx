'use client'

import { motion } from 'framer-motion'
import { Instagram, Play } from 'lucide-react'
import Image from 'next/image'

interface InstagramItem {
  category: string
  title: string
  src: string
  type: 'image' | 'video'
}

const instagramItems: InstagramItem[] = [
  { category: 'Baby Shoot', title: 'Newborn Photoshoot', src: '/images/portfolio/Babyshoot/DSC_3219ED.webp', type: 'image' },
  { category: 'Candid', title: 'Candid Moments', src: '/images/portfolio/Candid/DSC_2300ED.webp', type: 'image' },
  { category: 'Engagement', title: 'Engagement Shoot', src: '/images/portfolio/Engagement/DSC_3424ED.webp', type: 'image' },
  { category: 'Maternity Shoot', title: 'Maternity Photography', src: '/images/portfolio/Maternity%20Shoot/DSC_8005ED.webp', type: 'image' },
  { category: 'Pre Wedding', title: 'Pre-Wedding Session', src: '/images/portfolio/Pre%20Wedding/SID_1842ED.webp', type: 'image' },
  { category: 'Model Photoshoot', title: 'Model Portfolio', src: '/images/portfolio/Model%20Photoshoot/_MG_6932ED.webp', type: 'image' },
  { category: 'Baby Shoot', title: 'Baby Photography', src: '/images/portfolio/Babyshoot/DSC_3364ED.webp', type: 'image' },
  { category: 'Candid', title: 'Natural Candid', src: '/images/portfolio/Candid/SID_9469ED.webp', type: 'image' },
  { category: 'Engagement', title: 'Ring Ceremony', src: '/images/portfolio/Engagement/DSC08038ED.webp', type: 'image' },
  { category: 'Cinematic', title: 'Cinematic Wedding Film', src: '/images/portfolio/Cinematic/Teaser.mp4', type: 'video' },
  { category: 'Pre Wedding', title: 'Wedding Romance', src: '/images/portfolio/Pre%20Wedding/DSC_0375ED.webp', type: 'image' },
  { category: 'Model Photoshoot', title: 'Fashion Photography', src: '/images/portfolio/Model%20Photoshoot/_MG_6955ED.webp', type: 'image' },
]

export default function InstagramSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-slate-50/50 dark:bg-black/50">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-pink-500/20"
          >
            <Instagram size={32} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight"
          >
            Follow Us on <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">Instagram</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Stay updated with our latest work, behind-the-scenes moments, and photography tips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="https://www.instagram.com/sidography.co.in?igsh=MTh2OWViYnl5YTk2Yg=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-8 py-3.5 rounded-full hover:scale-105 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
            >
              <Instagram size={20} />
              <span>Follow @sidography.co.in</span>
            </a>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {instagramItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg bg-slate-100 dark:bg-zinc-900"
            >
              {item.type === 'video' ? (
                <>
                  <video
                     src={item.src}
                     className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                     autoPlay
                     muted
                     loop
                     playsInline
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 dark:bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <Play size={12} className="text-white fill-white" />
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={`${item.category} - ${item.title}`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  unoptimized={true}
                />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-pink-600/40 to-orange-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Instagram size={32} className="text-white mx-auto mb-2 drop-shadow-lg" />
                  <p className="text-white text-xs font-semibold uppercase tracking-wider drop-shadow-lg">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
