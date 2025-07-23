"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Plus, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VoicesPageProps {
  onNavigate: (view: ViewType) => void
}

export default function VoicesPage({ onNavigate }: VoicesPageProps) {
  const voices = [
    { name: "Sarah", gender: "Female", accent: "American", provider: "ElevenLabs", status: "Active" },
    { name: "James", gender: "Male", accent: "British", provider: "OpenAI", status: "Active" },
    { name: "Emma", gender: "Female", accent: "Australian", provider: "Azure", status: "Inactive" },
    { name: "David", gender: "Male", accent: "Canadian", provider: "Google", status: "Active" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Voices" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Voices</h1>
                <p className="text-gray-600 mt-1">Manage voice models for your AI agents</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Voice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voices.map((voice, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Volume2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{voice.name}</CardTitle>
                          <p className="text-sm text-gray-600">
                            {voice.gender} • {voice.accent}
                          </p>
                        </div>
                      </div>
                      <Badge variant={voice.status === "Active" ? "default" : "secondary"}>{voice.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Provider</span>
                        <span className="font-medium">{voice.provider}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Play className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
