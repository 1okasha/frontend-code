"use client"

import { Database, Link, Wrench } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
        <p className="text-gray-600 mb-6">Configure integrations, tools, and advanced behavior settings</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-medium">Integrations</h4>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span className="font-medium">Knowledge Base</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600">Connect to your knowledge base for contextual responses</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Link className="w-4 h-4" />
                  <span className="font-medium">CRM Integration</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600">Access customer data and update records</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4" />
                  <span className="font-medium">External Tools</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600">Enable function calling and tool usage</p>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-medium">Behavior Settings</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-escalation</Label>
                <p className="text-sm text-gray-500">Escalate complex queries to human agents</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Conversation Logging</Label>
                <p className="text-sm text-gray-500">Log all conversations for analysis</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Sentiment Analysis</Label>
                <p className="text-sm text-gray-500">Monitor conversation sentiment in real-time</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Response Timeout (seconds)</Label>
              <Input type="number" defaultValue="30" />
            </div>

            <div className="space-y-2">
              <Label>Max Conversation Length</Label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
