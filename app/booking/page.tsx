'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Calendar, MapPin, Users, CheckCircle, MessageCircle, ArrowRight, Phone, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    message: '',
    package: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      if (typeParam) {
        const decodedType = decodeURIComponent(typeParam);
        
        // Define mapping from service title to eventTypes option
        const typeMapping: { [key: string]: string } = {
          'wedding photography': 'Wedding Photography',
          'pre-wedding shoot': 'Pre-wedding Shoot',
          'portrait sessions': 'Portrait Session',
          'portrait session': 'Portrait Session',
          'event coverage': 'Event Coverage',
          'cinematic videography': 'Cinematic Videography',
          'photo albums': 'Photo Albums',
          'destination wedding': 'Destination Wedding',
          'drone photography': 'Drone Photography'
        };

        const matchedType = typeMapping[decodedType.toLowerCase()];
        if (matchedType) {
          setFormData(prev => ({ ...prev, eventType: matchedType }));
          
          // Map to default package for that service
          const packageMapping: { [key: string]: string } = {
            'Wedding Photography': 'Wedding Package - ₹50,000',
            'Pre-wedding Shoot': 'Pre-wedding Package - ₹25,000',
            'Portrait Session': 'Portrait Package - ₹15,000',
            'Event Coverage': 'Event Package - ₹30,000',
            'Cinematic Videography': 'Custom Package',
            'Photo Albums': 'Custom Package',
            'Destination Wedding': 'Custom Package',
            'Drone Photography': 'Custom Package'
          };
          const matchedPackage = packageMapping[matchedType];
          if (matchedPackage) {
            setFormData(prev => ({ ...prev, package: matchedPackage }));
          }
        }
      }
    }
  }, []);

  const eventTypes = [
    'Wedding Photography',
    'Pre-wedding Shoot',
    'Portrait Session',
    'Event Coverage',
    'Cinematic Videography',
    'Photo Albums',
    'Destination Wedding',
    'Drone Photography',
    'Corporate Photography',
    'Other'
  ]

  const packages = [
    'Wedding Package - ₹50,000',
    'Pre-wedding Package - ₹25,000',
    'Portrait Package - ₹15,000',
    'Event Package - ₹30,000',
    'Custom Package'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        message: `Location: ${formData.eventLocation}\nPackage: ${formData.package}\nMessage: ${formData.message}`
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
      const response = await fetch(`${API_URL}/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setIsSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          eventLocation: '',
          message: '',
          package: ''
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to book a photography session.\n\n` +
      `Name: ${formData.name || '[Your Name]'}\n` +
      `Event Type: ${formData.eventType || '[Event Type]'}\n` +
      `Event Date: ${formData.eventDate || '[Event Date]'}\n` +
      `Location: ${formData.eventLocation || '[Event Location]'}\n` +
      `Package: ${formData.package || '[Package]'}\n\n` +
      `Message: ${formData.message || 'I would like to know more about your photography services.'}`
    )
    window.open(`https://wa.me/919637577691?text=${message}`, '_blank')
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50/50 dark:bg-charcoal">
        <Navbar />
        <section className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-12 rounded-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-charcoal" />
              </motion.div>
              
              <h2 className="font-serif text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-4">
                Booking <span className="text-gradient">Confirmed!</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
                Thank you for choosing Sidography Photography & Films! We've received your booking request and will contact you within 24 hours to confirm the details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppBooking}
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </button>
                <a
                  href="tel:+9196375 77691"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-charcoal">
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
              Book Your <span className="text-gradient">Photoshoot</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-3xl mx-auto">
              Ready to capture your special moments? Fill out the form below and we'll get back to you within 24 hours to discuss your photography needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventType" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventLocation" className="block text-slate-800 dark:text-white font-medium mb-2">
                    Event Location *
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter event location"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="package" className="block text-slate-800 dark:text-white font-medium mb-2">
                  Preferred Package
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select Package</option>
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-800 dark:text-white font-medium mb-2">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us more about your event, special requirements, or any questions you have..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Booking
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="btn-secondary flex-1 inline-flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book on WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-20 px-4 bg-slate-100/30 dark:bg-black/15">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl font-bold text-slate-800 dark:text-white tracking-tight mb-6">
              Need Help? <span className="text-gradient">Contact Us Directly</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Prefer to speak with us directly? We're available via phone, email, or WhatsApp to answer your questions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a
                href="tel:+919637577691"
                className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <Phone className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="text-slate-800 dark:text-white font-semibold tracking-tight mb-2">Phone</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">+91 9637577691 </p>
              </a>
              
              <a
                href="mailto:stphotography2130@gmail.com"
                className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="text-slate-800 dark:text-white font-semibold tracking-tight mb-2">Email</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">stphotography2130@gmail.com</p>
              </a>
              
              <a
                href="https://wa.me/919637577691"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 dark:bg-black/30 backdrop-blur-xl border border-black/[0.03] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <MessageCircle className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="text-slate-800 dark:text-white font-semibold tracking-tight mb-2">WhatsApp</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Chat with us</p>
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

export default Booking
