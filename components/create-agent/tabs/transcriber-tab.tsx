"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  Upload,
  Mic,
  FileText,
  Music,
  Video,
  Sun,
  Moon,
  Check,
  Loader2,
  MicOff,
  Square,
  Play,
  Copy,
  Download,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function TranscriberTab() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState<"idle" | "transcribing" | "completed">("idle")
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [transcriptionLanguage, setTranscriptionLanguage] = useState("en-US")
  const [transcriptionEngine, setTranscriptionEngine] = useState("vapi")
  const [apiKey, setApiKey] = useState("")
  const [transcriptionHistory] = useState([
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

  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
    toast.success(`File "${file.name}" uploaded successfully`)
  }

  const startTranscription = () => {
    setTranscriptionStatus("transcribing")
    toast.info("Transcription started")
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-4">Audio Transcription</h3>
          <p className="text-gray-600 mb-6">Upload audio/video files or record live audio for transcription</p>
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
                      <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
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
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Idle</span>
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
                      {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={transcriptionStatus === "transcribing" ? stopTranscription : startTranscription}
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
                  isDarkMode ? "bg-gray-900 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-200 text-gray-900"
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
                        <h4 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
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
  )
}
