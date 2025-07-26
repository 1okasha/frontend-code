"use client"

import {
  ChevronLeft,
  Grid3X3,
  Users,
  BookOpen,
  Wrench,
  Mic,
  Link,
  Smartphone,
  PhoneCall,
  Settings,
  Phone,
} from "lucide-react"
import type { ViewType } from "../../app/page"

interface SidebarProps {
  activeItem?: string
  onNavigate: (view: ViewType) => void
}

export function Sidebar({ activeItem = "Dashboard", onNavigate }: SidebarProps) {
  const navigationItems = [
    { name: "Dashboard", icon: Grid3X3, view: "dashboard" as ViewType },
    { name: "Agents", icon: Users, view: "agents" as ViewType },
    { name: "Knowledge Base", icon: BookOpen, view: "knowledge-base" as ViewType },
    { name: "Tools", icon: Wrench, view: "tools" as ViewType },
    { name: "Voices", icon: Mic, view: "voices" as ViewType },
    { name: "Integrations", icon: Link, view: "integrations" as ViewType },
    { name: "Phone Numbers", icon: Smartphone, view: "phone-numbers" as ViewType },
    { name: "Outbound", icon: PhoneCall, view: "outbound" as ViewType },
    { name: "Settings", icon: Settings, view: "settings" as ViewType },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">CallCenter AI</h1>
          </div>
          <ChevronLeft className="w-4 h-4 text-gray-400 ml-auto" />
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = item.name === activeItem

            return (
              <button
                key={item.name}
                onClick={() => onNavigate(item.view)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={isActive ? "font-medium" : ""}>{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        <div>CallCenter AI v2.1.0</div>
        <div>© 2024 AI Solutions</div>
      </div> */}
    </div>
  )
}
