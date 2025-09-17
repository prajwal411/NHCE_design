import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, Calendar, MapPin, Users, Heart, Share2, ExternalLink, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock event data - replace with actual data fetching
const mockEvent = {
  id: 1,
  title: "Diwali Tech Mixer 2024",
  description:
    "Join fellow tech professionals for an evening of networking, cultural celebration, and innovation. Experience the festival of lights with a modern twist in the heart of Silicon Valley. This event brings together the brightest minds in technology while celebrating our rich cultural heritage.",
  longDescription:
    "The Diwali Tech Mixer is more than just a networking event - it's a celebration of innovation, culture, and community. Connect with like-minded professionals, discover new opportunities, and be part of the vibrant Indian tech ecosystem in the Bay Area. The evening will feature keynote speakers, panel discussions, cultural performances, and plenty of opportunities to network with industry leaders.",
  date: "2024-10-28",
  time: "6:00 PM - 10:00 PM",
  location: "San Francisco, CA",
  venue: "Tech Hub SF, 123 Market Street",
  organizer: {
    name: "Bay Area Tech Indians",
    avatar: "/tech-community-logo.png",
    verified: true,
    description: "Connecting Indian tech professionals in the Bay Area",
    members: 12500,
  },
  attendees: 156,
  maxAttendees: 200,
  price: "Free",
  category: "Tech",
  tags: ["Networking", "Diwali", "Technology", "Innovation", "Culture"],
  image: "/diwali-tech-mixer.jpg",
  featured: true,
  agenda: [
    { time: "6:00 PM", activity: "Registration & Welcome Drinks" },
    { time: "6:30 PM", activity: "Opening Ceremony & Cultural Performance" },
    { time: "7:00 PM", activity: "Keynote: Future of Indian Tech Diaspora" },
    { time: "7:30 PM", activity: "Panel Discussion: Innovation & Tradition" },
    { time: "8:30 PM", activity: "Networking Dinner" },
    { time: "9:30 PM", activity: "Closing Remarks & Prize Distribution" },
  ],
  speakers: [
    {
      name: "Dr. Rajesh Kumar",
      title: "VP Engineering, Google",
      avatar: "/speaker-rajesh.png",
    },
    {
      name: "Priya Patel",
      title: "Founder, TechStart",
      avatar: "/speaker-priya.png",
    },
  ],
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/events" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BharatVerse</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Event
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <div className="relative mb-8">
              <img
                src={mockEvent.image || "/placeholder.svg"}
                alt={mockEvent.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              {mockEvent.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured Event</Badge>
              )}
              <Badge variant="secondary" className="absolute top-4 right-4">
                {mockEvent.category}
              </Badge>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{mockEvent.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{mockEvent.longDescription}</p>
              </div>

              {/* Event Details */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-semibold">
                          {new Date(mockEvent.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">{mockEvent.time}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-secondary" />
                      <div>
                        <div className="font-semibold">{mockEvent.venue}</div>
                        <div className="text-sm text-muted-foreground">{mockEvent.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-accent" />
                      <div>
                        <div className="font-semibold">
                          {mockEvent.attendees}/{mockEvent.maxAttendees} Attending
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {mockEvent.maxAttendees - mockEvent.attendees} spots remaining
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">$</span>
                      </div>
                      <div>
                        <div className="font-semibold">{mockEvent.price}</div>
                        <div className="text-sm text-muted-foreground">Registration fee</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Agenda */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Event Agenda</CardTitle>
                  <CardDescription>Schedule of activities for the evening</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEvent.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-20 text-sm font-medium text-primary flex-shrink-0">{item.time}</div>
                        <div className="flex-1">
                          <div className="font-medium">{item.activity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Speakers */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Featured Speakers</CardTitle>
                  <CardDescription>Industry leaders sharing their insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockEvent.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{speaker.name}</div>
                          <div className="text-sm text-muted-foreground">{speaker.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockEvent.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-primary">{mockEvent.price}</div>
                  <Button className="w-full" size="lg">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    RSVP Now
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Organized by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={mockEvent.organizer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {mockEvent.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{mockEvent.organizer.name}</h3>
                      {mockEvent.organizer.verified && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{mockEvent.organizer.description}</p>
                    <div className="text-xs text-muted-foreground">
                      {mockEvent.organizer.members.toLocaleString()} members
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Community
                </Button>
              </CardContent>
            </Card>

            {/* Attendees Preview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Who's Going</CardTitle>
                <CardDescription>{mockEvent.attendees} people attending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-background">
                      <AvatarImage src={`/attendee-${i}.png`} />
                      <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 border-2 border-background rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    +{mockEvent.attendees - 5}
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  View All Attendees
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
