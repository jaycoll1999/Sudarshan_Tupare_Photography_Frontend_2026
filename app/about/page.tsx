'use client'

import { motion } from 'framer-motion'
import { Camera, Award, Users, Heart, Star, MapPin, Mail, Phone, Calendar } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const About = () => {
  const achievements = [
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Photoshoots' },
    { number: '8+', label: 'Years Experience' },
    { number: '50+', label: 'Awards Won' }
  ]

  const teamMembers = [
    {
      name: 'Sudarshan Tupare',
      role: 'Founder & Lead Photographer',
      bio: 'With over 8 years of experience in photography, Sudarshan specializes in wedding and portrait photography. His artistic vision and technical excellence have earned him numerous awards and recognition in the industry.',
      image: '/api/placeholder/400/400',
      specialties: ['Wedding Photography', 'Portrait Photography', 'Event Coverage']
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about capturing the beauty and emotion in every moment, turning ordinary scenes into extraordinary memories.'
    },
    {
      icon: Camera,
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every aspect of our work, from composition to post-processing.'
    },
    {
      icon: Users,
      title: 'Client Focus',
      description: 'Your vision is our priority. We work closely with you to understand your needs and deliver beyond expectations.'
    }
  ]

  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/70 to-charcoal" />
          <Image
            src="/api/placeholder/1920/600"
            alt="About hero background"
            fill
            className="object-cover"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 text-shadow-lg">
            About <span className="text-gradient">Sudarshan Tupare</span>
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
              <h2 className="font-serif text-4xl font-bold text-white mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2016, Sudarshan Tupare Photography began as a passion project driven by a love for capturing life's most precious moments. What started as a hobby quickly evolved into a professional photography studio dedicated to excellence.
                </p>
                <p>
                  Based in Mumbai, we specialize in wedding photography, portrait sessions, and event coverage. Our approach combines artistic vision with technical expertise to create images that not only document moments but evoke emotions.
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
                src="/api/placeholder/600/800"
                alt="About us image"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                <p className="text-gray-300">{achievement.label}</p>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Meet the <span className="text-gradient">Photographer</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The creative mind behind the lens
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-gold font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="p-4 bg-gold/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-gradient">Equipment</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We use industry-leading equipment to ensure the highest quality results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Canon EOS R5', type: 'Primary Camera' },
              { name: 'Sony A7R IV', type: 'Secondary Camera' },
              { name: 'Various Lenses', type: '24mm to 200mm' },
              { name: 'Professional Lighting', type: 'Studio & Portable' }
            ].map((equipment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg text-center"
              >
                <Camera className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{equipment.name}</h3>
                <p className="text-gray-400 text-sm">{equipment.type}</p>
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
            className="glass-effect p-12 rounded-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create <span className="text-gradient">Beautiful Memories</span> Together
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
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
                href="mailto:contact@sudarshanphotography.com"
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
    </div>
  )
}

export default About
