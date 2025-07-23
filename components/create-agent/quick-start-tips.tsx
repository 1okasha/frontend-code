"use client"

import { MessageSquare, Brain, Volume2, TestTube, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickStartTips() {
  const quickStartSteps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Choose a descriptive name and relevant tags for easy identification",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      number: 2,
      title: "System Prompt",
      description: "Define your agent's personality, role, and behavioral guidelines",
      icon: <Brain className="w-4 h-4" />,
    },
    {
      number: 3,
      title: "Voice Settings",
      description: "Select appropriate voice provider and model for your use case",
      icon: <Volume2 className="w-4 h-4" />,
    },
    {
      number: 4,
      title: "Test & Deploy",
      description: "Test your agent thoroughly before deploying to production",
      icon: <TestTube className="w-4 h-4" />,
    },
  ]

  return (
    <Card className="mb-8 bg-blue-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-blue-900">Quick Start Tips</CardTitle>
        </div>
        <p className="text-blue-700 text-sm">Follow these steps to create an effective AI agent</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {quickStartSteps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">
                {step.number}
              </div>
              <h4 className="font-medium text-blue-900 mb-1">{step.title}</h4>
              <p className="text-xs text-blue-700">{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
