"use client"

import { useState } from "react"
import { Plus, Search, Upload, FileText, Folder, MoreHorizontal, Download, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"

interface KnowledgeBasePageProps {
  onNavigate: (view: ViewType) => void
}

export default function KnowledgeBasePage({ onNavigate }: KnowledgeBasePageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const knowledgeItems = [
    {
      id: 1,
      name: "Product Documentation",
      type: "folder",
      items: 24,
      lastModified: "2 days ago",
      size: "15.2 MB",
      tags: ["Products", "Documentation"],
    },
    {
      id: 2,
      name: "FAQ Database",
      type: "document",
      items: 156,
      lastModified: "1 hour ago",
      size: "2.8 MB",
      tags: ["FAQ", "Support"],
    },
    {
      id: 3,
      name: "Company Policies",
      type: "folder",
      items: 12,
      lastModified: "1 week ago",
      size: "8.4 MB",
      tags: ["Policies", "HR"],
    },
    {
      id: 4,
      name: "Technical Troubleshooting Guide",
      type: "document",
      items: 89,
      lastModified: "3 days ago",
      size: "5.1 MB",
      tags: ["Technical", "Troubleshooting"],
    },
    {
      id: 5,
      name: "Sales Scripts",
      type: "folder",
      items: 18,
      lastModified: "5 days ago",
      size: "3.7 MB",
      tags: ["Sales", "Scripts"],
    },
    {
      id: 6,
      name: "Customer Onboarding",
      type: "document",
      items: 45,
      lastModified: "1 day ago",
      size: "4.2 MB",
      tags: ["Onboarding", "Customers"],
    },
  ]

  const filteredItems = knowledgeItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Knowledge Base" onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
                <p className="text-gray-600 mt-1">Manage documents and information for your AI agents</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload Files
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Folder
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Documents</p>
                      <p className="text-3xl font-bold text-gray-900">342</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Folders</p>
                      <p className="text-3xl font-bold text-gray-900">28</p>
                    </div>
                    <Folder className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Storage Used</p>
                      <p className="text-3xl font-bold text-gray-900">39.4 MB</p>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-600 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Updated</p>
                      <p className="text-3xl font-bold text-gray-900">1h</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Knowledge Base Items */}
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {item.type === "folder" ? (
                            <Folder className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {item.items} {item.type === "folder" ? "items" : "entries"}
                            </span>
                            <span>{item.size}</span>
                            <span>Modified {item.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
