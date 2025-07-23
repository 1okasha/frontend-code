"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      title: "Customer Support Agent activated",
      time: "2 minutes ago",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      dotColor: "bg-green-500",
    },
    {
      title: "Sales Assistant completed training",
      time: "15 minutes ago",
      status: "Training Complete",
      statusColor: "bg-blue-100 text-blue-700",
      dotColor: "bg-blue-500",
    },
    {
      title: "Technical Support Bot updated",
      time: "1 hour ago",
      status: "Updated",
      statusColor: "bg-orange-100 text-orange-700",
      dotColor: "bg-orange-500",
    },
    {
      title: "New integration added",
      time: "3 hours ago",
      status: "Integration",
      statusColor: "bg-purple-100 text-purple-700",
      dotColor: "bg-purple-500",
    },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <p className="text-sm text-gray-500">Latest updates from your AI agents</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${activity.dotColor} rounded-full`}></div>
              <div>
                <div className="font-medium text-gray-900">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
            <Badge variant="secondary" className={activity.statusColor}>
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
