"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PhoneNumbersPageProps {
  onNavigate: (view: ViewType) => void
}

export default function PhoneNumbersPage({ onNavigate }: PhoneNumbersPageProps) {
  const phoneNumbers = [
    { number: "+1 (555) 123-4567", location: "New York, NY", status: "Active", agent: "Customer Support Agent" },
    { number: "+1 (555) 234-5678", location: "Los Angeles, CA", status: "Active", agent: "Sales Assistant" },
    { number: "+1 (555) 345-6789", location: "Chicago, IL", status: "Inactive", agent: "Not Assigned" },
    { number: "+1 (555) 456-7890", location: "Houston, TX", status: "Active", agent: "Technical Support Bot" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Phone Numbers" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Phone Numbers</h1>
                <p className="text-gray-600 mt-1">Manage phone numbers for your AI agents</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Number
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phoneNumbers.map((phone, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{phone.number}</CardTitle>
                          <p className="text-sm text-gray-600">{phone.location}</p>
                        </div>
                      </div>
                      <Badge variant={phone.status === "Active" ? "default" : "secondary"}>{phone.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Assigned Agent</span>
                        <span className="font-medium">{phone.agent}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
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
