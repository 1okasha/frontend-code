"use client"

import { useState } from "react"
import { Plus, X, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface BasicInfoTabProps {
  agentData: any
  setAgentData: (data: any) => void
}

export function BasicInfoTab({ agentData, setAgentData }: BasicInfoTabProps) {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <p className="text-gray-600 mb-6">Configure the basic details of your AI agent</p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              placeholder="Enter agent name"
              value={agentData.name}
              onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-role">Agent Role</Label>
            <Select value={agentData.role} onValueChange={(value) => setAgentData({ ...agentData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer-support">Customer Support</SelectItem>
                <SelectItem value="sales">Sales Assistant</SelectItem>
                <SelectItem value="technical-support">Technical Support</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="appointment-booking">Appointment Booking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what this agent does and its purpose"
            value={agentData.description}
            onChange={(e) => setAgentData({ ...agentData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2 mb-6">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
            />
            <Button onClick={addTag} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Primary Language</Label>
            <Select
              value={agentData.primaryLanguage}
              onValueChange={(value) => setAgentData({ ...agentData, primaryLanguage: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Additional Languages</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select additional languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* First Message Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">First Message</h3>
        <p className="text-gray-600 mb-6">Define how your agent greets users when starting a conversation</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first-message">Opening Message</Label>
            <Textarea
              id="first-message"
              placeholder="Hello! I'm your AI assistant. How can I help you today?"
              value={agentData.firstMessage}
              onChange={(e) => setAgentData({ ...agentData, firstMessage: e.target.value })}
              rows={4}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="bg-white p-3 rounded border">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    {agentData.firstMessage || "Hello! I'm your AI assistant. How can I help you today?"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* System Prompt Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">System Prompt</h3>
        <p className="text-gray-600 mb-6">Define your agent's personality, behavior, and guidelines</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">System Instructions</Label>
            <Textarea
              id="system-prompt"
              placeholder="You are a helpful customer service agent. Be polite, professional, and concise in your responses..."
              value={agentData.systemPrompt}
              onChange={(e) => setAgentData({ ...agentData, systemPrompt: e.target.value })}
              rows={8}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be specific about the agent's role</li>
                <li>• Include tone and personality guidelines</li>
                <li>• Set clear boundaries and limitations</li>
                <li>• Provide examples of desired responses</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-2">Template Examples</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  Customer Support Template
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  Sales Assistant Template
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  Technical Support Template
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
