"use client"

import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, Play, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"

interface AgentsPageProps {
  onCreateAgent: () => void
  onNavigate: (view: ViewType) => void
}

export default function AgentsPage({ onCreateAgent, onNavigate }: AgentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Handles general customer inquiries and support requests",
      status: "active",
      calls: 1247,
      successRate: 94.2,
      lastActive: "2 minutes ago",
      tags: ["Support", "General"],
      voice: "Sarah",
    },
    {
      id: 2,
      name: "Sales Assistant",
      description: "Helps with product inquiries and sales processes",
      status: "active",
      calls: 856,
      successRate: 91.8,
      lastActive: "5 minutes ago",
      tags: ["Sales", "Products"],
      voice: "James",
    },
    {
      id: 3,
      name: "Technical Support Bot",
      description: "Provides technical assistance and troubleshooting",
      status: "training",
      calls: 423,
      successRate: 88.5,
      lastActive: "1 hour ago",
      tags: ["Technical", "Support"],
      voice: "Emma",
    },
    {
      id: 4,
      name: "Appointment Scheduler",
      description: "Manages appointment booking and scheduling",
      status: "inactive",
      calls: 234,
      successRate: 96.1,
      lastActive: "2 days ago",
      tags: ["Scheduling", "Appointments"],
      voice: "David",
    },
  ]

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "training":
        return "bg-orange-100 text-orange-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "training":
        return "bg-orange-500"
      case "inactive":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Agents" onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
                <p className="text-gray-600 mt-1">Manage and monitor your AI call center agents</p>
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white" onClick={onCreateAgent}>
                <Plus className="w-4 h-4 mr-1" />
                Create Agent
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusDot(agent.status)}`}></div>
                            <Badge variant="secondary" className={getStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Test Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{agent.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Calls</span>
                        <span className="font-medium">{agent.calls.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Success Rate</span>
                        <span className="font-medium text-green-600">{agent.successRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Voice</span>
                        <span className="font-medium">{agent.voice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Active</span>
                        <span className="font-medium">{agent.lastActive}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Play className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Settings className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
                <p className="text-gray-600">Try adjusting your search terms or create a new agent.</p>
                <Button className="mt-4" onClick={onCreateAgent}>
                  <Plus className="w-4 h-4 mr-1" />
                  Create Your First Agent
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
