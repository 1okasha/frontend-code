"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Settings, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface IntegrationsPageProps {
  onNavigate: (view: ViewType) => void
}

export default function IntegrationsPage({ onNavigate }: IntegrationsPageProps) {
  const integrations = [
    { name: "Salesforce CRM", description: "Customer relationship management", status: "Connected", icon: "🏢" },
    { name: "Slack", description: "Team communication", status: "Connected", icon: "💬" },
    { name: "Zendesk", description: "Customer support platform", status: "Disconnected", icon: "🎫" },
    { name: "HubSpot", description: "Marketing and sales platform", status: "Available", icon: "🚀" },
    { name: "Twilio", description: "Communication APIs", status: "Connected", icon: "📞" },
    { name: "Google Calendar", description: "Appointment scheduling", status: "Available", icon: "📅" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <Check className="w-4 h-4 text-green-600" />
      case "Disconnected":
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <Settings className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-700"
      case "Disconnected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Integrations" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
                <p className="text-gray-600 mt-1">Connect your AI agents with external services</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Browse Integrations
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                          {integration.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      {getStatusIcon(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {integration.status === "Connected" ? "Configure" : "Connect"}
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
