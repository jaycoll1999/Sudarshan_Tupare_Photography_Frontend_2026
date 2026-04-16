'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Trash2, Eye, LogOut, Users, Calendar, Image, Lock, Mail, Check, X, Plus } from 'lucide-react'
import Image from 'next/image'

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('bookings')
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'Wedding',
    description: ''
  })

  // Mock data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      eventType: 'Wedding Photography',
      eventDate: '2024-03-15',
      location: 'Mumbai',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      email: 'rahul@example.com',
      phone: '+91 87654 32109',
      eventType: 'Portrait Session',
      eventDate: '2024-02-20',
      location: 'Delhi',
      status: 'confirmed',
      createdAt: '2024-01-10'
    }
  ])

  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: 'Romantic Sunset Wedding',
      category: 'Wedding',
      image: '/api/placeholder/400/300',
      uploadedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Professional Headshot',
      category: 'Portrait',
      image: '/api/placeholder/400/300',
      uploadedAt: '2024-01-14'
    }
  ])

  const categories = ['Wedding', 'Portrait', 'Events', 'Pre-wedding']

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication (in real app, this would be a proper API call)
    if (loginData.email === 'admin@sudarshanphotography.com' && loginData.password === 'admin123') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginData({ email: '', password: '' })
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock upload (in real app, this would upload to a server)
    const newImage = {
      id: gallery.length + 1,
      title: uploadData.title,
      category: uploadData.category,
      image: '/api/placeholder/400/300',
      uploadedAt: new Date().toISOString().split('T')[0]
    }
    setGallery([newImage, ...gallery])
    setUploadData({ title: '', category: 'Wedding', description: '' })
  }

  const handleDeleteImage = (id: number) => {
    setGallery(gallery.filter(img => img.id !== id))
  }

  const updateBookingStatus = (id: number, status: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-charcoal" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400">Sudarshan Tupare Photography</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="admin@sudarshanphotography.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <Lock className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </form>

            <div className="mt-6 p-4 bg-gold/10 rounded-lg">
              <p className="text-gold text-sm text-center">
                Demo Credentials:<br />
                Email: admin@sudarshanphotography.com<br />
                Password: admin123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="glass-effect border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-gold" />
              <div>
                <h1 className="font-serif text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-gold text-sm">Sudarshan Tupare Photography</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'gallery', label: 'Gallery', icon: Image },
            { id: 'upload', label: 'Upload', icon: Upload }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold text-charcoal'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gold" />
                Booking Requests
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Event Type</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{booking.name}</td>
                        <td className="py-3 px-4 text-gray-300">{booking.email}</td>
                        <td className="py-3 px-4 text-gray-300">{booking.eventType}</td>
                        <td className="py-3 px-4 text-gray-300">{booking.eventDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="p-2 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20 transition-colors"
                              title="Confirm"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Image className="w-6 h-6 text-gold" />
                Gallery Management
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="glass-effect rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs">{item.uploadedAt}</span>
                        <button
                          onClick={() => handleDeleteImage(item.id)}
                          className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6 text-gold" />
                Upload New Photo
              </h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-white font-medium mb-2">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter photo title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-white font-medium mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-white font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Enter photo description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      // In real app, handle file upload
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Photo
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Admin
