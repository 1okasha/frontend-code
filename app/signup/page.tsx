"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, HelpCircle, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AuthCard } from "@/components/auth-card"

export default function SignupPage() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [shake, setShake] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.role) {
      newErrors.role = "Please select a role"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
  const res = await fetch('/signup/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formData.fullName,
      email: formData.email,
      password: formData.password,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.error || 'Signup failed')
  }
  
  localStorage.setItem("signupEmail", formData.email);

  // ✅ If successful
  router.push("/otp-verification")
} catch (error: any) {
  console.error("Signup error:", error.message)
  alert(error.message || "Something went wrong during signup")
} finally {
  setIsLoading(false)
}

  }

  return (
    <TooltipProvider>
      <AuthCard
        title="Create Account"
        subtitle="Join VoiceAI and start managing your call center"
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      >
        <form onSubmit={handleSubmit} className={`space-y-4 ${shake ? "animate-pulse" : ""}`}>
          {/* Full Name Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="fullName" className={isDark ? "text-white" : "text-gray-700"}>
                Full Name
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your first and last name</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <User className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`pl-10 transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                } ${errors.fullName ? "border-red-500" : ""}`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm animate-in slide-in-from-left-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="email" className={isDark ? "text-white" : "text-gray-700"}>
                Email
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter a valid email address for your account</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Mail className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`pl-10 transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                } ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm animate-in slide-in-from-left-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="password" className={isDark ? "text-white" : "text-gray-700"}>
                Password
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Must be 8+ characters with uppercase, lowercase, and number</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`pl-10 pr-10 transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                } ${errors.password ? "border-red-500" : ""}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                ) : (
                  <Eye className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm animate-in slide-in-from-left-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="confirmPassword" className={isDark ? "text-white" : "text-gray-700"}>
                Confirm Password
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Re-enter your password to confirm</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`pl-10 pr-10 transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                } ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                ) : (
                  <Eye className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm animate-in slide-in-from-left-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="role" className={isDark ? "text-white" : "text-gray-700"}>
                Role
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select your role in the organization</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <UserCheck
                className={`absolute left-3 top-3 h-4 w-4 z-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger
                  className={`pl-10 transition-all duration-200 ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white focus:border-blue-400"
                      : "bg-white/50 border-gray-200 text-gray-900 focus:border-blue-500"
                  } ${errors.role ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.role && <p className="text-red-500 text-sm animate-in slide-in-from-left-1">{errors.role}</p>}
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-gray-800 hover:from-blue-600 hover:to-gray-900 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] mt-6"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          {/* Back to Login Link */}
          <div className="text-center mt-6">
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Already have an account? </span>
            <Button
              type="button"
              variant="link"
              className={`p-0 h-auto text-sm font-medium ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
              }`}
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </AuthCard>
    </TooltipProvider>
  )
}
