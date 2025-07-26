"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AuthCard } from "@/components/auth-card"


export default function LoginPage() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [shake, setShake] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (!validateForm()) {
  //     setShake(true)
  //     setTimeout(() => setShake(false), 500)
  //     return
  //   }

  //   setIsLoading(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     router.push("/otp-verification")
  //   }, 1500)
  // }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) {
    setShake(true)
    setTimeout(() => setShake(false), 500)
    return
  }

  setIsLoading(true)

  try {
    const res = await fetch("/login/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    

    if (!res.ok) {
      throw new Error(data.error || "Login failed")
    }

    // Optionally store token
    // localStorage.setItem("access_token", data.access_token)

    // Redirect to dashboard or another page
    router.push("/dashboard")  // Or wherever you'd like
  } catch (err: any) {
    setErrors({ general: err.message })
  } finally {
    setIsLoading(false)
  }
}


  const handleGoogleLogin = () => {
    // Implement Google OAuth
    console.log("Google login clicked")
  }

  return (
    <TooltipProvider>
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your VoiceAI dashboard"
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      >
        <form onSubmit={handleSubmit} className={`space-y-4 ${shake ? "animate-pulse" : ""}`}>
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
                  <p>Enter your registered email address</p>
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
                  <p>Enter your account password</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          {/* Forgot Password */}
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              className={`p-0 h-auto text-sm ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
              }`}
              onClick={() => router.push("/forgot-password")}
            >
              Forgot your password?
            </Button>
          </div>
              {errors.general && (
  <p className="text-red-500 text-sm text-center animate-in slide-in-from-top-1">{errors.general}</p>
)}
          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 #294777 hover:from-blue-600 #294777 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDark ? "border-white/20" : "border-gray-200"}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDark ? "bg-black text-gray-400" : "bg-white text-gray-500"}`}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className={`w-full transition-all duration-200 transform hover:scale-[1.02] ${
              isDark
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-white/50 border-gray-200 text-gray-900 hover:bg-white/80"
            }`}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Don't have an account? </span>
            <Button
              type="button"
              variant="link"
              className={`p-0 h-auto text-sm font-medium ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
              }`}
              onClick={() => router.push("/signup")}
            >
              Create Account
            </Button>
          </div>
        </form>
      </AuthCard>
    </TooltipProvider>
  )
}
