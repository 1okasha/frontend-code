"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface VoiceAITabProps {
  agentData: any
  setAgentData: (data: any) => void
}

export function VoiceAITab({ agentData, setAgentData }: VoiceAITabProps) {
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Voice & AI Configuration</h3>
        <p className="text-gray-600 mb-6">Configure the AI model and voice settings for your agent</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-medium">AI Model Settings</h4>

          <div className="space-y-2">
            <Label>Language Model</Label>
            <Select value={agentData.model} onValueChange={(value) => setAgentData({ ...agentData, model: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Temperature: {temperature[0]}</Label>
            <Slider value={temperature} onValueChange={setTemperature} max={2} min={0} step={0.1} className="w-full" />
            <p className="text-xs text-gray-500">Controls randomness in responses (0 = focused, 2 = creative)</p>
          </div>

          <div className="space-y-2">
            <Label>Max Tokens: {maxTokens[0]}</Label>
            <Slider value={maxTokens} onValueChange={setMaxTokens} max={4096} min={256} step={256} className="w-full" />
            <p className="text-xs text-gray-500">Maximum length of agent responses</p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-medium">Voice Settings</h4>

          <div className="space-y-2">
            <Label>Voice Provider</Label>
            <Select
              value={agentData.voiceProvider}
              onValueChange={(value) => setAgentData({ ...agentData, voiceProvider: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                <SelectItem value="openai">OpenAI TTS</SelectItem>
                <SelectItem value="azure">Azure Speech</SelectItem>
                <SelectItem value="google">Google Cloud TTS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Voice</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah (Female, Professional)</SelectItem>
                <SelectItem value="james">James (Male, Friendly)</SelectItem>
                <SelectItem value="emma">Emma (Female, Warm)</SelectItem>
                <SelectItem value="david">David (Male, Authoritative)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Enable Voice Interruption</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Background Noise Suppression</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
