"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthCard } from "@/components/auth-card"

export default function OTPVerificationPage() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [email, setEmail] = useState("")

useEffect(() => {
  const savedEmail = localStorage.getItem("signupEmail")
  if (savedEmail) {
    setEmail(savedEmail)
  } else {
    setError("Email not found. Please sign up again.")
  }
}, [])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()

    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    if (pastedData.length === 6) {
      handleVerify(pastedData)
    } else {
      inputRefs.current[pastedData.length]?.focus()
    }
  }

const handleVerify = async (otpCode: string) => {
  setIsLoading(true);
  setError("");

  try {
    const res = await fetch("/otp-verification/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otpCode,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "OTP verification failed");
    }

    setIsVerified(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  } catch (err: any) {
    setError(err.message || "Something went wrong");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  } finally {
    setIsLoading(false);
  }
};


  const handleResend = () => {
    setCanResend(false)
    setResendTimer(60)
    setError("")

    // Restart countdown
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleManualVerify = () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      handleVerify(otpCode)
    } else {
      setError("Please enter all 6 digits")
    }
  }

  if (isVerified) {
    return (
      <AuthCard
        title="Verification Successful!"
        subtitle="Redirecting to your dashboard..."
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      >
        <div className="text-center py-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-gray-700 rounded-full animate-pulse" />
            </div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Taking you to your dashboard...</p>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Verify Your Account"
      subtitle="Enter the 6-digit code sent to your email"
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className={`p-0 h-auto text-sm ${
            isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-lg font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-white/10 border-white/20 text-white focus:border-blue-400"
                    : "bg-white/50 border-gray-200 text-gray-900 focus:border-blue-500"
                } ${error ? "border-red-500 animate-pulse" : ""} ${digit ? "border-green-500" : ""}`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center animate-in slide-in-from-top-1">{error}</p>}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleManualVerify}
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full bg-gradient-to-r from-blue-500 to-gray-800 hover:from-blue-600 hover:to-gray-900 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Verify Code"
          )}
        </Button>

        {/* Resend Section */}
        <div className="text-center space-y-2">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Didn't receive the code?</p>

          {canResend ? (
            <Button
              variant="link"
              onClick={handleResend}
              className={`p-0 h-auto text-sm font-medium ${
                isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
              }`}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Resend Code
            </Button>
          ) : (
            <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Resend in {resendTimer}s</div>
          )}
        </div>

        {/* Help Text */}
        <div className={`text-xs text-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          <p>Check your spam folder if you don't see the email</p>
          <p className="mt-1">Code expires in 10 minutes</p>
        </div>
      </div>
    </AuthCard>
  )
}
