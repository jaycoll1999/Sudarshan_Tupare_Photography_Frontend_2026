'use client'

import { motion } from 'framer-motion'
import { Camera, Award, Users, Heart, Star, MapPin, Mail, Phone, Calendar } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatbotButton from '@/components/ChatbotButton'

const About = () => {
  const achievements = [
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Photoshoots' },
    { number: '8+', label: 'Years Experience' },
    { number: '50+', label: 'Awards Won' }
  ]

  const teamMembers = [
    {
      name: 'Sidography',
      role: 'Founder & Lead Photographer',
      bio: 'With over 4 years of experience in photography, Sudarshan specializes in wedding and portrait photography. His artistic vision and technical excellence have earned him numerous awards and recognition in the industry.',
      image: '/images/sudarshan_hero.jpeg',
      specialties: ['Wedding Photography', 'Portrait Photography', 'Event Coverage']
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about capturing the beauty and emotion in every moment, turning ordinary scenes into extraordinary memories.',
      image: '/images/portfolio/Pre%20Wedding/Dual-Expo-01.webp'
    },
    {
      icon: Camera,
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every aspect of our work, from composition to post-processing.',
      image: '/images/portfolio/Babyshoot/DSC_3364ED.webp'
    },
    {
      icon: Users,
      title: 'Client Focus',
      description: 'Your vision is our priority. We work closely with you to understand your needs and deliver beyond expectations.',
      image: '/images/portfolio/Candid/DSC_3497ED.webp'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-charcoal">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sudarshan_hero.jpeg"
            alt="About hero background"
            fill
            className="object-cover object-[50%_15%]"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent dark:from-charcoal" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-lg">
            About <span className="text-gradient">Sidography</span>
          </h1>
          <p className="text-xl text-gray-200 text-shadow">
            Crafting timeless visual stories through the art of photography
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  Founded in 2020, Sidography Photography & Films began as a passion project driven by a love for capturing life's most precious moments. What started as a hobby quickly evolved into a professional photography studio dedicated to excellence.
                </p>
                <p>
                  Based in Pune, we specialize in wedding photography, portrait sessions, and event coverage. Our approach combines artistic vision with technical expertise to create images that not only document moments but evoke emotions.
                </p>
                <p>
                  Over the years, we've had the privilege of working with hundreds of clients, each with their unique story to tell. From intimate weddings to grand celebrations, from professional headshots to creative portraits, we bring the same level of dedication and creativity to every project.
                </p>
                <p>
                  Our philosophy is simple: every photograph should be a work of art that tells a story and preserves memories for generations to come.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/sudarshan_hero.jpeg"
                alt="About us image"
                fill
                className="object-cover object-[50%_15%]"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 bg-slate-100/30 dark:bg-black/15">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
              Our <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Numbers that speak volumes about our dedication and expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gold mb-2">{achievement.number}</div>
                <p className="text-slate-600 dark:text-slate-300">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
              Meet the <span className="text-gradient">Photographer</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              The creative mind behind the lens
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 rounded-2xl text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold/20">
                <Image
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  fill
                  className="object-cover object-[50%_15%]"
                  unoptimized
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-2">{teamMembers[0].name}</h3>
              <p className="text-gold font-medium mb-4">{teamMembers[0].role}</p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">{teamMembers[0].bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {teamMembers[0].specialties.map((specialty, specIndex) => (
                  <span
                    key={specIndex}
                    className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Photography Style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 md:p-12 rounded-2xl flex flex-col justify-center"
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
                My <span className="text-gradient">Photography Style</span>
              </h3>
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                <p>
                  For me, photography is an art of observation. It's about finding something interesting in an ordinary place. I've found it has little to do with the things you see and everything to do with the way you see them.
                </p>
                <p>
                  My signature style blends cinematic lighting with authentic, candid moments. Whether it's the nervous excitement before a wedding or the quiet intimacy of a portrait session, I strive to create timeless images that transport you back to exactly how you felt in that moment.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <Camera className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold tracking-tight mb-1 text-lg">Cinematic Vision</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Using light and shadow to create dramatic, movie-like aesthetics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <Heart className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 dark:text-white font-semibold tracking-tight mb-1 text-lg">Candid Moments</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Capturing raw, unposed emotions as they naturally unfold.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-white dark:bg-black/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: Section Header & Main Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 flex flex-col h-full"
            >
              <div className="mb-8">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
                  Our <span className="text-gradient">Values</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  The principles that guide our work and relationships
                </p>
              </div>
              
              <div className="relative w-full flex-grow min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/portfolio/Maternity%20Shoot/DSC_8031ED.webp"
                  alt="Our Values"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </motion.div>

            {/* Right: Values List with Images */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:bg-white/5 transition-colors duration-300"
                >
                  {/* Image Thumbnail */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-36 shrink-0 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 p-2 bg-white dark:bg-black/60 backdrop-blur-md rounded-lg">
                      <value.icon className="w-5 h-5 text-gold" />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-grow text-center sm:text-left sm:py-2">
                    <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-gold transition-colors">{value.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
              Professional <span className="text-gradient">Equipment</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              We use industry-leading equipment to ensure the highest quality results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Sony Alpha 1', 
                type: 'Primary Camera',
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
              },
              { 
                name: 'Sony A7R IV', 
                type: 'Secondary Camera',
                image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800'
              },
              { 
                name: 'Various Lenses', 
                type: '24mm to 200mm',
                image: '/images/camera_lenses.png'
              },
              { 
                name: 'Professional Lighting', 
                type: 'Studio & Portable',
                image: '/images/studio_lighting.png'
              }
            ].map((equipment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-xl text-center group"
              >
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2 text-lg">{equipment.name}</h3>
                <p className="text-gold text-sm font-medium">{equipment.type}</p>
              </motion.div>
            ))}
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
            className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-12 rounded-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
              Let's Create <span className="text-gradient">Beautiful Memories</span> Together
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Ready to discuss your photography needs? We'd love to hear about your vision and help bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="btn-primary inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </a>
              <a
                href="mailto:sidographyfilms@gmail.com"
                className="btn-secondary inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
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

export default About
