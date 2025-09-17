import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Users, Calendar, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BharatVerse</span>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-4">Welcome to BharatVerse!</h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Your account has been created successfully. You're now part of the global Indian community.
          </p>
        </div>

        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="text-center">What's Next?</CardTitle>
            <CardDescription className="text-center">Here are some things you can do to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your photo, interests, and background to connect with like-minded people.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Explore the Map</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover Indian communities and events happening near you and around the world.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Find Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse upcoming festivals, meetups, and cultural celebrations in your area.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Join Communities</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with professional networks, cultural groups, and hobby communities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/profile/setup">Complete Profile</Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
            <Link href="/dashboard">Explore Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
