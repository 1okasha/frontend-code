"use client"

import { ChevronDown, ChevronLeft, Eye, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TopNavigation() {
  return (
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
  )
}
