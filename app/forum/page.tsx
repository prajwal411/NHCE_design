"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Search, MessageCircle, ThumbsUp, Reply, Plus } from "lucide-react"
import Link from "next/link"

type Topic = {
  id: number
  title: string
  category: string
  author: { name: string; avatar: string }
  replies: number
  likes: number
  lastActivity: string
}

const topics: Topic[] = [
  {
    id: 1,
    title: "Best Indian restaurants in the Bay Area?",
    category: "Food",
    author: { name: "Raj Kumar", avatar: "/indian-professional-man.png" },
    replies: 24,
    likes: 56,
    lastActivity: "2h ago",
  },
  {
    id: 2,
    title: "How to celebrate Diwali with non-Indian friends—ideas?",
    category: "Culture",
    author: { name: "Anita Singh", avatar: "/indian-woman-entrepreneur.png" },
    replies: 18,
    likes: 73,
    lastActivity: "5h ago",
  },
  {
    id: 3,
    title: "Job search tips for newcomers in Toronto",
    category: "Careers",
    author: { name: "Priya Sharma", avatar: "/indian-woman-professional.png" },
    replies: 41,
    likes: 120,
    lastActivity: "1d ago",
  },
]

export default function ForumPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("latest")

  const filtered = topics.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))

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
              <Link href="/feed" className="text-muted-foreground hover:text-foreground transition-colors">
                Feed
              </Link>
              <Link href="/map" className="text-muted-foreground hover:text-foreground transition-colors">
                Map
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/directory" className="text-muted-foreground hover:text-foreground transition-colors">
                Directory
              </Link>
              <Link href="/forum" className="text-foreground font-medium">
                Forum
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Forum</h1>
            <p className="text-muted-foreground">Ask questions, share experiences, and help the community</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> New Topic
          </Button>
        </div>

        <Card className="border-border mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 bg-input"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filtered.map((t) => (
              <Card key={t.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={t.author.avatar} />
                      <AvatarFallback>
                        {t.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/forum/${t.id}`} className="font-semibold hover:underline">
                          {t.title}
                        </Link>
                        <Badge variant="secondary" className="text-xs">{t.category}</Badge>
                      </div>
                      <CardDescription>Started by {t.author.name} • {t.lastActivity}</CardDescription>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {t.replies} replies
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" /> {t.likes} likes
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Reply className="h-3 w-3" /> Last activity {t.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Join the conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Culture", count: 124 },
                  { name: "Careers", count: 98 },
                  { name: "Food", count: 87 },
                  { name: "Travel", count: 64 },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{c.name}</span>
                    <Badge variant="outline" className="text-xs">{c.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>This week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Priya Sharma", avatar: "/indian-woman-professional.png", points: 240 },
                  { name: "Raj Kumar", avatar: "/indian-professional-man.png", points: 210 },
                  { name: "Anita Singh", avatar: "/indian-woman-entrepreneur.png", points: 190 },
                ].map((u) => (
                  <div key={u.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback>
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{u.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{u.points} pts</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


