"use client"

import type { ReactNode } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthCardProps {
  children: ReactNode
  title: string
  subtitle?: string
  isDark?: boolean
  onToggleTheme?: () => void
}

export function AuthCard({ children, title, subtitle, isDark = false, onToggleTheme }: AuthCardProps) {
  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)]"
          }`}
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          className={`rounded-full transition-all duration-300 ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              : "bg-black/10 hover:bg-black/20 text-black backdrop-blur-sm"
          }`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className={`inline-flex items-center space-x-2 ${isDark ? "text-white" : "text-black"}`}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-gray-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-2xl font-bold">VoiceAI</span>
            </div>
          </div>

          {/* Glassmorphic Card */}
          <div
            className={`relative overflow-hidden rounded-2xl p-8 shadow-2xl transition-all duration-300 ${
              isDark
                ? "bg-white/10 border border-white/20 backdrop-blur-xl"
                : "bg-white/80 border border-black/10 backdrop-blur-xl"
            }`}
          >
            {/* Card Header */}
            <div className="mb-6 text-center">
              <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h1>
              {subtitle && <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{subtitle}</p>}
            </div>

            {/* Card Content */}
            {children}

            {/* Trust Badges */}
            <div className="mt-6 flex justify-center space-x-4 text-xs">
              <div className={`flex items-center space-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Secure</span>
              </div>
              <div className={`flex items-center space-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
