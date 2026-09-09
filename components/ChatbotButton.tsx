'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, RotateCcw, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  { label: '📸 Wedding Photography Packages', query: 'What are the wedding photography packages and pricing?' },
  { label: '💍 Pre-Wedding Shoot Details', query: 'Tell me about the pre-wedding shoot package and pricing' },
  { label: '📅 How to Book a Photoshoot', query: 'How do I book a photoshoot session?' },
  { label: '📍 Studio Location & Contact', query: 'Where is your studio located and how can I contact you?' },
]

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isLoading, isOpen])

  const sendTextMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return

    const userMessage = textToSend.trim()
    setInput('')
    
    // Prepare conversation history
    const nextMessages = [...messages, { role: 'user' as const, text: userMessage }]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({
            role: m.role === 'bot' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      })

      const data = await res.json()
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: "Sorry, I couldn't get a response. Please reach out to us via WhatsApp at +91 96375 77691." 
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Sorry, there was a connection error. Please contact us on WhatsApp (+91 96375 77691)." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendTextMessage(input)
  }

  const resetChat = () => {
    setMessages([])
    setInput('')
  }

  // Format message text: make links clickable and render clean text
  const renderMessageContent = (content: string) => {
    // Replace markdown bold **text** or URLs with clickable links
    const lines = content.split('\n')
    return lines.map((line, lIdx) => (
      <span key={lIdx} className="block">
        {line.split(/(https?:\/\/[^\s]+|\/booking|\/contact|\/portfolio|\+91\s?96375\s?77691)/g).map((part, pIdx) => {
          if (part.startsWith('http')) {
            return (
              <a key={pIdx} href={part} target="_blank" rel="noopener noreferrer" className="underline text-gold hover:text-gold-light break-all">
                {part}
              </a>
            )
          }
          if (part === '/booking' || part === '/contact' || part === '/portfolio') {
            return (
              <a key={pIdx} href={part} className="underline font-semibold text-gold hover:text-gold-light">
                {part}
              </a>
            )
          }
          if (part.includes('96375')) {
            return (
              <a key={pIdx} href="https://wa.me/919637577691" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-gold hover:text-gold-light">
                {part}
              </a>
            )
          }
          return part
        })}
      </span>
    ))
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-w-[420px] h-[520px] max-h-[82vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gold/20 flex flex-col"
          >
            {/* Header */}
            <div className="bg-charcoal border-b border-gold/30 p-3.5 flex justify-between items-center text-gold">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center border border-gold/40">
                  <Sparkles size={16} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm text-white tracking-wide">
                    Sidography AI
                  </h3>
                  <p className="text-[11px] text-gray-300">Sudarshan Tupare Photography</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    title="Clear chat"
                    className="p-1.5 text-gray-400 hover:text-gold transition-colors rounded-lg hover:bg-white/5"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-3.5 overflow-y-auto flex flex-col gap-3 bg-slate-50 dark:bg-black/60 text-sm">
              {messages.length === 0 ? (
                <div className="my-auto text-center py-2 px-1">
                  <div className="w-12 h-12 rounded-full bg-gold/10 mx-auto mb-3 flex items-center justify-center border border-gold/30 text-gold">
                    <MessageCircle size={24} />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-base mb-1">
                    Hello! Welcome to Sidography AI
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[290px] mx-auto mb-4 leading-relaxed">
                    How can I assist you with your photoshoot today? You can ask in <b>English</b>, <b>हिंदी</b>, or <b>मराठी</b>.
                  </p>

                  {/* Suggestion Chips */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-semibold px-1">
                      Quick Questions:
                    </p>
                    {SUGGESTIONS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendTextMessage(item.query)}
                        className="text-left text-xs px-3 py-2 rounded-xl bg-white dark:bg-zinc-800/80 hover:bg-gold/10 dark:hover:bg-gold/15 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-zinc-700/60 transition-all hover:border-gold/40 shadow-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-charcoal border border-gold/40 text-gold-light self-end rounded-br-xs shadow-md'
                        : 'bg-white dark:bg-zinc-800/95 text-slate-800 dark:text-slate-100 self-start rounded-bl-xs border border-slate-200/80 dark:border-zinc-700/80 shadow-sm'
                    }`}
                  >
                    {renderMessageContent(msg.text)}
                  </div>
                ))
              )}

              {isLoading && (
                <div className="bg-white dark:bg-zinc-800 text-gold self-start rounded-2xl rounded-bl-xs p-3 text-xs flex items-center gap-1.5 border border-slate-200 dark:border-zinc-700">
                  <span className="text-slate-600 dark:text-slate-300">Typing response</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-300">.</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-2.5 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English, हिंदी, or मराठी..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-black/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-charcoal border border-gold text-gold hover:bg-gold hover:text-charcoal p-2.5 rounded-xl text-xs sm:text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                aria-label="Send Message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        className="fixed bottom-24 right-4 sm:right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-charcoal border border-gold hover:border-gold-light text-gold p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 group flex items-center justify-center"
          aria-label="Open Multilingual AI Chatbot"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>

          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal border border-gold/40 text-gold px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
            Chat in English, Hindi & Marathi
          </span>
        </motion.button>
      </motion.div>
    </>
  )
}

export default ChatbotButton

