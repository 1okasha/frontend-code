"use client"

import { MoreHorizontal, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Agents",
      value: "3",
      description: "2 active, 1 inactive",
      icon: MoreHorizontal,
      iconColor: "text-gray-400",
    },
    {
      title: "Active Agents",
      value: "2",
      description: "Ready to handle calls",
      icon: TrendingUp,
      iconColor: "text-green-500",
      valueColor: "text-green-600",
    },
    {
      title: "In Training",
      value: "1",
      description: "Currently being trained",
      icon: Clock,
      iconColor: "text-orange-500",
      valueColor: "text-orange-600",
    },
    {
      title: "Issues",
      value: "0",
      description: "Require attention",
      icon: () => <div className="w-4 h-4 rounded-full bg-red-500"></div>,
      iconColor: "",
      valueColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <Icon className={`w-4 h-4 ${metric.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${metric.valueColor || "text-gray-900"}`}>{metric.value}</div>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
