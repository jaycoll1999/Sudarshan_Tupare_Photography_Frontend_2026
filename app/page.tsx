'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Camera, Heart, Star, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const Home = () => {
  const featuredImages = [
    { id: 1, category: 'Wedding', title: 'Romantic Sunset Wedding' },
    { id: 2, category: 'Portrait', title: 'Professional Headshot' },
    { id: 3, category: 'Event', title: 'Corporate Gala' },
    { id: 4, category: 'Pre-wedding', title: 'Couple Photoshoot' },
  ]

  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Capture your special day with artistic vision and technical excellence.',
      price: 'Starting at ₹50,000'
    },
    {
      icon: Heart,
      title: 'Pre-wedding Shoot',
      description: 'Beautiful pre-wedding moments that tell your love story.',
      price: 'Starting at ₹25,000'
    },
    {
      icon: Star,
      title: 'Portrait Sessions',
      description: 'Professional portraits that capture your unique personality.',
      price: 'Starting at ₹15,000'
    },
    {
      icon: Calendar,
      title: 'Event Coverage',
      description: 'Comprehensive event photography for corporate and private events.',
      price: 'Starting at ₹30,000'
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
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/50 to-charcoal" />
          <Image
            src="/api/placeholder/1920/1080"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
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
            Sudarshan Tupare
            <span className="block text-gold text-3xl md:text-4xl mt-2">Photography</span>
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Featured Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A glimpse into our recent photography sessions across different categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={`/api/placeholder/400/500`}
                    alt={image.title}
                    fill
                    className="object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-gold text-sm font-medium">{image.category}</p>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-secondary inline-flex items-center">
              View Full Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional photography services tailored to your unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <service.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                className="glass-effect p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gold text-sm">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Preview */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Follow on <span className="text-gradient">Instagram</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stay updated with our latest work and behind-the-scenes moments
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="aspect-square relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <Image
                  src={`/api/placeholder/300/300`}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover image-hover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com/sudarshanphotography"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center"
            >
              Follow on Instagram
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-12 rounded-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Capture Your <span className="text-gradient">Timeless Moments?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
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
    </div>
  )
}

export default Home
