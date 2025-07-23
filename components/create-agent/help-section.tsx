"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HelpSection() {
  return (
    <Card className="mt-8 bg-gray-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium">Need Help?</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Check out our documentation or contact support for assistance with agent configuration.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            View Documentation
          </Button>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
