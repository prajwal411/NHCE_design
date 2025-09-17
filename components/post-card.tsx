"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, Video } from "lucide-react"

interface PostCardProps {
  post: {
    id: number
    author: {
      name: string
      avatar: string
      location: string
      verified: boolean
    }
    content: string
    image?: string
    video?: string
    timestamp: string
    likes: number
    comments: number
    shares: number
    tags?: string[]
    type: string
  }
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="border-border">
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
            <Button
              variant="ghost"
              size="sm"
              className={`${isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {post.likes + (isLiked ? 1 : 0)}
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
          <Button
            variant="ghost"
            size="sm"
            className={`${isBookmarked ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
