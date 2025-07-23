"use client"

import { useState } from "react"
import { Toaster } from "sonner"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import { CreateAgentHeader } from "./create-agent-header"
import { QuickStartTips } from "./quick-start-tips"
import { BasicInfoTab } from "./tabs/basic-info-tab"
import { VoiceAITab } from "./tabs/voice-ai-tab"
import { TranscriberTab } from "./tabs/transcriber-tab"
import { SettingsTab } from "./tabs/settings-tab"
import { HelpSection } from "./help-section" // Import HelpSection
import type { ViewType } from "@/types/view-type" // Import ViewType

interface CreateAgentProps {
  onBackToDashboard: () => void
  onNavigate: (view: ViewType) => void // Use ViewType
}

export default function CreateAgent({ onBackToDashboard, onNavigate }: CreateAgentProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [agentData, setAgentData] = useState({
    name: "",
    description: "",
    role: "",
    primaryLanguage: "English",
    additionalLanguages: [],
    model: "gpt-4",
    systemPrompt: "",
    firstMessage: "",
    voiceProvider: "elevenlabs",
    voiceId: "",
  })

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Agents" onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <CreateAgentHeader onBackToDashboard={onBackToDashboard} />

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Agent</h1>
              <p className="text-gray-600">
                Configure your AI agent with custom settings, voice, and behavior patterns
              </p>
            </div>

            <QuickStartTips />

            {/* Agent Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <p className="text-gray-600">Complete all sections to create a fully functional AI agent</p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                    <TabsTrigger value="voice-ai">Voice & AI</TabsTrigger>
                    <TabsTrigger value="transcriber">Transcriber</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic-info" className="mt-6">
                    <BasicInfoTab agentData={agentData} setAgentData={setAgentData} />
                  </TabsContent>

                  <TabsContent value="voice-ai" className="mt-6">
                    <VoiceAITab agentData={agentData} setAgentData={setAgentData} />
                  </TabsContent>

                  <TabsContent value="transcriber" className="mt-6">
                    <TranscriberTab />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-6">
                    <SettingsTab />
                  </TabsContent>
                </Tabs>

                <Separator className="my-8" />

                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={onBackToDashboard}>
                    Cancel
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                      <Play className="w-4 h-4" />
                      <span>Test Agent</span>
                    </Button>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">Create Agent</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <HelpSection />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
