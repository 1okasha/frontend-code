"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, Plus, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface OutboundPageProps {
  onNavigate: (view: ViewType) => void
}

export default function OutboundPage({ onNavigate }: OutboundPageProps) {
  const campaigns = [
    { name: "Customer Follow-up", status: "Active", calls: 245, success: 78, agent: "Sales Assistant" },
    { name: "Product Survey", status: "Paused", calls: 156, success: 92, agent: "Customer Support Agent" },
    { name: "Appointment Reminders", status: "Active", calls: 89, success: 95, agent: "Appointment Scheduler" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Outbound" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Outbound Campaigns</h1>
                <p className="text-gray-600 mt-1">Manage automated outbound calling campaigns</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Create Campaign
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <PhoneCall className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{campaign.name}</CardTitle>
                          <p className="text-sm text-gray-600">{campaign.agent}</p>
                        </div>
                      </div>
                      <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>{campaign.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Calls</span>
                        <span className="font-medium">{campaign.calls}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Success Rate</span>
                        <span className="font-medium text-green-600">{campaign.success}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          {campaign.status === "Active" ? (
                            <>
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Edit
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
