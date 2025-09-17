"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Calendar, MapPin, Users, Clock, Search, Filter, Plus, Heart, Share2 } from "lucide-react"
import Link from "next/link"

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Diwali Tech Mixer 2024",
    description:
      "Join fellow tech professionals for an evening of networking, cultural celebration, and innovation. Experience the festival of lights with a modern twist in the heart of Silicon Valley.",
    date: "2024-10-28",
    time: "6:00 PM - 10:00 PM",
    location: "San Francisco, CA",
    venue: "Tech Hub SF, 123 Market Street",
    organizer: {
      name: "Bay Area Tech Indians",
      avatar: "/placeholder-logo.png",
      verified: true,
    },
    attendees: 156,
    maxAttendees: 200,
    price: "Free",
    category: "Tech",
    tags: ["Networking", "Diwali", "Technology"],
    image: "/placeholder.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Bharatanatyam Workshop",
    description:
      "Learn the classical Indian dance form from renowned instructor Guru Meera Reddy. Perfect for beginners and intermediate dancers looking to connect with their cultural roots.",
    date: "2024-11-05",
    time: "2:00 PM - 5:00 PM",
    location: "Fremont, CA",
    venue: "Cultural Center, 456 Fremont Blvd",
    organizer: {
      name: "Classical Arts Society",
      avatar: "/placeholder-logo.png",
      verified: true,
    },
    attendees: 45,
    maxAttendees: 60,
    price: "$25",
    category: "Culture",
    tags: ["Dance", "Classical", "Workshop"],
    image: "/placeholder.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Career Mentorship Meet",
    description:
      "Connect with successful Indian professionals across various industries. Get career advice, expand your network, and discover new opportunities in the Canadian job market.",
    date: "2024-11-12",
    time: "7:00 PM - 9:00 PM",
    location: "Toronto, Canada",
    venue: "Business Center, 789 Bay Street",
    organizer: {
      name: "Toronto Young Professionals",
      avatar: "/placeholder-logo.png",
      verified: false,
    },
    attendees: 89,
    maxAttendees: 120,
    price: "Free",
    category: "Professional",
    tags: ["Career", "Mentorship", "Networking"],
    image: "/placeholder.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Cricket Tournament 2024",
    description:
      "Annual cricket tournament bringing together Indian communities across Sydney. Teams from different suburbs compete in this exciting sporting event with prizes and cultural performances.",
    date: "2024-11-18",
    time: "9:00 AM - 6:00 PM",
    location: "Sydney, Australia",
    venue: "Olympic Park Cricket Grounds",
    organizer: {
      name: "Sydney Indian Sports Club",
      avatar: "/placeholder-logo.png",
      verified: true,
    },
    attendees: 234,
    maxAttendees: 300,
    price: "$15",
    category: "Sports",
    tags: ["Cricket", "Tournament", "Sports"],
    image: "/placeholder.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Indian Food Festival",
    description:
      "Celebrate the diverse flavors of India with authentic cuisine from different regions. Local restaurants and home chefs showcase traditional recipes and modern fusion dishes.",
    date: "2024-11-25",
    time: "12:00 PM - 8:00 PM",
    location: "London, UK",
    venue: "Hyde Park Community Center",
    organizer: {
      name: "London Food Enthusiasts",
      avatar: "/placeholder-logo.png",
      verified: true,
    },
    attendees: 312,
    maxAttendees: 500,
    price: "$20",
    category: "Food",
    tags: ["Food", "Festival", "Culture"],
    image: "/placeholder.jpg",
    featured: true,
  },
  {
    id: 6,
    title: "Startup Pitch Night",
    description:
      "Indian entrepreneurs showcase their innovative startups to investors and fellow entrepreneurs. Network with the vibrant startup ecosystem and discover the next big idea.",
    date: "2024-12-02",
    time: "6:30 PM - 9:30 PM",
    location: "Dubai, UAE",
    venue: "Innovation Hub, DIFC",
    organizer: {
      name: "Dubai Entrepreneurs Network",
      avatar: "/placeholder-logo.png",
      verified: true,
    },
    attendees: 78,
    maxAttendees: 100,
    price: "Free",
    category: "Business",
    tags: ["Startup", "Pitch", "Investment"],
    image: "/placeholder.jpg",
    featured: false,
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewMode, setViewMode] = useState("upcoming")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesLocation =
      selectedLocation === "all" || event.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesCategory && matchesLocation
  })

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const upcomingEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
              <Link href="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                Map
              </Link>
              <Link href="/events" className="text-foreground font-medium">
                Events
              </Link>
              <Link href="/feed" className="text-muted-foreground hover:text-foreground transition-colors">
                Feed
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Avatar className="w-8 h-8" asChild>
                <Link href="/profile/1">
                  <AvatarImage src="/indian-professional.jpg" />
                  <AvatarFallback className="text-xs">PS</AvatarFallback>
                </Link>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Events</h1>
          <p className="text-muted-foreground">Discover and join events happening in Indian communities worldwide</p>
        </div>

        {/* Search and Filters */}
        <Card className="border-border mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="toronto">Toronto</SelectItem>
                  <SelectItem value="sydney">Sydney</SelectItem>
                  <SelectItem value="dubai">Dubai</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Event Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="featured">Featured Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Events Yet</h3>
                <p className="text-muted-foreground mb-4">You haven't RSVP'd to any events yet.</p>
                <Button>Browse Events</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
            <CardDescription>Community engagement overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{mockEvents.length}</div>
                <div className="text-sm text-muted-foreground">Total Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-1">
                  {mockEvents.reduce((sum, event) => sum + event.attendees, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Attendees</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-1">12</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Event Card Component
function EventCard({ event }: { event: (typeof mockEvents)[0] }) {
  const [isInterested, setIsInterested] = useState(false)

  return (
    <Card className="border-border hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {event.featured && <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>}
        <Badge variant="secondary" className="absolute top-3 right-3">
          {event.category}
        </Badge>
      </div>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{event.description}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>
                {event.attendees}/{event.maxAttendees} attending
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {event.organizer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{event.organizer.name}</span>
            </div>
            <div className="text-sm font-semibold text-primary">{event.price}</div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm">
              RSVP
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`bg-transparent ${isInterested ? "text-red-500 border-red-500" : ""}`}
              onClick={() => setIsInterested(!isInterested)}
            >
              <Heart className={`h-4 w-4 ${isInterested ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
