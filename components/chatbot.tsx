"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const chatbotTrainingData = {
  greetings: [
    "Hello! I'm your BharatVerse assistant. How can I help you connect with the Indian community today?",
    "Namaste! Welcome to BharatVerse. I'm here to help you explore our vibrant community.",
    "Hi there! I'm your AI guide to the global Indian diaspora. What would you like to know?",
  ],
  community: [
    "Our community spans 180+ countries with over 50,000 active members sharing their stories, culture, and experiences.",
    "You can find Indian communities in major cities like Toronto, London, New York, Dubai, Singapore, and many more!",
    "We have tech hubs in Silicon Valley and Bangalore, cultural centers in London and Sydney, and business networks in Dubai and Mumbai.",
  ],
  events: [
    "We host cultural events, tech meetups, career workshops, and festival celebrations worldwide.",
    "Popular upcoming events include Diwali Tech Mixers, Bharatanatyam workshops, and virtual career mentorship sessions.",
    "You can find events near you by visiting our Events page or checking the interactive map.",
  ],
  culture: [
    "BharatVerse celebrates all aspects of Indian culture - from traditional festivals to modern innovations.",
    "Share your family recipes, cultural traditions, success stories, and connect with others who share your heritage.",
    "We support multiple Indian languages and help preserve cultural traditions across generations.",
  ],
  help: [
    "You can create your profile, join communities, attend events, and share your story on our platform.",
    "Use our interactive map to find Indian communities and events near you.",
    "Join discussions, ask questions, and connect with mentors in our community forums.",
  ],
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("namaste")) {
      return chatbotTrainingData.greetings[Math.floor(Math.random() * chatbotTrainingData.greetings.length)]
    }

    if (message.includes("community") || message.includes("member")) {
      return chatbotTrainingData.community[Math.floor(Math.random() * chatbotTrainingData.community.length)]
    }

    if (message.includes("event") || message.includes("meetup") || message.includes("celebration")) {
      return chatbotTrainingData.events[Math.floor(Math.random() * chatbotTrainingData.events.length)]
    }

    if (message.includes("culture") || message.includes("tradition") || message.includes("festival")) {
      return chatbotTrainingData.culture[Math.floor(Math.random() * chatbotTrainingData.culture.length)]
    }

    if (message.includes("help") || message.includes("how") || message.includes("what")) {
      return chatbotTrainingData.help[Math.floor(Math.random() * chatbotTrainingData.help.length)]
    }

    return "That's a great question! I can help you with information about our community, events, culture, and how to get started on BharatVerse. What specific aspect would you like to know more about?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            aria-label="Open chat assistant"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-primary to-secondary shadow-lg relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            />
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed right-4 bottom-24 w-[min(100vw-2rem,28rem)] h-[min(70vh,520px)] z-[60]"
          >
            <Card className="h-full flex flex-col shadow-2xl border border-border rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Bot className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-sm">BharatVerse Assistant</CardTitle>
                      <p className="text-xs opacity-90">Always here to help</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground hover:bg-white/20"
                    aria-label="Close chat assistant"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-muted-foreground"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                      </motion.div>
                      <p className="text-sm">Ask me anything about BharatVerse!</p>
                      <p className="text-xs mt-1">Community • Events • Culture • Help</p>
                    </motion.div>
                  )}

                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse"}`}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.isBot ? "bg-primary/10" : "bg-secondary/10"
                          }`}
                        >
                          {message.isBot ? (
                            <Bot className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4 text-secondary" />
                          )}
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`p-3 rounded-lg ${
                            message.isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                                className="w-2 h-2 bg-primary/60 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      className="flex-1"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleSendMessage} size="sm" className="px-3">
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
