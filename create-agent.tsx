"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronDown,
  Download,
  Eye,
  Grid3X3,
  Link,
  Mic,
  Phone,
  PhoneCall,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Smartphone,
  Users,
  Wrench,
  X,
  Zap,
  Play,
  TestTube,
  MessageSquare,
  Brain,
  Volume2,
  Database,
  Lightbulb,
  Upload,
  MicOff,
  Square,
  Copy,
  History,
  FileText,
  Video,
  Music,
  Sun,
  Moon,
  Check,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface CreateAgentProps {
  onBackToDashboard: () => void
}

export default function CreateAgent({ onBackToDashboard }: CreateAgentProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
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

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState<"idle" | "transcribing" | "completed">("idle")
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [transcriptionLanguage, setTranscriptionLanguage] = useState("en-US")
  const [transcriptionEngine, setTranscriptionEngine] = useState("vapi")
  const [apiKey, setApiKey] = useState("")
  const [transcriptionHistory, setTranscriptionHistory] = useState([
    {
      id: 1,
      name: "Meeting Recording.mp3",
      timestamp: "2024-01-15 14:30",
      duration: "15:42",
      status: "completed",
      transcript: "This is a sample transcript from a previous meeting...",
    },
    {
      id: 2,
      name: "Interview Session.wav",
      timestamp: "2024-01-14 10:15",
      duration: "32:18",
      status: "completed",
      transcript: "Another sample transcript from an interview session...",
    },
  ])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
    toast.success(`File "${file.name}" uploaded successfully`)
  }

  const startTranscription = () => {
    setTranscriptionStatus("transcribing")
    toast.info("Transcription started")
    // Simulate transcription progress
    setTimeout(() => {
      setTranscript("This is a sample transcription that would appear in real-time...")
      setTranscriptionStatus("completed")
      toast.success("Transcription completed")
    }, 3000)
  }

  const stopTranscription = () => {
    setTranscriptionStatus("idle")
    setIsRecording(false)
    toast.info("Transcription stopped")
  }

  const startRecording = () => {
    setIsRecording(true)
    setTranscriptionStatus("transcribing")
    toast.info("Recording started")
  }

  const stopRecording = () => {
    setIsRecording(false)
    setTranscriptionStatus("completed")
    toast.success("Recording stopped and transcribed")
  }

  const copyTranscript = () => {
    navigator.clipboard.writeText(transcript)
    toast.success("Transcript copied to clipboard")
  }

  const downloadTranscript = (format: "txt" | "srt") => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transcript.${format}`
    a.click()
    toast.success(`Transcript downloaded as ${format.toUpperCase()}`)
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-orange-600 font-medium">ai-call-center-dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Grid3X3 className="w-4 h-4 mr-1" />
                Canvas
              </Button>
              <Button variant="ghost" size="sm" className="bg-orange-100 text-orange-600">
                <Eye className="w-4 h-4 mr-1" />
                Focus
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-700">
              Export <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button variant="default" size="sm" className="bg-white shadow-sm">
                Design
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                Code
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium">80%</span>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Zap className="w-4 h-4 mr-1" />
              Select
            </Button>
            <Button variant="outline" className="text-orange-500 border-orange-200 bg-transparent">
              <RefreshCw className="w-4 h-4 mr-1" />
              Run Revisions
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">CallCenter AI</h1>
              </div>
            </div>

            <nav className="space-y-1">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Grid3X3 className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <Users className="w-5 h-5" />
                <span className="font-medium">Agents</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5" />
                <span>Knowledge Base</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Wrench className="w-5 h-5" />
                <span>Tools</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Mic className="w-5 h-5" />
                <span>Voices</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Link className="w-5 h-5" />
                <span>Integrations</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Smartphone className="w-5 h-5" />
                <span>Phone Numbers</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <PhoneCall className="w-5 h-5" />
                <span>Outbound</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            <div>CallCenter AI v2.1.0</div>
            <div>© 2024 AI Solutions</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-600" onClick={onBackToDashboard}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Agents
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-green-500 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-gray-500">Admin</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Agent</h1>
              <p className="text-gray-600">
                Configure your AI agent with custom settings, voice, and behavior patterns
              </p>
            </div>

            {/* Quick Start Tips */}
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
                            <Select
                              value={agentData.role}
                              onValueChange={(value) => setAgentData({ ...agentData, role: value })}
                            >
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
                        <p className="text-gray-600 mb-6">
                          Define how your agent greets users when starting a conversation
                        </p>

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
                                    {agentData.firstMessage ||
                                      "Hello! I'm your AI assistant. How can I help you today?"}
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
                  </TabsContent>

                  <TabsContent value="voice-ai" className="mt-6">
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
                            <Select
                              value={agentData.model}
                              onValueChange={(value) => setAgentData({ ...agentData, model: value })}
                            >
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
                            <Slider
                              value={temperature}
                              onValueChange={setTemperature}
                              max={2}
                              min={0}
                              step={0.1}
                              className="w-full"
                            />
                            <p className="text-xs text-gray-500">
                              Controls randomness in responses (0 = focused, 2 = creative)
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label>Max Tokens: {maxTokens[0]}</Label>
                            <Slider
                              value={maxTokens}
                              onValueChange={setMaxTokens}
                              max={4096}
                              min={256}
                              step={256}
                              className="w-full"
                            />
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
                  </TabsContent>

                  <TabsContent value="transcriber" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Audio Transcription</h3>
                          <p className="text-gray-600 mb-6">
                            Upload audio/video files or record live audio for transcription
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="flex items-center space-x-2"
                        >
                          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {/* File Upload & Controls */}
                        <div className="col-span-2 space-y-6">
                          {/* File Upload */}
                          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                            <CardHeader>
                              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                                <Upload className="w-5 h-5" />
                                <span>File Upload</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                  isDarkMode
                                    ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                }`}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  const file = e.dataTransfer.files[0]
                                  if (file) handleFileUpload(file)
                                }}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                <div className="space-y-4">
                                  <div className="flex justify-center space-x-4">
                                    <FileText className={`w-8 h-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                    <Music className={`w-8 h-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                    <Video className={`w-8 h-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                  </div>
                                  <div>
                                    <p className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                      Drop your audio/video files here
                                    </p>
                                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Supports MP3, WAV, MP4, MOV files up to 100MB
                                    </p>
                                  </div>
                                  <Button variant="outline" className="mt-4 bg-transparent">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Browse Files
                                  </Button>
                                </div>
                              </div>
                              {selectedFile && (
                                <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <FileText className="w-4 h-4 text-blue-600" />
                                      <span
                                        className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {selectedFile.name}
                                      </span>
                                    </div>
                                    <Badge variant="secondary">Ready</Badge>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          {/* Transcription Controls */}
                          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                            <CardHeader>
                              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                                <Mic className="w-5 h-5" />
                                <span>Transcription Controls</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {/* Status Indicator */}
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    {transcriptionStatus === "idle" && (
                                      <>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                          Idle
                                        </span>
                                      </>
                                    )}
                                    {transcriptionStatus === "transcribing" && (
                                      <>
                                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                        <span className="text-sm text-blue-600">Transcribing...</span>
                                      </>
                                    )}
                                    {transcriptionStatus === "completed" && (
                                      <>
                                        <Check className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-green-600">Completed</span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Control Buttons */}
                                <div className="flex items-center space-x-2">
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      onClick={isRecording ? stopRecording : startRecording}
                                      className={`${
                                        isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                                      } text-white`}
                                    >
                                      {isRecording ? (
                                        <MicOff className="w-4 h-4 mr-2" />
                                      ) : (
                                        <Mic className="w-4 h-4 mr-2" />
                                      )}
                                      {isRecording ? "Stop Recording" : "Start Recording"}
                                    </Button>
                                  </motion.div>

                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      onClick={
                                        transcriptionStatus === "transcribing" ? stopTranscription : startTranscription
                                      }
                                      variant="outline"
                                      disabled={!selectedFile && !isRecording}
                                    >
                                      {transcriptionStatus === "transcribing" ? (
                                        <Square className="w-4 h-4 mr-2" />
                                      ) : (
                                        <Play className="w-4 h-4 mr-2" />
                                      )}
                                      {transcriptionStatus === "transcribing" ? "Stop" : "Start"} Transcription
                                    </Button>
                                  </motion.div>
                                </div>

                                {/* Configuration */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Transcription Language</Label>
                                    <Select value={transcriptionLanguage} onValueChange={setTranscriptionLanguage}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="en-US">English (US)</SelectItem>
                                        <SelectItem value="en-GB">English (UK)</SelectItem>
                                        <SelectItem value="es-ES">Spanish</SelectItem>
                                        <SelectItem value="fr-FR">French</SelectItem>
                                        <SelectItem value="de-DE">German</SelectItem>
                                        <SelectItem value="it-IT">Italian</SelectItem>
                                        <SelectItem value="pt-BR">Portuguese</SelectItem>
                                        <SelectItem value="ja-JP">Japanese</SelectItem>
                                        <SelectItem value="ko-KR">Korean</SelectItem>
                                        <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Transcription Engine</Label>
                                    <Select value={transcriptionEngine} onValueChange={setTranscriptionEngine}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="vapi">Vapi AI</SelectItem>
                                        <SelectItem value="bolna">Bolna AI</SelectItem>
                                        <SelectItem value="openai">OpenAI Whisper</SelectItem>
                                        <SelectItem value="google">Google Speech-to-Text</SelectItem>
                                        <SelectItem value="azure">Azure Speech</SelectItem>
                                        <SelectItem value="custom">Custom Model</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* API Key Input */}
                                <div className="space-y-2">
                                  <Label>API Key (Optional)</Label>
                                  <Input
                                    type="password"
                                    placeholder="Enter your API key for custom models"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Live Transcript */}
                          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                                  <FileText className="w-5 h-5" />
                                  <span>Live Transcript</span>
                                </CardTitle>
                                <div className="flex items-center space-x-2">
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" size="sm" onClick={copyTranscript} disabled={!transcript}>
                                      <Copy className="w-4 h-4 mr-1" />
                                      Copy
                                    </Button>
                                  </motion.div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => downloadTranscript("txt")}
                                      disabled={!transcript}
                                    >
                                      <Download className="w-4 h-4 mr-1" />
                                      TXT
                                    </Button>
                                  </motion.div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => downloadTranscript("srt")}
                                      disabled={!transcript}
                                    >
                                      <Download className="w-4 h-4 mr-1" />
                                      SRT
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div
                                className={`min-h-[300px] max-h-[400px] overflow-y-auto p-4 rounded-lg border ${
                                  isDarkMode
                                    ? "bg-gray-900 border-gray-600 text-gray-100"
                                    : "bg-gray-50 border-gray-200 text-gray-900"
                                }`}
                              >
                                {transcript ? (
                                  <div className="space-y-2">
                                    <p className="text-sm leading-relaxed">{transcript}</p>
                                    {transcriptionStatus === "transcribing" && (
                                      <div className="flex items-center space-x-2 text-blue-600">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm">Transcribing...</span>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                      <FileText
                                        className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
                                      />
                                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Transcript will appear here once transcription starts
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* History Panel */}
                        <div className="space-y-6">
                          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                            <CardHeader>
                              <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                                <History className="w-5 h-5" />
                                <span>Transcription History</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {transcriptionHistory.map((item) => (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-3 rounded-lg border ${
                                      isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                                    }`}
                                  >
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h4
                                          className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                                        >
                                          {item.name}
                                        </h4>
                                        <Badge variant="secondary" className="text-xs">
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        <p>{item.timestamp}</p>
                                        <p>Duration: {item.duration}</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                          <Download className="w-3 h-3 mr-1" />
                                          Download
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                          <FileText className="w-3 h-3 mr-1" />
                                          View
                                        </Button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="settings" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
                        <p className="text-gray-600 mb-6">
                          Configure integrations, tools, and advanced behavior settings
                        </p>
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
                              <p className="text-sm text-gray-600">
                                Connect to your knowledge base for contextual responses
                              </p>
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

            {/* Help Section */}
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
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  )
}
