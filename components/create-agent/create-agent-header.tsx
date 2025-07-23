"use client"

import { ArrowLeft, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreateAgentHeaderProps {
  onBackToDashboard: () => void
}

export function CreateAgentHeader({ onBackToDashboard }: CreateAgentHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-gray-600" onClick={onBackToDashboard}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Agents
        </Button>
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
      </div>
    </div>
  )
}
