"use client"

import { useState } from "react"
import { Download, RefreshCw, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecondaryToolbar() {
  const [activeTab, setActiveTab] = useState("Design")

  return (
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
  )
}
