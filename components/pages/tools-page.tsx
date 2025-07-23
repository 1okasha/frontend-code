"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Settings, Zap, Database, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolsPageProps {
  onNavigate: (view: ViewType) => void
}

export default function ToolsPage({ onNavigate }: ToolsPageProps) {
  const tools = [
    {
      name: "CRM Integration",
      description: "Connect with your CRM system",
      icon: Database,
      status: "Connected",
      color: "text-green-600",
    },
    {
      name: "API Webhooks",
      description: "Configure webhook endpoints",
      icon: Link,
      status: "Active",
      color: "text-blue-600",
    },
    {
      name: "Custom Functions",
      description: "Create custom agent functions",
      icon: Zap,
      status: "Available",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Tools" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
                <p className="text-gray-600 mt-1">Manage integrations and custom tools for your agents</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Add Tool
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${tool.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${tool.color}`}>{tool.status}</span>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
