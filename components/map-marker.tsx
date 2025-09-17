"use client"

import { Badge } from "@/components/ui/badge"

interface MapMarkerProps {
  community: {
    id: number
    name: string
    location: string
    members: number
    type: string
    coordinates: { x: number; y: number }
  }
  isSelected: boolean
  onClick: () => void
}

export function MapMarker({ community, isSelected, onClick }: MapMarkerProps) {
  const getMarkerColor = (type: string) => {
    switch (type) {
      case "Tech":
        return "bg-blue-500"
      case "Culture":
        return "bg-purple-500"
      case "Professional":
        return "bg-green-500"
      case "Business":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
        isSelected ? "scale-125 z-10" : "hover:scale-110"
      }`}
      style={{
        left: `${community.coordinates.x}%`,
        top: `${community.coordinates.y}%`,
      }}
      onClick={onClick}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
          isSelected ? "bg-primary" : getMarkerColor(community.type)
        }`}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {isSelected && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border border-border rounded-lg p-2 shadow-lg min-w-48 z-20">
          <h4 className="font-semibold text-sm mb-1">{community.name}</h4>
          <p className="text-xs text-muted-foreground mb-1">{community.location}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{community.members.toLocaleString()} members</p>
            <Badge variant="secondary" className="text-xs">
              {community.type}
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
}
