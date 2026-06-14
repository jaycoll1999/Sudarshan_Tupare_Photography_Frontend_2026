'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Moon, Sun, Trash2, Eye, LogOut, Users, Calendar, Image as ImageIcon, Lock, Mail, Check, X, Plus, MessageSquare, UserCircle, Activity, BarChart, Shield, Clock } from 'lucide-react'
import Image from 'next/image'

const Admin = () => {
  const [token, setToken] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const [adminProfile, setAdminProfile] = useState<any>(null)
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    description: ''
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [bookings, setBookings] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  
  // Data for gallery
  const [gallery, setGallery] = useState<any[]>([])
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All')

  const categories = ['Babyshoot', 'Candid', 'Cinematic', 'Engagement', 'Maternity Shoot', 'Model Photoshoot', 'Pre Wedding']

  useEffect(() => {
    // Check local storage for token on mount
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token])

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    try {
      const [bookingsRes, contactsRes, galleryRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/booking/`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/contact/`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/portfolio/`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (bookingsRes.status === 401 || contactsRes.status === 401 || galleryRes.status === 401 || profileRes.status === 401) {
        handleLogout();
        alert('Session expired or invalid token. Please log in again.');
        return;
      }

      if (profileRes.ok) {
        const data = await profileRes.json()
        setAdminProfile(data)
      }
      if (bookingsRes.ok) {
        const data = await bookingsRes.json()
        setBookings(data)
      }
      if (contactsRes.ok) {
        const data = await contactsRes.json()
        setContacts(data)
      }
      if (galleryRes.ok) {
        const backendData = await galleryRes.json()
        
        try {
          const liveRes = await fetch('/api/portfolio');
          if (liveRes.ok) {
            const liveData = await liveRes.json();
            const mappedLiveData = liveData.map((img: any, index: number) => ({
              id: `live-${index}`,
              title: img.src.split('/').pop() || 'Live Image',
              category: img.category,
              image_url: img.src,
              created_at: new Date().toISOString()
            }));
            setGallery([...backendData, ...mappedLiveData]);
          } else {
            setGallery(backendData);
          }
        } catch (e) {
          setGallery(backendData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data.access_token)
        localStorage.setItem('adminToken', data.access_token)
      } else {
        setLoginError('Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Server error. Ensure backend is running.')
    }
  }

  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('adminToken')
    setLoginData({ email: '', password: '' })
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setIsUploading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    
    try {
      // 1. Upload image to /upload/
      const formData = new FormData();
      formData.append('file', uploadFile);
      
      const uploadRes = await fetch(`${API_URL}/upload/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('Failed to upload image file');
      const uploadResult = await uploadRes.json();
      
      // 2. Create portfolio entry
      const portfolioRes = await fetch(`${API_URL}/portfolio/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: uploadData.title,
          category: uploadData.category,
          image_url: uploadResult.url
        })
      });

      if (!portfolioRes.ok) throw new Error('Failed to save portfolio entry');
      const newPortfolio = await portfolioRes.json();
      
      setGallery([newPortfolio, ...gallery]);
      setUploadData({ title: '', category: '', description: '' });
      setUploadFile(null);
      alert('Successfully uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Ensure backend is running and Cloudinary is configured in .env');
    } finally {
      setIsUploading(false);
    }
  }

  const handleDeleteImage = async (id: number | string) => {
    if (typeof id === 'string' && id.startsWith('live-')) {
      alert('Local live images cannot be deleted from the admin panel.');
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    try {
      const response = await fetch(`${API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setGallery(gallery.filter(img => img.id !== id))
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const updateBookingStatus = async (id: number, status: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sudarshan-tupare-photography-backend-2026.onrender.com';
    try {
      const response = await fetch(`${API_URL}/booking/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (!token) {
    return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-charcoal flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md p-8 rounded-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-charcoal" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
              <p className="text-gray-600 dark:text-gray-400">Sudarshan Tupare Photography</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-900 dark:text-white font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="stphotography2130@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-900 dark:text-white font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
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
          </div>
        </motion.div>
      </div>
    </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal">
      {/* Header */}
      <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-gold" />
              <div>
                <h1 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <p className="text-gold text-sm">Sudarshan Tupare Photography</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                 onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'profile', label: 'Dashboard', icon: UserCircle },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'messages', label: 'Contact Messages', icon: MessageSquare },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'upload', label: 'Upload', icon: Upload }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold text-charcoal'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile / Dashboard Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Top Row: Profile Details & Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Profile Card */}
              <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6 lg:col-span-1 border border-gold/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Shield className="w-24 h-24 text-gold" />
                </div>
                <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
                  <UserCircle className="w-6 h-6 text-gold" />
                  Admin Profile
                </h2>
                {adminProfile ? (
                  <div className="space-y-4 relative z-10">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Email Address</p>
                      <p className="text-gray-900 dark:text-white font-medium text-lg">{adminProfile.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Role Status</p>
                      <span className="inline-flex items-center px-3 py-1 mt-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20 uppercase tracking-wider">
                        {adminProfile.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Account Created</p>
                      <p className="text-gray-700 dark:text-gray-300">{new Date(adminProfile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-700/50 rounded w-full"></div>
                    <div className="h-10 bg-gray-700/50 rounded w-2/3"></div>
                  </div>
                )}
              </div>

              {/* Metrics Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-white/5 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{bookings.length}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Total Bookings</h3>
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Activity className="w-3 h-3" /> Active requests</p>
                </div>

                <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-white/5 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{contacts.length}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Inquiries</h3>
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Activity className="w-3 h-3" /> Messages received</p>
                </div>

                <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-white/5 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{gallery.length}</span>
                  </div>
                  <h3 className="text-gray-600 dark:text-gray-400 font-medium">Gallery Photos</h3>
                  <p className="text-xs text-gold mt-2 flex items-center gap-1"><Activity className="w-3 h-3" /> Portfolio size</p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-gold" />
                  Recent System Activity
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Dynamically build activity feed by merging and sorting bookings and contacts */}
                {[
                  ...bookings.map(b => ({ type: 'booking', date: new Date(b.created_at || Date.now()), data: b })),
                  ...contacts.map(c => ({ type: 'contact', date: new Date(c.created_at || Date.now()), data: c }))
                ]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5)
                .map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white dark:bg-black/40 transition-colors border border-gray-200 dark:border-white/5">
                    <div className={`p-3 rounded-lg shrink-0 ${activity.type === 'booking' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {activity.type === 'booking' ? <Calendar className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-gray-900 dark:text-white font-medium">
                          {activity.type === 'booking' 
                            ? `New Booking Request from ${activity.data.name}`
                            : `New Inquiry from ${activity.data.name}`}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 shrink-0 ml-4">
                          <Clock className="w-3 h-3" />
                          {activity.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {activity.type === 'booking' 
                          ? `${activity.data.event_type} on ${activity.data.event_date}`
                          : activity.data.message}
                      </p>
                    </div>
                  </div>
                ))}
                
                {bookings.length === 0 && contacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    No recent activity found.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gold" />
                Booking Requests
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Contact</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Event Type & Date</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Details</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{booking.name}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          <div className="text-sm">{booking.email}</div>
                          <div className="text-sm">{booking.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          <div className="font-medium">{booking.event_type}</div>
                          <div className="text-sm">{booking.event_date}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-xs whitespace-pre-wrap text-sm">
                          {booking.message}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400'
                              : booking.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400'
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
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-500">No bookings found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                Contact Inquiries
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium w-1/2">Message Details</th>
                      <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Date Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-200 dark:border-gray-800">
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{contact.name}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{contact.email}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-md whitespace-pre-wrap text-sm">
                          {contact.message}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                          {new Date(contact.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-500">No messages found</td>
                      </tr>
                    )}
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
            <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-gold" />
                Gallery Management
              </h2>
              
              <div className="space-y-8">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                  {['All', ...Array.from(new Set(gallery.map(item => item.category)))].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedGalleryCategory(category)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedGalleryCategory === category
                          ? 'bg-gold text-charcoal scale-105'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Filtered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery
                    .filter(item => selectedGalleryCategory === 'All' || item.category === selectedGalleryCategory)
                    .map((item) => (
                    <div key={item.id} className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-lg overflow-hidden">
                      <div className="aspect-video relative">
                        {(item.image_url || item.image).match(/\.(mp4|webm|mov)$/i) ? (
                          <video
                            src={item.image_url || item.image}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            controls
                          />
                        ) : (
                          <Image
                            src={item.image_url || item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-gray-500 text-xs">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : item.uploadedAt}
                          </span>
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

                {gallery.length === 0 && (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-500">
                    No images found in the gallery. Use the Upload tab to add some.
                  </div>
                )}
                
                {gallery.length > 0 && gallery.filter(item => selectedGalleryCategory === 'All' || item.category === selectedGalleryCategory).length === 0 && (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-500">
                    No images found for this category.
                  </div>
                )}
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
            <div className="bg-white dark:bg-black/20 shadow-md dark:shadow-none border border-gray-200 dark:border-white/10 dark:backdrop-blur-md rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6 text-gold" />
                Upload New Photo
              </h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-gray-900 dark:text-white font-medium mb-2">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter photo title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-gray-900 dark:text-white font-medium mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-gold transition-colors"
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-900 dark:text-white font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-black/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Enter photo description (optional)"
                  />
                </div>

                <div>
                  <div className="block text-gray-900 dark:text-white font-medium mb-2">
                    Upload Image
                  </div>
                  <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer block">
                    <Upload className="w-12 h-12 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {uploadFile ? uploadFile.name : 'Click to select an image'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`btn-primary inline-flex items-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Admin
