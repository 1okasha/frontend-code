"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import { DashboardHeader } from "./dashboard-header"
import { MetricsCards } from "./metrics-cards"
import { RecentActivity } from "./recent-activity"
import { QuickStats } from "./quick-stats"
import { ChatWidget } from "./chat-widget"
import type { ViewType } from "../../app/page"

interface DashboardProps {
  onCreateAgent: () => void
  onNavigate: (view: ViewType) => void
}

export default function Dashboard({ onCreateAgent, onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Dashboard" onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader onCreateAgent={onCreateAgent} />
            <MetricsCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              <RecentActivity />
              <QuickStats />
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
