'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Camera, Heart, Star, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatbotButton from '@/components/ChatbotButton'
import FeaturedWork from '@/components/FeaturedWork'
import InstagramSection from '@/components/InstagramSection'

const Home = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const heroMedia = [
    { type: 'image', src: '/images/sudarshan_hero.jpeg' },
    { type: 'videos', sources: [
      '/images/sid_thsirt_vdieo.mp4',
      '/images/sid_11.mp4',
      '/images/Sid_tradional_video.mp4'
    ]}
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Capture your special day with artistic vision and technical excellence.',
      price: 'Starting at ₹50,000',
      image: '/images/portfolio/Engagement/DSC04622ED.webp'
    },
    {
      icon: Heart,
      title: 'Pre-wedding Shoot',
      description: 'Beautiful pre-wedding moments that tell your love story.',
      price: 'Starting at ₹25,000',
      image: '/images/portfolio/Pre%20Wedding/DSC_0196ED.webp',
      imagePosition: 'object-[50%_30%]'
    },
    {
      icon: Star,
      title: 'Portrait Sessions',
      description: 'Professional portraits that capture your unique personality.',
      price: 'Starting at ₹15,000',
      image: '/images/portfolio/Model%20Photoshoot/_MG_6917ED.webp'
    },
    {
      icon: Calendar,
      title: 'Event Coverage',
      description: 'Comprehensive event photography for corporate and private events.',
      price: 'Starting at ₹30,000',
      image: '/images/portfolio/Candid/DSC_0489ED.webp'
    }
  ]

  const testimonials = [
    {
      name: 'Priya & Rahul',
      text: 'Sudarshan captured our wedding perfectly! Every photo tells a story and the quality is exceptional.',
      rating: 5,
      event: 'Wedding'
    },
    {
      name: 'Anjali Sharma',
      text: 'Professional, creative, and punctual. My corporate headshots have never looked better!',
      rating: 5,
      event: 'Portrait'
    },
    {
      name: 'TechCorp India',
      text: 'Outstanding event coverage! Sudarshan captured all the important moments seamlessly.',
      rating: 5,
      event: 'Corporate Event'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-charcoal">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0 bg-black">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentMediaIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              {heroMedia[currentMediaIndex].type === 'image' ? (
                <Image
                  src={heroMedia[currentMediaIndex].src as string}
                  alt="Sidography Photography & Films"
                  fill
                  className="object-cover object-[50%_15%]"
                  priority
                  unoptimized
                />
              ) : (
                <>
                  <style>{`
                    @media (max-width: 768px) {
                      .video-mask { mask-image: none !important; -webkit-mask-image: none !important; }
                    }
                  `}</style>
                  <div className="flex w-full h-full">
                    {(heroMedia[currentMediaIndex].sources as string[]).map((src, i) => {
                      let mask = 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                      if (i === 0) mask = 'linear-gradient(to right, black 0%, black 85%, transparent 100%)'
                      if (i === 2) mask = 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
                      
                      return (
                        <video
                          key={i}
                          src={src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`h-full object-cover video-mask ${i === 1 ? 'w-full md:w-1/3' : 'hidden md:block md:w-1/3'}`}
                          style={{ maskImage: mask, WebkitMaskImage: mask }}
                        />
                      )
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg"
          >
            Sidography
            <span className="block text-gold text-3xl md:text-4xl mt-2">Photography & Films</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 text-shadow"
          >
            Capturing Timeless Moments
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/booking" className="btn-primary inline-flex items-center justify-center">
              Book a Shoot
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/portfolio" className="btn-secondary inline-flex items-center justify-center">
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-800 dark:text-white z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Featured Gallery Preview */}
      <FeaturedWork />

      {/* Services Preview */}
      <section className="py-20 px-4 bg-slate-100/30 dark:bg-black/15">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Professional photography services tailored to your unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-lg flex flex-col transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
              >
                <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${service.imagePosition || 'object-center'}`}
                    unoptimized
                  />
                </div>
                <service.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="font-serif text-xl font-semibold text-slate-800 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm flex-grow">{service.description}</p>
                <p className="text-gold font-semibold">{service.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex items-center">
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              What our clients say about their experience with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-slate-800 dark:text-white font-semibold tracking-tight">{testimonial.name}</p>
                  <p className="text-gold text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Preview */}
      <InstagramSection />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-12 rounded-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
              Ready to Capture Your <span className="text-gradient">Timeless Moments?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's create beautiful memories together. Contact us today to discuss your photography needs and book your session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary inline-flex items-center justify-center">
                Book Your Shoot
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ChatbotButton />
    </div>
  )
}

export default Home
