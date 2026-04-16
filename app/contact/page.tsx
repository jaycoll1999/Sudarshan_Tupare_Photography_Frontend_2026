'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Instagram, Facebook, Camera } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Store contact data (in real app, this would go to a database)
    console.log('Contact form submitted:', formData)
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 5000)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@sudarshanphotography.com',
      href: 'mailto:contact@sudarshanphotography.com'
    },
    {
      icon: MapPin,
      label: 'Studio Address',
      value: 'Mumbai, Maharashtra, India',
      href: '#'
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 4:00 PM' }
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/sudarshanphotography', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/sudarshanphotography', label: 'Facebook' },
    { icon: MessageCircle, href: 'https://wa.me/919876543210', label: 'WhatsApp' }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-charcoal">
        <Navbar />
        <section className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-effect p-12 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Send className="w-10 h-10 text-charcoal" />
              </motion.div>
              
              <h2 className="font-serif text-4xl font-bold text-white mb-4">
                Message <span className="text-gradient">Sent!</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Thank you for reaching out! We've received your message and will get back to you within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </a>
                <a
                  href="/booking"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Book a Session
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Have questions about our photography services? Want to discuss your upcoming event? 
              We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 group"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <info.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-white font-semibold mb-2">{info.label}</h3>
                <p className="text-gray-300">{info.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Send us a <span className="text-gradient">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Wedding Photography Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your photography needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Business Hours & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-6">
                  Business <span className="text-gradient">Hours</span>
                </h2>
                <div className="glass-effect p-6 rounded-2xl">
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300">{schedule.day}</span>
                        <span className="text-gold font-medium">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Response time: Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-6">
                  Follow <span className="text-gradient">Us</span>
                </h2>
                <div className="glass-effect p-6 rounded-2xl">
                  <p className="text-gray-300 mb-4">
                    Stay updated with our latest work and behind-the-scenes content
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-6 h-6 text-gold" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-white mb-6">
                  Quick <span className="text-gradient">Actions</span>
                </h2>
                <div className="space-y-4">
                  <a
                    href="/booking"
                    className="glass-effect p-4 rounded-lg flex items-center justify-between hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Camera className="w-6 h-6 text-gold" />
                      <span className="text-white">Book a Photoshoot</span>
                    </div>
                    <span className="text-gold">→</span>
                  </a>
                  
                  <a
                    href="/portfolio"
                    className="glass-effect p-4 rounded-lg flex items-center justify-between hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Camera className="w-6 h-6 text-gold" />
                      <span className="text-white">View Portfolio</span>
                    </div>
                    <span className="text-gold">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Contact
