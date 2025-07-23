"use client"

import { Bell, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  onCreateAgent: () => void
}

export function DashboardHeader({ onCreateAgent }: DashboardHeaderProps) {
  return (
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
  )
}
