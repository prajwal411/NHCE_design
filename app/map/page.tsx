"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, MapPin, Users, Calendar, Search, Zap, Heart, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const mockCommunities = [
  // North America
  {
    id: 1,
    name: "Bay Area Tech Indians",
    location: "San Francisco, CA",
    members: 12500,
    type: "Tech",
    coordinates: { x: 15, y: 45 },
    description: "Connect with Indian professionals in tech",
    nextEvent: "Diwali Tech Mixer - Oct 28",
    region: "North America",
  },
  {
    id: 2,
    name: "Toronto Young Professionals",
    location: "Toronto, Canada",
    members: 6800,
    type: "Professional",
    coordinates: { x: 25, y: 20 },
    description: "Building careers and friendships",
    nextEvent: "Career Mentorship Meet - Nov 12",
    region: "North America",
  },
  {
    id: 3,
    name: "New York Cultural Hub",
    location: "New York, NY",
    members: 9200,
    type: "Culture",
    coordinates: { x: 28, y: 35 },
    description: "Celebrating Indian arts and traditions",
    nextEvent: "Classical Music Concert - Nov 8",
    region: "North America",
  },
  {
    id: 4,
    name: "Seattle Tech Community",
    location: "Seattle, WA",
    members: 5400,
    type: "Tech",
    coordinates: { x: 12, y: 25 },
    description: "Indian tech professionals in the Pacific Northwest",
    nextEvent: "AI & ML Meetup - Nov 15",
    region: "North America",
  },
  {
    id: 5,
    name: "Vancouver Diaspora",
    location: "Vancouver, Canada",
    members: 4200,
    type: "Community",
    coordinates: { x: 10, y: 18 },
    description: "Connecting Indians in beautiful British Columbia",
    nextEvent: "Community Potluck - Nov 20",
    region: "North America",
  },

  // Europe
  {
    id: 6,
    name: "London Cultural Society",
    location: "London, UK",
    members: 8200,
    type: "Culture",
    coordinates: { x: 50, y: 25 },
    description: "Preserve and celebrate Indian traditions",
    nextEvent: "Bharatanatyam Workshop - Nov 5",
    region: "Europe",
  },
  {
    id: 7,
    name: "Berlin Tech Collective",
    location: "Berlin, Germany",
    members: 3800,
    type: "Tech",
    coordinates: { x: 52, y: 28 },
    description: "Indian developers and entrepreneurs in Germany",
    nextEvent: "Startup Pitch Night - Nov 18",
    region: "Europe",
  },
  {
    id: 8,
    name: "Paris Indian Network",
    location: "Paris, France",
    members: 4600,
    type: "Professional",
    coordinates: { x: 48, y: 30 },
    description: "Professional networking in the City of Light",
    nextEvent: "Business Mixer - Nov 22",
    region: "Europe",
  },
  {
    id: 9,
    name: "Amsterdam Professionals",
    location: "Amsterdam, Netherlands",
    members: 2900,
    type: "Professional",
    coordinates: { x: 51, y: 26 },
    description: "Indian professionals in the Netherlands",
    nextEvent: "Networking Brunch - Nov 25",
    region: "Europe",
  },
  {
    id: 10,
    name: "Zurich Business Circle",
    location: "Zurich, Switzerland",
    members: 2100,
    type: "Business",
    coordinates: { x: 53, y: 32 },
    description: "Indian business leaders in Switzerland",
    nextEvent: "Investment Forum - Dec 1",
    region: "Europe",
  },

  // Asia-Pacific
  {
    id: 11,
    name: "Singapore Professionals",
    location: "Singapore",
    members: 5600,
    type: "Professional",
    coordinates: { x: 75, y: 55 },
    description: "Indian professionals in Southeast Asia",
    nextEvent: "Networking Dinner - Nov 25",
    region: "Asia-Pacific",
  },
  {
    id: 12,
    name: "Sydney Indian Community",
    location: "Sydney, Australia",
    members: 9500,
    type: "Community",
    coordinates: { x: 85, y: 75 },
    description: "Connecting Indians down under",
    nextEvent: "Cricket Tournament - Nov 18",
    region: "Asia-Pacific",
  },
  {
    id: 13,
    name: "Melbourne Cultural Society",
    location: "Melbourne, Australia",
    members: 7200,
    type: "Culture",
    coordinates: { x: 83, y: 78 },
    description: "Celebrating Indian culture in Melbourne",
    nextEvent: "Diwali Festival - Oct 30",
    region: "Asia-Pacific",
  },
  {
    id: 14,
    name: "Tokyo Indian Circle",
    location: "Tokyo, Japan",
    members: 3400,
    type: "Professional",
    coordinates: { x: 82, y: 38 },
    description: "Indian professionals in Japan",
    nextEvent: "Cultural Exchange - Nov 10",
    region: "Asia-Pacific",
  },
  {
    id: 15,
    name: "Hong Kong Business Hub",
    location: "Hong Kong",
    members: 4100,
    type: "Business",
    coordinates: { x: 78, y: 48 },
    description: "Indian business community in Hong Kong",
    nextEvent: "Trade Summit - Nov 28",
    region: "Asia-Pacific",
  },

  // Middle East & Africa
  {
    id: 16,
    name: "Dubai Business Network",
    location: "Dubai, UAE",
    members: 7300,
    type: "Business",
    coordinates: { x: 60, y: 45 },
    description: "Indian entrepreneurs and business leaders",
    nextEvent: "Business Summit - Dec 2",
    region: "Middle East",
  },
  {
    id: 17,
    name: "Doha Professionals",
    location: "Doha, Qatar",
    members: 3200,
    type: "Professional",
    coordinates: { x: 58, y: 47 },
    description: "Indian professionals in Qatar",
    nextEvent: "Professional Meet - Nov 30",
    region: "Middle East",
  },
  {
    id: 18,
    name: "Kuwait Indian Society",
    location: "Kuwait City, Kuwait",
    members: 2800,
    type: "Community",
    coordinates: { x: 57, y: 42 },
    description: "Indian community in Kuwait",
    nextEvent: "Community Gathering - Dec 5",
    region: "Middle East",
  },
  {
    id: 19,
    name: "Johannesburg Indian Community",
    location: "Johannesburg, South Africa",
    members: 4500,
    type: "Community",
    coordinates: { x: 55, y: 70 },
    description: "Indian diaspora in South Africa",
    nextEvent: "Heritage Festival - Nov 12",
    region: "Africa",
  },

  // South America
  {
    id: 20,
    name: "São Paulo Indian Network",
    location: "São Paulo, Brazil",
    members: 1800,
    type: "Professional",
    coordinates: { x: 35, y: 68 },
    description: "Indian professionals in Brazil",
    nextEvent: "Business Networking - Dec 8",
    region: "South America",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function MapPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<(typeof mockCommunities)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [hoveredCommunity, setHoveredCommunity] = useState<number | null>(null)

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || community.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger re-render for pulsing animation
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BharatVerse</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/map" className="text-foreground font-medium">
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
              <Avatar className="w-8 h-8" asChild>
                <Link href="/profile/1">
                  <AvatarImage src="/indian-professional.jpg" />
                  <AvatarFallback className="text-xs">PS</AvatarFallback>
                </Link>
              </Avatar>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Global Indian Communities</h1>
          <p className="text-muted-foreground">Discover and connect with Indian communities worldwide</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search and Filters */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search communities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Community Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-sm mb-3">Regional Distribution</h4>
                  <div className="space-y-2">
                    {[
                      { region: "North America", count: 5, color: "bg-blue-500" },
                      { region: "Europe", count: 5, color: "bg-purple-500" },
                      { region: "Asia-Pacific", count: 5, color: "bg-green-500" },
                      { region: "Middle East", count: 4, color: "bg-orange-500" },
                      { region: "Africa", count: 1, color: "bg-red-500" },
                    ].map((region) => (
                      <div key={region.region} className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 ${region.color} rounded-full mr-2`}></div>
                          {region.region}
                        </div>
                        <span className="text-muted-foreground">{region.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community List */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Communities ({filteredCommunities.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {filteredCommunities.map((community, index) => (
                    <motion.div
                      key={community.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedCommunity?.id === community.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedCommunity(community)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{community.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {community.type}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {community.location}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {community.members.toLocaleString()} members
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map and Details */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle>Interactive World Map</CardTitle>
                <CardDescription>
                  Click on markers to explore communities • {filteredCommunities.length} communities shown
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mock World Map */}
                <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg border border-border overflow-hidden">
                  {/* Continents (simplified shapes) */}
                  <div className="absolute inset-0">
                    {/* North America */}
                    <motion.div
                      className="absolute top-8 left-4 w-32 h-24 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                    {/* Europe */}
                    <motion.div
                      className="absolute top-4 left-44 w-20 h-16 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    ></motion.div>
                    {/* Asia */}
                    <motion.div
                      className="absolute top-6 left-60 w-40 h-28 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    ></motion.div>
                    {/* Australia */}
                    <motion.div
                      className="absolute bottom-8 right-8 w-16 h-12 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    ></motion.div>
                    {/* Africa */}
                    <motion.div
                      className="absolute top-32 left-48 w-16 h-20 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    ></motion.div>
                    {/* South America */}
                    <motion.div
                      className="absolute bottom-16 left-28 w-12 h-24 bg-green-200 rounded-lg opacity-60"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.0, duration: 0.8 }}
                    ></motion.div>
                  </div>

                  {/* Community Markers */}
                  {filteredCommunities.map((community, index) => (
                    <motion.div
                      key={community.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{
                        left: `${community.coordinates.x}%`,
                        top: `${community.coordinates.y}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      onClick={() => setSelectedCommunity(community)}
                      onHoverStart={() => setHoveredCommunity(community.id)}
                      onHoverEnd={() => setHoveredCommunity(null)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                          selectedCommunity?.id === community.id
                            ? "bg-primary"
                            : community.type === "Tech"
                              ? "bg-blue-500"
                              : community.type === "Culture"
                                ? "bg-purple-500"
                                : community.type === "Professional"
                                  ? "bg-green-500"
                                  : community.type === "Business"
                                    ? "bg-orange-500"
                                    : "bg-gray-500"
                        }`}
                        animate={{
                          scale: selectedCommunity?.id === community.id ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: selectedCommunity?.id === community.id ? Number.POSITIVE_INFINITY : 0,
                        }}
                      >
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </motion.div>

                      <AnimatePresence>
                        {(selectedCommunity?.id === community.id || hoveredCommunity === community.id) && (
                          <motion.div
                            className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg min-w-48 z-20"
                            initial={{ opacity: 0, y: -10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="font-semibold text-sm mb-1 text-card-foreground">{community.name}</h4>
                            <p className="text-xs text-card-foreground/80 mb-1">{community.location}</p>
                            <p className="text-xs text-card-foreground/80">
                              {community.members.toLocaleString()} members
                            </p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {community.type}
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* Legend */}
                  <motion.div
                    className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <h4 className="font-semibold text-sm mb-2 text-card-foreground">Community Types</h4>
                    <div className="space-y-1">
                      {[
                        {
                          type: "Tech",
                          color: "bg-blue-500",
                          count: filteredCommunities.filter((c) => c.type === "Tech").length,
                        },
                        {
                          type: "Culture",
                          color: "bg-purple-500",
                          count: filteredCommunities.filter((c) => c.type === "Culture").length,
                        },
                        {
                          type: "Professional",
                          color: "bg-green-500",
                          count: filteredCommunities.filter((c) => c.type === "Professional").length,
                        },
                        {
                          type: "Business",
                          color: "bg-orange-500",
                          count: filteredCommunities.filter((c) => c.type === "Business").length,
                        },
                        {
                          type: "Community",
                          color: "bg-gray-500",
                          count: filteredCommunities.filter((c) => c.type === "Community").length,
                        },
                      ].map((item) => (
                        <div key={item.type} className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 ${item.color} rounded-full mr-2`}></div>
                            <span className="text-card-foreground">{item.type}</span>
                          </div>
                          <span className="text-card-foreground/70">({item.count})</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-4 right-4 bg-card border border-border rounded-lg p-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    <div className="flex items-center text-xs">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-card-foreground/80">
                        Live: {Math.floor(Math.random() * 500) + 200} online
                      </span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Community Details */}
            <AnimatePresence>
              {selectedCommunity && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {selectedCommunity.name}
                            <Badge variant="secondary">{selectedCommunity.type}</Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {selectedCommunity.location}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <motion.div
                            className="text-2xl font-bold text-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            {selectedCommunity.members.toLocaleString()}
                          </motion.div>
                          <div className="text-sm text-muted-foreground">members</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{selectedCommunity.description}</p>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span className="font-medium">Next Event:</span>
                        <span className="text-muted-foreground">{selectedCommunity.nextEvent}</span>
                      </div>

                      <motion.div
                        className="flex gap-3"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div variants={fadeInUp} className="flex-1">
                          <Button className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Users className="h-4 w-4 mr-2" />
                            Join Community
                          </Button>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Follow Updates
                          </Button>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <Button
                            variant="outline"
                            className="bg-transparent"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Zap className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </motion.div>

                      {/* Recent Activity */}
                      <div className="border-t border-border pt-4">
                        <h4 className="font-semibold mb-3">Recent Activity</h4>
                        <motion.div
                          className="space-y-3"
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                        >
                          <motion.div variants={fadeInUp} className="flex items-start space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="/indian-professional-man.png" />
                              <AvatarFallback className="text-xs">RK</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-semibold">Raj Kumar</span> shared photos from the recent meetup
                              </p>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="flex items-start space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="/indian-woman-entrepreneur.png" />
                              <AvatarFallback className="text-xs">AS</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-semibold">Anita Singh</span> posted about upcoming events
                              </p>
                              <p className="text-xs text-muted-foreground">5 hours ago</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Global Stats */}
            {!selectedCommunity && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Global Community Stats
                    </CardTitle>
                    <CardDescription>BharatVerse community at a glance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="grid md:grid-cols-4 gap-6 text-center"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {[
                        { value: "50K+", label: "Total Members", icon: Users, color: "text-primary" },
                        { value: "180+", label: "Countries", icon: Globe, color: "text-secondary" },
                        { value: "1.2K+", label: "Monthly Events", icon: Calendar, color: "text-accent" },
                        { value: "25+", label: "Languages", icon: Star, color: "text-primary" },
                      ].map((stat, index) => (
                        <motion.div key={stat.label} variants={fadeInUp} className="space-y-2">
                          <stat.icon className={`h-8 w-8 ${stat.color} mx-auto`} />
                          <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
