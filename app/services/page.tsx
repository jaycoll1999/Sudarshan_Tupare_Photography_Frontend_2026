'use client'

import { motion } from 'framer-motion'
import { Camera, Heart, Star, Calendar, Users, Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Complete wedding coverage from pre-ceremony to reception. We capture every precious moment of your special day with artistic vision and technical excellence.',
      price: '₹50,000',
      duration: 'Full Day',
      deliverables: [
        'Pre-wedding consultation',
        '8-10 hours coverage',
        '2 photographers',
        '500+ edited photos',
        'Online gallery',
        'USB drive with all photos'
      ],
      popular: true,
      image: '/api/placeholder/600/400'
    },
    {
      id: 2,
      icon: Heart,
      title: 'Pre-wedding Shoot',
      description: 'Beautiful pre-wedding photography sessions that tell your unique love story. Perfect for save-the-dates and wedding invitations.',
      price: '₹25,000',
      duration: '4-6 hours',
      deliverables: [
        'Location scouting',
        'Outfit changes (2-3)',
        'Professional editing',
        '100+ edited photos',
        'Cinematic video highlights',
        'Social media ready content'
      ],
      popular: false,
      image: '/api/placeholder/600/400'
    },
    {
      id: 3,
      icon: Star,
      title: 'Portrait Sessions',
      description: 'Professional portrait photography that captures your unique personality. Perfect for headshots, family portraits, or personal branding.',
      price: '₹15,000',
      duration: '2-3 hours',
      deliverables: [
        'Studio or outdoor location',
        'Professional lighting',
        'Wardrobe consultation',
        '50+ edited photos',
        'Retouched portraits',
        'Print release'
      ],
      popular: false,
      image: '/api/placeholder/600/400'
    },
    {
      id: 4,
      icon: Calendar,
      title: 'Event Coverage',
      description: 'Comprehensive event photography for corporate events, birthdays, anniversaries, and special occasions. We capture the atmosphere and emotions of your event.',
      price: '₹30,000',
      duration: '6-8 hours',
      deliverables: [
        'Event planning consultation',
        'Candid and posed shots',
        'Group photos',
        '300+ edited photos',
        'Same-day preview (selected)',
        'Online gallery within 48 hours'
      ],
      popular: false,
      image: '/api/placeholder/600/400'
    }
  ]

  const additionalServices = [
    {
      title: 'Cinematic Videography',
      description: 'Professional video coverage with cinematic editing and drone footage available.',
      price: 'Starting at ₹75,000'
    },
    {
      title: 'Photo Albums',
      description: 'Custom-designed luxury photo albums with premium materials and craftsmanship.',
      price: 'Starting at ₹15,000'
    },
    {
      title: 'Destination Wedding',
      description: 'Travel photography services for destination weddings and international events.',
      price: 'Custom Quote'
    },
    {
      title: 'Drone Photography',
      description: 'Aerial photography and videography for stunning overhead shots.',
      price: 'Starting at ₹20,000'
    }
  ]

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
              Services & <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Professional photography services tailored to your unique needs and budget. 
              Each package is designed to capture your moments with perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  service.popular ? 'ring-2 ring-gold' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-gold text-charcoal px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
                
                <div className="glass-effect p-8">
                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gold/10 rounded-lg">
                        <service.icon className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-white">{service.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Image */}
                  <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <div>
                      <p className="text-3xl font-bold text-white">{service.price}</p>
                      <p className="text-gray-400 text-sm">plus taxes</p>
                    </div>
                    <Link href="/booking" className="btn-primary inline-flex items-center">
                      Book Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Additional <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Enhance your photography experience with our premium add-on services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg"
              >
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
                <p className="text-gold font-semibold">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Simple and transparent process from booking to delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your vision, preferences, and requirements to create the perfect photography plan.' },
              { step: '02', title: 'Booking', description: 'Finalize the package, sign the agreement, and pay the advance to secure your date.' },
              { step: '03', title: 'Photoshoot', description: 'Our professional team captures your moments with creativity and technical excellence.' },
              { step: '04', title: 'Delivery', description: 'Receive your beautifully edited photos within the agreed timeline via online gallery.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gold mb-4">{item.step}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
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
              Have Questions About Our <span className="text-gradient">Services?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              We're here to help you choose the perfect package for your needs. 
              Contact us for a personalized consultation and custom quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/booking" className="btn-secondary inline-flex items-center justify-center">
                Book Consultation
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

export default Services
