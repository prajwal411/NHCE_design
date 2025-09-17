"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, MapPin, Calendar, Users, Plus, Bell, Search, Settings, Trophy, Star, X, Award } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useI18n } from "@/components/i18n-provider"
import { LanguageToggle } from "@/components/language-toggle"

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          rotate: [0, 180],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 1.2,
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
)

const Sparkle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-0.5 h-0.5 bg-primary rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 4,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

const BackgroundSparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 15 }).map((_, i) => (
      <Sparkle key={i} delay={i * 0.3} />
    ))}
  </div>
)

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, type: "achievement", message: 'You earned the "Community Builder" badge!', time: "2 min ago" },
    { id: 2, type: "event", message: "Diwali Tech Mixer starts in 2 hours", time: "1 hour ago" },
    { id: 3, type: "connection", message: "Raj Kumar wants to connect with you", time: "3 hours ago" },
  ])

  const achievements = [
    { name: "Community Builder", icon: "🏗️", description: "Helped 10 new members", progress: 100 },
    { name: "Event Enthusiast", icon: "🎉", description: "Attended 5 events", progress: 80 },
    { name: "Cultural Ambassador", icon: "🎭", description: "Shared 20 cultural posts", progress: 60 },
    { name: "Mentor", icon: "👨‍🏫", description: "Guided 3 newcomers", progress: 40 },
  ]

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { t } = useI18n()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundSparkles />
      <FloatingElements />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Globe className="h-8 w-8 text-primary" />
                </motion.div>
                <span className="text-2xl font-bold text-foreground">BharatVerse</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: "Dashboard", href: "/dashboard", active: true },
                { name: "Map", href: "/map" },
                { name: "Events", href: "/events" },
                { name: "Feed", href: "/feed" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      color: "hsl(var(--primary))",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`transition-colors relative ${
                        item.active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                      {item.active && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeTab"
                        />
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageToggle />

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {notifications.length}
                      </motion.span>
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Avatar className="w-8 h-8" asChild>
                  <Link href="/profile/1">
                    <AvatarImage src="/indian-professional.jpg" />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
                      PS
                    </AvatarFallback>
                  </Link>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 text-center relative"
          >
            <div className="container mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm"
              >
                🎉 Welcome to BharatVerse! Complete your profile to unlock all features and connect with your community.
              </motion.p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setShowOnboarding(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold mb-2"
              >
                {t("welcome")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground"
              >
                {t("subheading")}
              </motion.p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="flex items-center gap-1">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Trophy className="h-5 w-5 text-primary" />
                  </motion.div>
                  Level 5 Community Builder
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="outline" className="flex items-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Star className="h-3 w-3 text-yellow-500" />
                  </motion.div>
                  1,250 Points
                </Badge>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-border mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Award className="h-5 w-5 text-primary" />
                  </motion.div>
                  {t("achievementsTitle")}
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
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-background/50 backdrop-blur-sm"
                    >
                      <motion.div
                        className="text-2xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{achievement.description}</div>
                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${achievement.progress}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      {achievement.progress === 100 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 1.5, type: "spring", stiffness: 200 }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            <Trophy className="h-3 w-3 mr-1" />
                            Earned
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <CardHeader>
                  <CardTitle>{t("quickActionsTitle")}</CardTitle>
                  <CardDescription>{t("quickActionsDesc")}</CardDescription>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="h-auto p-4 flex-col items-start bg-transparent hover:bg-muted/50 relative overflow-hidden group"
                          variant="outline"
                          asChild
                        >
                          <Link href={action.href}>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                            />
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                              <action.icon className={`h-6 w-6 mb-2 ${action.color} relative z-10`} />
                            </motion.div>
                            <div className="text-left relative z-10">
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t("upcomingTitle")}</CardTitle>
                  <CardDescription>{t("upcomingDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors relative overflow-hidden group"
                  >
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Calendar className="h-6 w-6 text-primary" />
                    </motion.div>
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
                      <Button size="sm" className="relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                        />
                        <span className="relative z-10">{t("rsvp")}</span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <motion.div
                      className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Users className="h-6 w-6 text-secondary" />
                    </motion.div>
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
                        {t("learnMore")}
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Feed Preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t("highlightsTitle")}</CardTitle>
                  <CardDescription>{t("highlightsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Raj Kumar",
                      location: "San Jose",
                      avatar: "RK",
                      content:
                        "Just attended an amazing Garba night in the Bay Area! The energy was incredible and it felt like home. Thanks to everyone who made it special! 🎉",
                      time: "2 hours ago",
                      likes: 24,
                      comments: 8,
                    },
                    {
                      name: "Anita Singh",
                      location: "Palo Alto",
                      avatar: "AS",
                      content:
                        "Looking for recommendations for authentic Indian restaurants in the Peninsula area. Missing home-cooked flavors! Any suggestions?",
                      time: "5 hours ago",
                      likes: 12,
                      comments: 15,
                    },
                  ].map((post, index) => (
                    <motion.div
                      key={post.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{post.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.location}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{post.time}</span>
                          <motion.span
                            whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                            className="cursor-pointer"
                          >
                            {post.likes} likes
                          </motion.span>
                          <motion.span
                            whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                            className="cursor-pointer"
                          >
                            {post.comments} comments
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t("profileTitle")}</CardTitle>
                  <CardDescription>{t("profileDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{t("profileProgress")}</span>
                      <motion.span
                        className="font-semibold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        75%
                      </motion.span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="sm" className="w-full" asChild>
                        <Link href="/profile/setup">{t("completeProfile")}</Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Communities */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t("yourCommunitiesTitle")}</CardTitle>
                  <CardDescription>{t("yourCommunitiesDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Bay Area Tech Indians", members: "2.1K", type: "Tech" },
                    { name: "Classical Dance Enthusiasts", members: "856", type: "Culture" },
                  ].map((community, index) => (
                    <motion.div
                      key={community.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-sm">{community.name}</div>
                        <div className="text-xs text-muted-foreground">{community.members} members</div>
                      </div>
                      <Badge variant="secondary">{community.type}</Badge>
                    </motion.div>
                  ))}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      {t("joinMoreGroups")}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>{t("yourImpactTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Connections", value: "156" },
                    { label: "Events Attended", value: "12" },
                    { label: "Posts Shared", value: "24" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{stat.label}</span>
                      <motion.span
                        className="font-semibold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  )
}
