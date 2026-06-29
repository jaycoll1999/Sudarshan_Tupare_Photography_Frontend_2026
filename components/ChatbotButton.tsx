'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="bg-charcoal border-b border-gold p-4 flex justify-between items-center text-gold">
              <h3 className="font-semibold">Sidography Assistant</h3>
              <button onClick={() => { setIsOpen(false); setMessages([]); }} className="hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              {messages.length === 0 && (
                <p className="text-sm text-center text-gray-500 mt-4">Hi! How can I help you today?</p>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-charcoal border border-gold/30 text-gold-light self-end rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start rounded-bl-none'}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start rounded-lg rounded-bl-none p-3 text-sm flex gap-1">
                  <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <button type="submit" disabled={isLoading} className="bg-charcoal border border-gold text-gold px-4 py-2 rounded-lg text-sm hover:bg-black disabled:opacity-50">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { if (isOpen) setMessages([]); setIsOpen(!isOpen); }}
          className="bg-charcoal border border-gold hover:bg-black text-gold p-4 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Open Chatbot"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with AI
          </span>
        </motion.button>
      </motion.div>
    </>
  )
}

export default ChatbotButton
