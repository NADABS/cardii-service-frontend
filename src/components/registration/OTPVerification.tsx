"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {RegistrationComponent} from "@/src/types/RegistrationComponentType";

interface OTPVerificationProps {
    phoneNumber: string
    onVerify?: (otp: string) => void
    onBack?: () => void
    setActiveComponent: (activeComponent: RegistrationComponent) => void
}

export function OTPVerification({ phoneNumber, onVerify, onBack, setActiveComponent }: OTPVerificationProps) {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const [countdown, setCountdown] = useState(34)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        if (value.length > 1) {
            value = value.slice(-1)
        }

        // Only allow numbers
        if (value && !/^\d$/.test(value)) {
            return
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)

        if (!/^\d+$/.test(pastedData)) {
            return
        }

        const newOtp = [...otp]
        pastedData.split("").forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char
            }
        })
        setOtp(newOtp)

        // Focus the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleResend = () => {
        if (countdown === 0) {
            setCountdown(34)
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
            // Handle resend logic here
            console.log("Resending OTP...")
        }
    }

    const handleVerify = () => {
        const otpValue = otp.join("")
        if (otpValue.length === 6) {
            onVerify?.(otpValue)
            console.log("Verifying OTP:", otpValue)
            setActiveComponent('success')
        }
    }

    // Mask phone number
    const maskedPhone = phoneNumber.replace(/\d(?=\d{3})/g, "*")

    return (
        <div className="w-full max-w-xl bg-white rounded-lg p-8 md:p-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Enter OTP</h1>
                <p className="text-sm text-foreground/80 leading-relaxed">
                    A one time OTP has been sent to your phone number ending {maskedPhone}
                    <br />
                    Enter the OTP to join the Cardii waitlist
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex justify-center gap-2 md:gap-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-semibold border-2 border-border rounded-lg focus:border-foreground focus:outline-none transition-colors"
                        />
                    ))}
                </div>

                <div className="text-center text-sm text-foreground/80">
                    Didn&apos;t receive OTP?,{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={countdown > 0}
                        className={`font-medium underline ${
                            countdown > 0 ? "text-foreground/40 cursor-not-allowed" : "text-foreground hover:text-foreground/80"
                        }`}
                    >
                        Resend
                    </button>{" "}
                    {countdown > 0 && `in ${countdown} secs`}
                </div>

                <div className="pt-6">
                    <Button
                        onClick={handleVerify}
                        disabled={otp.join("").length !== 6}
                        className="w-full h-12 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white disabled:opacity-50"
                    >
                        Verify OTP
                    </Button>
                </div>
            </div>
        </div>
    )
}
