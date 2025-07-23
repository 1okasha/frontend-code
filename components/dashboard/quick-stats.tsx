"use client"

import { PhoneCall, TrendingUp, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStats() {
  const stats = [
    {
      label: "Total Calls Today",
      value: "1,247",
      icon: PhoneCall,
      iconColor: "text-gray-500",
      valueColor: "text-gray-900",
    },
    {
      label: "Success Rate",
      value: "94.2%",
      icon: TrendingUp,
      iconColor: "text-green-500",
      valueColor: "text-green-600",
    },
    {
      label: "Avg. Call Duration",
      value: "3m 42s",
      icon: Clock,
      iconColor: "text-gray-500",
      valueColor: "text-gray-900",
    },
    {
      label: "Active Users",
      value: "156",
      icon: Users,
      iconColor: "text-gray-500",
      valueColor: "text-gray-900",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
        <p className="text-sm text-gray-500">Performance overview</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className={`font-semibold ${stat.valueColor}`}>{stat.value}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
