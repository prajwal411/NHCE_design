"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Globe,
  UserPlus,
  Search,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  MapPin,
  Clock,
  Users,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { motion, LazyMotion, domAnimation, MotionConfig, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Chatbot } from "@/components/chatbot"
import { MouseTracker } from "@/components/mouse-tracker"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

const buttonHover = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

const Sparkle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 3,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

const BackgroundSparkles = ({ count = 14 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <Sparkle key={i} delay={i * 0.2} />
    ))}
  </div>
)

const FloatingElements = ({ count = 5 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full will-change-transform"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 1.5,
          ease: "linear",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
)

export default function HomePage() {
  const [memberCount, setMemberCount] = useState(50000)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setMemberCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.9 }}>
        <div className="min-h-screen bg-background relative overflow-hidden">
          {!prefersReduced && <MouseTracker />}
          {!prefersReduced && <BackgroundSparkles count={14} />}
          {!prefersReduced && <FloatingElements count={5} />}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 will-change-transform"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Globe className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-2xl font-bold text-foreground">BharatVerse</span>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-6">
              {[
                { name: "Feed", href: "/feed" },
                { name: "Map", href: "/map" },
                { name: "Events", href: "/events" },
                { name: "Guides", href: "#guides" },
                { name: "Directory", href: "#directory" },
                { name: "Forum", href: "#forum" },
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
                      className="text-muted-foreground hover:text-foreground transition-colors relative"
                    >
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary will-change-transform"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <motion.div
                className="relative hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input placeholder="Search posts, users, events..." className="pl-10 w-64" />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Button size="sm" asChild className="relative overflow-hidden">
                  <Link href="/auth/signup">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    />
                    <span className="relative z-10">Join Now</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="py-20 px-4 overflow-hidden relative">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-balance mb-6 relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                Where India Connects.
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              BharatVerse is your global gateway to the vibrant tapestry of Indian culture, innovation, and community.
              Share your story, find your people, and rediscover your roots.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Button size="lg" className="text-lg px-8 relative overflow-hidden group" asChild>
                  <Link href="/auth/signup">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                    />
                    <span className="relative z-10">Join the Community</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent group" asChild>
                  <Link href="/map">
                    <span>Explore the Map</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-3 text-sm"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {["Share Your Experience", "Post a Question", "Join the Celebration"].map((text, index) => (
                <motion.div key={text} variants={fadeInUp}>
                  <Button variant="secondary" size="sm" asChild className="group">
                    <Link href={index === 2 ? "/events" : "/feed"}>
                      <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        {text}
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-16 px-4 bg-card/30 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {!prefersReduced && <BackgroundSparkles count={10} />}
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2">Community Vibrancy</h2>
            <p className="text-muted-foreground">Real-time statistics showing our growing global family</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { value: memberCount.toLocaleString() + "+", label: "Active Members", icon: Users },
              { value: "180+", label: "Countries", icon: Globe },
              { value: "1.2K+", label: "Events Monthly", icon: Calendar },
              { value: "25+", label: "Languages", icon: MessageCircle },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
                className="p-4 rounded-lg bg-background/50 cursor-pointer group"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-primary mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-balance mb-4">Your Indian Experience, Amplified.</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: UserPlus,
                title: "Create Your Profile",
                desc: "Tell your story. Pin your roots on our global map and connect with your community based on interests, location, and heritage.",
                color: "primary",
              },
              {
                icon: Search,
                title: "Explore the Tapestry",
                desc: "Discover events near you, find authentic recipes, read travel guides from locals, and celebrate the achievements of Indians worldwide.",
                color: "secondary",
              },
              {
                icon: MessageCircle,
                title: "Join the Conversation",
                desc: "Share your passions, ask questions, and build meaningful connections through our shared feed and interactive events calendar.",
                color: "accent",
              },
            ].map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="border-border hover:shadow-lg transition-all duration-300 text-center group">
                  <CardHeader>
                    <motion.div
                      className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-${feature.color}/20 transition-colors`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-balance mb-4">A Global Village, Connected.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our community spans every continent. Explore our interactive map to find cultural events, community
              members, and local guides wherever you are in the world.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { country: "India", members: "15.2K", color: "primary" },
                  { country: "USA", members: "12.8K", color: "secondary" },
                  { country: "Canada", members: "8.5K", color: "accent" },
                  { country: "UK", members: "6.2K", color: "primary" },
                  { country: "Australia", members: "4.8K", color: "secondary" },
                  { country: "UAE", members: "3.9K", color: "accent" },
                ].map((location, index) => (
                  <motion.div
                    key={location.country}
                    className="text-center"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className={`w-3 h-3 bg-${location.color} rounded-full mx-auto mb-2`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    />
                    <p className="text-sm font-medium">{location.country}</p>
                    <p className="text-xs text-muted-foreground">{location.members} members</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-4 mb-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { title: "Tech Hubs", count: "45+", desc: "Silicon Valley, Bangalore, Toronto", icon: Zap },
                  { title: "Cultural Centers", count: "120+", desc: "London, New York, Sydney", icon: Star },
                  { title: "Business Networks", count: "80+", desc: "Dubai, Singapore, Mumbai", icon: TrendingUp },
                ].map((community, index) => (
                  <motion.div
                    key={community.title}
                    variants={fadeInUp}
                    className="text-center p-4 bg-background/50 rounded-lg"
                    whileHover={{ y: -5 }}
                  >
                    <community.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{community.title}</p>
                    <p className="text-xs text-primary font-bold">{community.count}</p>
                    <p className="text-xs text-muted-foreground">{community.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center">
                <motion.div {...scaleOnHover}>
                  <Button size="lg" asChild>
                    <Link href="/map">Explore the Global Map</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-balance mb-6">See What's Happening in the Community</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a glimpse of the stories, conversations, and connections being made right now on BharatVerse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">P</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">Priya • Toronto</p>
                    <p className="text-sm">
                      "Just made my grandma's legendary biryani recipe here in Toronto! Who's hungry? 😉 #Food #NRILife
                      #BiryaniLove"
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                      <span>❤️ 24</span>
                      <span>💬 8</span>
                      <span>2h ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">R</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">Raj • Bengaluru</p>
                    <p className="text-sm">
                      "Thrilled to announce our deep-tech startup, based in Bengaluru, just closed its Series A funding!
                      #IndianStartups #Innovation #Bengaluru"
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                      <span>❤️ 156</span>
                      <span>💬 32</span>
                      <span>4h ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">Anita • New York</p>
                    <p className="text-sm">
                      "Explaining the significance of Raksha Bandhan to my international colleagues today. So proud to
                      share our traditions! #Culture #Rakhi #Diaspora"
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                      <span>❤️ 89</span>
                      <span>💬 15</span>
                      <span>6h ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <motion.section
        className="py-20 px-4 bg-card/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-balance mb-4">Live Community Activity</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what's happening right now in our vibrant community - stories, achievements, and connections being
              made every moment.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Posts</h3>
                <motion.div {...scaleOnHover}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/feed">View All</Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  {
                    name: "Priya",
                    location: "Toronto",
                    time: "2h ago",
                    content:
                      "Just made my grandma's legendary biryani recipe here in Toronto! Who's hungry? 😉 #Food #NRILife #BiryaniLove",
                    likes: 24,
                    comments: 8,
                    shares: 3,
                    initial: "P",
                    color: "primary",
                  },
                  {
                    name: "Raj",
                    location: "Bengaluru",
                    time: "4h ago",
                    content:
                      "Thrilled to announce our deep-tech startup just closed Series A funding! 🚀 #IndianStartups #Innovation",
                    likes: 156,
                    comments: 32,
                    shares: 18,
                    initial: "R",
                    color: "secondary",
                  },
                  {
                    name: "Anita",
                    location: "New York",
                    time: "6h ago",
                    content:
                      "Explaining Raksha Bandhan to my international colleagues today. So proud to share our traditions! 🪔",
                    likes: 89,
                    comments: 15,
                    shares: 7,
                    initial: "A",
                    color: "accent",
                  },
                ].map((post, index) => (
                  <motion.div key={post.name} variants={fadeInUp}>
                    <Card className="border-border hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <motion.div
                            className={`w-10 h-10 bg-${post.color}/10 rounded-full flex items-center justify-center`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className={`text-sm font-semibold text-${post.color}`}>{post.initial}</span>
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-2">
                              {post.name} • {post.location} • {post.time}
                            </p>
                            <p className="text-sm mb-3">{post.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <motion.span
                                className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                ❤️ {post.likes}
                              </motion.span>
                              <motion.span
                                className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                💬 {post.comments}
                              </motion.span>
                              <motion.span
                                className="flex items-center gap-1 cursor-pointer hover:text-green-500 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                🔄 {post.shares}
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="space-y-8">
              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </h3>
                  <motion.div {...scaleOnHover}>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/events">View All</Link>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Diwali Tech Mixer",
                      location: "San Francisco",
                      date: "Nov 12, 7:00 PM",
                      color: "primary",
                    },
                    {
                      title: "Bharatanatyam Workshop",
                      location: "London",
                      date: "Nov 15, 2:00 PM",
                      color: "secondary",
                    },
                    { title: "Career Mentorship", location: "Virtual", date: "Nov 18, 6:00 PM", color: "accent" },
                  ].map((event, index) => (
                    <motion.div key={event.title} variants={fadeInUp}>
                      <Card className="border-border hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <motion.div
                              className={`w-2 h-2 bg-${event.color} rounded-full mt-2`}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.date}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Top Contributors */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Contributors
                  </h3>
                </div>

                <motion.div
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    { name: "Arjun K.", location: "Mumbai", points: "2.4K", rank: 1, color: "primary" },
                    { name: "Meera S.", location: "Toronto", points: "2.1K", rank: 2, color: "secondary" },
                    { name: "Vikram R.", location: "London", points: "1.9K", rank: 3, color: "accent" },
                  ].map((contributor, index) => (
                    <motion.div key={contributor.name} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                      <div className={`flex items-center space-x-3 p-3 bg-${contributor.color}/5 rounded-lg`}>
                        <motion.div
                          className={`w-8 h-8 bg-${contributor.color}/20 rounded-full flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className={`text-xs font-bold text-${contributor.color}`}>{contributor.rank}</span>
                        </motion.div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {contributor.location} • {contributor.points} points
                          </p>
                        </div>
                        <TrendingUp className={`h-4 w-4 text-${contributor.color}`} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-balance mb-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Ready to Find Your Community?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Join thousands of others who are celebrating, connecting, and building the definitive global network for
              all things India.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div {...scaleOnHover}>
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/auth/signup">Sign Up - It's Free</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BharatVerse</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                The Global Indian Community Hub - connecting hearts, minds, and cultures across continents.
              </p>
              <div className="flex space-x-4 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Info
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Resources
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/feed" className="hover:text-foreground transition-colors">
                    Community Feed
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-foreground transition-colors">
                    Global Map
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-foreground transition-colors">
                    Events Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Cultural Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Member Directory
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Discussion Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Mentorship
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Report Issue
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 BharatVerse. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition-colors">
                Status
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                API
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
      </MotionConfig>
    </LazyMotion>
  )
}
