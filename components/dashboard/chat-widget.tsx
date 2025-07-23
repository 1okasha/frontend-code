"use client"

import { Button } from "@/components/ui/button"

export function ChatWidget() {
  return (
    <div className="fixed bottom-6 right-6">
      <Button className="w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
        </div>
      </Button>
    </div>
  )
}
