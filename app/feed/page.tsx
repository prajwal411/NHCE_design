"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ImageIcon,
  MapPin,
  Video,
  Smile,
} from "lucide-react"
import Link from "next/link"

// Mock posts data
const mockPosts = [
  {
    id: 1,
    author: {
      name: "Priya Sharma",
      avatar: "/indian-woman-professional.png",
      location: "San Francisco, CA",
      verified: true,
    },
    content:
      "Just attended an incredible Diwali celebration in the Bay Area! The energy was amazing and it felt like being back home in Mumbai. So grateful for this wonderful community that keeps our traditions alive. The rangoli competition was fierce! 🪔✨",
    image: "/diwali-celebration.jpg",
    timestamp: "2 hours ago",
    likes: 124,
    comments: 18,
    shares: 7,
    tags: ["Diwali", "BayArea", "Culture"],
    type: "celebration",
  },
  {
    id: 2,
    author: {
      name: "Raj Kumar",
      avatar: "/indian-professional-man.png",
      location: "London, UK",
      verified: false,
    },
    content:
      "Looking for recommendations for authentic South Indian restaurants in London. Missing the taste of home-cooked sambar and rasam. Any hidden gems you'd recommend? Especially around Central London area.",
    timestamp: "4 hours ago",
    likes: 67,
    comments: 23,
    shares: 4,
    tags: ["Food", "London", "SouthIndian"],
    type: "question",
  },
  {
    id: 3,
    author: {
      name: "Anita Singh",
      avatar: "/indian-woman-entrepreneur.png",
      location: "Toronto, Canada",
      verified: true,
    },
    content:
      "Excited to announce that our startup just secured Series A funding! This journey from Bangalore to Toronto has been incredible. Special thanks to the Indian entrepreneur community here for all the support and mentorship. Dreams do come true! 🚀",
    timestamp: "6 hours ago",
    likes: 289,
    comments: 45,
    shares: 32,
    tags: ["Startup", "Success", "Toronto"],
    type: "achievement",
  },
  {
    id: 4,
    author: {
      name: "Vikram Patel",
      avatar: "/indian-professional-tech.png",
      location: "Sydney, Australia",
      verified: false,
    },
    content:
      "Organizing a cricket tournament for the Indian community in Sydney next month! We have 8 teams registered already. Looking for more players and sponsors. Let's bring the spirit of cricket down under! 🏏",
    image: "/cricket-tournament.jpg",
    timestamp: "8 hours ago",
    likes: 156,
    comments: 34,
    shares: 12,
    tags: ["Cricket", "Sydney", "Sports"],
    type: "event",
  },
  {
    id: 5,
    author: {
      name: "Meera Reddy",
      avatar: "/indian-classical-dancer.png",
      location: "Dubai, UAE",
      verified: true,
    },
    content:
      "Teaching my daughter Bharatanatyam and seeing her connect with our cultural roots brings me so much joy. It's beautiful how dance transcends borders and keeps our heritage alive. Here's a snippet from her recent performance.",
    video: "/bharatanatyam-performance.mp4",
    timestamp: "12 hours ago",
    likes: 203,
    comments: 28,
    shares: 15,
    tags: ["Bharatanatyam", "Culture", "Heritage"],
    type: "cultural",
  },
]

export default function FeedPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Mock post submission - replace with actual API call
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  const filteredPosts = mockPosts.filter((post) => {
    if (selectedFilter === "all") return true
    return post.type === selectedFilter
  })

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
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/feed" className="text-foreground font-medium">
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
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Summary */}
            <Card className="border-border mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/indian-professional.jpg" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Priya Sharma</h3>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-semibold text-primary">156</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">24</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold text-accent">12</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Filters */}
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle>Feed Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { key: "all", label: "All Posts", count: mockPosts.length },
                  { key: "celebration", label: "Celebrations", count: 1 },
                  { key: "question", label: "Questions", count: 1 },
                  { key: "achievement", label: "Achievements", count: 1 },
                  { key: "event", label: "Events", count: 1 },
                  { key: "cultural", label: "Cultural", count: 1 },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedFilter === filter.key
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.label}</span>
                      <span className="text-xs">{filter.count}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["#Diwali2024", "#TechCareers", "#IndianFood", "#CulturalHeritage", "#StartupLife"].map((topic) => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary cursor-pointer hover:underline">{topic}</span>
                    <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 10} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Create Post */}
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
                <CardDescription>What's on your mind today?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/indian-professional.jpg" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts, experiences, or ask questions..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="bg-input min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Smile className="h-4 w-4 mr-2" />
                      Feeling
                    </Button>
                  </div>
                  <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                    Share Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-border">
                  <CardContent className="pt-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{post.author.name}</h3>
                            {post.author.verified && (
                              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-foreground leading-relaxed">{post.content}</p>
                    </div>

                    {/* Post Media */}
                    {post.image && (
                      <div className="mb-4">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-64 object-cover rounded-lg border border-border"
                        />
                      </div>
                    )}

                    {post.video && (
                      <div className="mb-4">
                        <div className="w-full h-64 bg-muted rounded-lg border border-border flex items-center justify-center">
                          <div className="text-center">
                            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Video: {post.video}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Separator className="mb-4" />

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                          <Share2 className="h-4 w-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="bg-transparent">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
