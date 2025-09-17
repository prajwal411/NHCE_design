import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Globe, MapPin, Briefcase, Calendar, Users, Heart, MessageCircle, Share2, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock user data - replace with actual data fetching
const mockUser = {
  id: "1",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  profileImage: "/indian-woman-professional.png",
  bio: "Software engineer passionate about building inclusive tech solutions. Originally from Mumbai, now based in San Francisco. Love connecting with fellow Indians in tech and sharing our cultural heritage.",
  profession: "Senior Software Engineer",
  company: "Google",
  location: "San Francisco, CA",
  hometown: "Mumbai, Maharashtra",
  languages: ["English", "Hindi", "Marathi", "Spanish"],
  interests: ["Technology", "Classical Dance", "Cricket", "Travel", "Photography", "Cooking"],
  joinedDate: "March 2024",
  connections: 156,
  eventsAttended: 12,
  postsCount: 24,
  socialLinks: {
    linkedIn: "https://linkedin.com/in/priyasharma",
    twitter: "https://twitter.com/priyasharma",
    instagram: "https://instagram.com/priyasharma",
  },
}

export default function ProfilePage({ params }: { params: { id: string } }) {
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card className="border-border mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="w-32 h-32 mx-auto md:mx-0">
                    <AvatarImage src={mockUser.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 text-muted-foreground">
                      <div className="flex items-center justify-center md:justify-start">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {mockUser.profession} at {mockUser.company}
                      </div>
                      <Separator orientation="vertical" className="hidden md:block h-4" />
                      <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        {mockUser.location}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{mockUser.bio}</p>

                    {/* Social Links */}
                    <div className="flex justify-center md:justify-start gap-3">
                      {mockUser.socialLinks.linkedIn && (
                        <Button variant="outline" size="sm" className="bg-transparent" asChild>
                          <Link href={mockUser.socialLinks.linkedIn} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            LinkedIn
                          </Link>
                        </Button>
                      )}
                      {mockUser.socialLinks.twitter && (
                        <Button variant="outline" size="sm" className="bg-transparent" asChild>
                          <Link href={mockUser.socialLinks.twitter} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Twitter
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages & Interests */}
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle>Languages & Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest posts and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUser.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">PS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{mockUser.name}</span> shared a post about Diwali celebrations
                        in the Bay Area
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUser.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">PS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{mockUser.name}</span> attended "Tech Professionals Meetup" in
                        San Francisco
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUser.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">PS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{mockUser.name}</span> joined the "Classical Dance Enthusiasts"
                        group
                      </p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Connections</span>
                  </div>
                  <span className="font-semibold">{mockUser.connections}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-secondary" />
                    <span className="text-sm">Events Attended</span>
                  </div>
                  <span className="font-semibold">{mockUser.eventsAttended}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-accent" />
                    <span className="text-sm">Posts Shared</span>
                  </div>
                  <span className="font-semibold">{mockUser.postsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="font-semibold">{mockUser.joinedDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Hometown */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Roots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">
                    Originally from <span className="font-semibold">{mockUser.hometown}</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Connect */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Send Connection Request
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
