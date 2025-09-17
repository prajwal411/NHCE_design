"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Globe,
  MapPin,
  Calendar,
  Users,
  Plus,
  Bell,
  Search,
  Settings,
  MessageCircle,
  Trophy,
  Star,
  X,
  Send,
  Award,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function DashboardPage() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Namaste! I'm your BharatVerse assistant. How can I help you today?" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [notifications, setNotifications] = useState([
    { id: 1, type: "achievement", message: 'You earned the "Community Builder" badge!', time: "2 min ago" },
    { id: 2, type: "event", message: "Diwali Tech Mixer starts in 2 hours", time: "1 hour ago" },
    { id: 3, type: "connection", message: "Raj Kumar wants to connect with you", time: "3 hours ago" },
  ])

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  ]

  const achievements = [
    { name: "Community Builder", icon: "🏗️", description: "Helped 10 new members", progress: 100 },
    { name: "Event Enthusiast", icon: "🎉", description: "Attended 5 events", progress: 80 },
    { name: "Cultural Ambassador", icon: "🎭", description: "Shared 20 cultural posts", progress: 60 },
    { name: "Mentor", icon: "👨‍🏫", description: "Guided 3 newcomers", progress: 40 },
  ]

  const sendMessage = () => {
    if (!newMessage.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", message: newMessage }])

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I can help you find events in your area. Would you like me to show you upcoming cultural events?",
        "Great question! Let me connect you with community members who can help.",
        "I can guide you through setting up your profile. Would you like step-by-step instructions?",
        "Here are some popular communities you might be interested in joining!",
      ]
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          message: responses[Math.floor(Math.random() * responses.length)],
        },
      ])
    }, 1000)

    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BharatVerse</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-foreground font-medium">
                Dashboard
              </Link>
              <Link href="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                Map
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/feed" className="text-muted-foreground hover:text-foreground transition-colors">
                Feed
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent border border-border rounded-md px-2 py-1 text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>

              {/* Enhanced Notifications */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </div>

              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="w-8 h-8" asChild>
                <Link href="/profile/1">
                  <AvatarImage src="/indian-professional.jpg" />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                    PS
                  </AvatarFallback>
                </Link>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary text-primary-foreground p-4 text-center relative"
          >
            <div className="container mx-auto">
              <p className="text-sm">
                🎉 Welcome to BharatVerse! Complete your profile to unlock all features and connect with your community.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setShowOnboarding(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Priya!</h1>
              <p className="text-muted-foreground">Here's what's happening in your community today.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="h-5 w-5 text-primary" />
                Level 5 Community Builder
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                1,250 Points
              </Badge>
            </div>
          </div>

          {/* Achievement Progress */}
          <Card className="border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{achievement.description}</div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <motion.div
                          className="bg-primary h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    {achievement.progress === 100 && (
                      <Badge variant="secondary" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with these popular activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        href: "/events",
                        icon: Calendar,
                        title: "Find Events",
                        desc: "Discover local meetups",
                        color: "text-primary",
                      },
                      {
                        href: "/map",
                        icon: MapPin,
                        title: "Explore Map",
                        desc: "See global communities",
                        color: "text-secondary",
                      },
                      {
                        href: "/profile/setup",
                        icon: Users,
                        title: "Complete Profile",
                        desc: "Connect with others",
                        color: "text-accent",
                      },
                      {
                        href: "/feed",
                        icon: Plus,
                        title: "Share Story",
                        desc: "Post to community",
                        color: "text-primary",
                      },
                    ].map((action, index) => (
                      <motion.div
                        key={action.title}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          className="h-auto p-4 flex-col items-start bg-transparent hover:bg-muted/50"
                          variant="outline"
                          asChild
                        >
                          <Link href={action.href}>
                            <action.icon className={`h-6 w-6 mb-2 ${action.color}`} />
                            <div className="text-left">
                              <div className="font-semibold">{action.title}</div>
                              <div className="text-sm text-muted-foreground">{action.desc}</div>
                            </div>
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Upcoming Events Near You</CardTitle>
                  <CardDescription>Events in San Francisco Bay Area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Diwali Tech Mixer</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Join fellow tech professionals for networking and celebration
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Oct 28, 2024 • 6:00 PM</span>
                        <span>San Francisco, CA</span>
                        <Badge variant="secondary">Tech</Badge>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm">RSVP</Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Bharatanatyam Workshop</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Learn classical Indian dance with professional instructors
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Nov 5, 2024 • 2:00 PM</span>
                        <span>Fremont, CA</span>
                        <Badge variant="secondary">Culture</Badge>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Learn More
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Feed Preview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Community Highlights</CardTitle>
                <CardDescription>Recent posts from your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/indian-professional-man.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">Raj Kumar</span>
                      <Badge variant="outline" className="text-xs">
                        San Jose
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Just attended an amazing Garba night in the Bay Area! The energy was incredible and it felt like
                      home. Thanks to everyone who made it special! 🎉
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>2 hours ago</span>
                      <span>24 likes</span>
                      <span>8 comments</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/indian-woman-entrepreneur.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">Anita Singh</span>
                      <Badge variant="outline" className="text-xs">
                        Palo Alto
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Looking for recommendations for authentic Indian restaurants in the Peninsula area. Missing
                      home-cooked flavors! Any suggestions?
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>5 hours ago</span>
                      <span>12 likes</span>
                      <span>15 comments</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to connect better</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Progress</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/profile/setup">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Your Communities */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Your Communities</CardTitle>
                <CardDescription>Groups you're part of</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Bay Area Tech Indians</div>
                    <div className="text-xs text-muted-foreground">2.1K members</div>
                  </div>
                  <Badge variant="secondary">Tech</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Classical Dance Enthusiasts</div>
                    <div className="text-xs text-muted-foreground">856 members</div>
                  </div>
                  <Badge variant="secondary">Culture</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Join More Groups
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connections</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Events Attended</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Posts Shared</span>
                  <span className="font-semibold">24</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">BharatVerse Assistant</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowChatbot(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
