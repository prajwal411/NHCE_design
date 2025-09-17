"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, Camera, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfileSetupPage() {
  const [profileData, setProfileData] = useState({
    profileImage: "",
    bio: "",
    profession: "",
    company: "",
    hometown: "",
    languages: [] as string[],
    interests: [] as string[],
    linkedIn: "",
    twitter: "",
    instagram: "",
  })
  const [newLanguage, setNewLanguage] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages.includes(newLanguage.trim())) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock profile creation - replace with actual database save later
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BharatVerse</span>
          </Link>
          <h1 className="text-3xl font-bold text-balance mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Help others connect with you by sharing your story</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>This information will be visible to other community members</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    <Camera className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your journey, and what brings you to BharatVerse..."
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-input min-h-[100px]"
                />
              </div>

              {/* Professional Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    placeholder="Software Engineer"
                    value={profileData.profession}
                    onChange={(e) => handleInputChange("profession", e.target.value)}
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Google"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="bg-input"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="hometown">Hometown in India</Label>
                <Input
                  id="hometown"
                  placeholder="Mumbai, Maharashtra"
                  value={profileData.hometown}
                  onChange={(e) => handleInputChange("hometown", e.target.value)}
                  className="bg-input"
                />
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="flex items-center gap-1">
                      {language}
                      <button
                        type="button"
                        onClick={() => removeLanguage(language)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a language (e.g., Hindi, Tamil, English)"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                    className="bg-input"
                  />
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label>Interests & Hobbies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an interest (e.g., Cricket, Bollywood, Cooking)"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                    className="bg-input"
                  />
                  <Button type="button" onClick={addInterest} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Label>Social Links (Optional)</Label>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn" className="text-sm">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedIn"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={profileData.linkedIn}
                      onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                      className="bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-sm">
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/yourusername"
                      value={profileData.twitter}
                      onChange={(e) => handleInputChange("twitter", e.target.value)}
                      className="bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-sm">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/yourusername"
                      value={profileData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      className="bg-input"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Saving Profile..." : "Complete Profile"}
                </Button>
                <Button variant="outline" type="button" className="flex-1 bg-transparent" asChild>
                  <Link href="/dashboard">Skip for Now</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
