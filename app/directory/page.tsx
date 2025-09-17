"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Search, MapPin, Users, Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"

type DirectoryItem = {
  id: number
  name: string
  type: "Person" | "Community" | "Business"
  location: string
  avatar: string
  headline: string
  tags: string[]
  members?: number
}

const items: DirectoryItem[] = [
  {
    id: 1,
    name: "Priya Sharma",
    type: "Person",
    location: "San Francisco, CA",
    avatar: "/indian-woman-professional.png",
    headline: "Senior Software Engineer at Google",
    tags: ["Technology", "Mentorship", "Community"],
  },
  {
    id: 2,
    name: "Bay Area Tech Indians",
    type: "Community",
    location: "San Jose, CA",
    avatar: "/placeholder-logo.png",
    headline: "Connecting Indian tech professionals in the Bay Area",
    tags: ["Tech", "Networking"],
    members: 2100,
  },
  {
    id: 3,
    name: "Taste of India Catering",
    type: "Business",
    location: "Fremont, CA",
    avatar: "/placeholder-logo.png",
    headline: "Authentic Indian catering for events",
    tags: ["Food", "Catering", "Events"],
  },
  {
    id: 4,
    name: "Anita Singh",
    type: "Person",
    location: "Toronto, Canada",
    avatar: "/indian-woman-entrepreneur.png",
    headline: "Founder at TechStart",
    tags: ["Startup", "Product", "Leadership"],
  },
]

export default function DirectoryPage() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState<string>("all")
  const [location, setLocation] = useState<string>("all")

  const filtered = items.filter((it) => {
    const matchesQuery =
      it.name.toLowerCase().includes(query.toLowerCase()) ||
      it.headline.toLowerCase().includes(query.toLowerCase()) ||
      it.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    const matchesType = type === "all" || it.type.toLowerCase() === type
    const matchesLocation = location === "all" || it.location.toLowerCase().includes(location)
    return matchesQuery && matchesType && matchesLocation
  })

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
              <Link href="/directory" className="text-foreground font-medium">
                Directory
              </Link>
              <Link href="/forum" className="text-muted-foreground hover:text-foreground transition-colors">
                Forum
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Directory</h1>
          <p className="text-muted-foreground">Find people, communities, and businesses across BharatVerse</p>
        </div>

        <Card className="border-border mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search the directory..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 bg-input"
                />
              </div>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="person">People</SelectItem>
                  <SelectItem value="community">Communities</SelectItem>
                  <SelectItem value="business">Businesses</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="san">San Francisco Bay Area</SelectItem>
                  <SelectItem value="toronto">Toronto</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((it) => (
            <Card key={it.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={it.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {it.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {it.name}
                    <Badge variant="secondary" className="text-xs">
                      {it.type}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> {it.location}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-sm text-muted-foreground">{it.headline}</p>
                <div className="flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                {typeof it.members === "number" && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" /> {it.members.toLocaleString()} members
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm">Connect</Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-1" /> View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


