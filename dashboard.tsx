"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  Download,
  Eye,
  Grid3X3,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  Wrench,
  Mic,
  Link,
  PhoneCall,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DashboardProps {
  onCreateAgent: () => void
}

export default function Dashboard({ onCreateAgent }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("Design")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-orange-600 font-medium">ai-call-center-dashboard</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="text-blue-600 font-medium">dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Grid3X3 className="w-4 h-4 mr-1" />
                Canvas
              </Button>
              <Button variant="ghost" size="sm" className="bg-orange-100 text-orange-600">
                <Eye className="w-4 h-4 mr-1" />
                Focus
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  Export <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === "Design" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("Design")}
                className={activeTab === "Design" ? "bg-white shadow-sm" : ""}
              >
                Design
              </Button>
              <Button
                variant={activeTab === "Code" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("Code")}
                className={activeTab === "Code" ? "bg-white shadow-sm" : "text-gray-500"}
              >
                Code
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium">80%</span>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Zap className="w-4 h-4 mr-1" />
              Select
            </Button>
            <Button variant="outline" className="text-orange-500 border-orange-200 bg-transparent">
              <RefreshCw className="w-4 h-4 mr-1" />
              Run Revisions
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">CallCenter AI</h1>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 ml-auto" />
            </div>

            <nav className="space-y-1">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <Grid3X3 className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5" />
                <span>Agents</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5" />
                <span>Knowledge Base</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Wrench className="w-5 h-5" />
                <span>Tools</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Mic className="w-5 h-5" />
                <span>Voices</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Link className="w-5 h-5" />
                <span>Integrations</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Smartphone className="w-5 h-5" />
                <span>Phone Numbers</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <PhoneCall className="w-5 h-5" />
                <span>Outbound</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            <div>CallCenter AI v2.1.0</div>
            <div>© 2024 AI Solutions</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">Manage your AI call center agents and monitor performance</p>
                </div>
                <div className="flex items-center space-x-2 ml-8">
                  <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                  <span className="text-sm font-medium text-gray-700">Production</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-black text-white px-3 py-1 text-xs">
                        production <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>production</DropdownMenuItem>
                      <DropdownMenuItem>staging</DropdownMenuItem>
                      <DropdownMenuItem>development</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-green-500 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-gray-500">Admin</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white" onClick={onCreateAgent}>
                  <Plus className="w-4 h-4 mr-1" />
                  Create Agent
                </Button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">3</div>
                  <p className="text-xs text-gray-500 mt-1">2 active, 1 inactive</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Agents</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">2</div>
                  <p className="text-xs text-gray-500 mt-1">Ready to handle calls</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">In Training</CardTitle>
                  <Clock className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">1</div>
                  <p className="text-xs text-gray-500 mt-1">Currently being trained</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Issues</CardTitle>
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">0</div>
                  <p className="text-xs text-gray-500 mt-1">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  <p className="text-sm text-gray-500">Latest updates from your AI agents</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Customer Support Agent activated</div>
                        <div className="text-sm text-gray-500">2 minutes ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Sales Assistant completed training</div>
                        <div className="text-sm text-gray-500">15 minutes ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Training Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">Technical Support Bot updated</div>
                        <div className="text-sm text-gray-500">1 hour ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      Updated
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">New integration added</div>
                        <div className="text-sm text-gray-500">3 hours ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Integration
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
                  <p className="text-sm text-gray-500">Performance overview</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PhoneCall className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Total Calls Today</span>
                    </div>
                    <span className="font-semibold text-gray-900">1,247</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Success Rate</span>
                    </div>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Avg. Call Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">3m 42s</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Active Users</span>
                    </div>
                    <span className="font-semibold text-gray-900">156</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <Button className="w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          </div>
        </Button>
      </div>
    </div>
  )
}
