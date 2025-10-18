"use client"

import type React from "react"
import {useState, useRef, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {toJsonString} from "@/src/lib/storage";
import {useMutation} from "@tanstack/react-query";
import {handleError} from "@/src/lib/errorHandler";
import {httpPOST} from "@/src/lib/http-client";

interface OTPVerificationProps {
    phoneNumber: string
    onVerifySuccess: () => void
    onBack?: () => void

}

export function OTPVerification({phoneNumber, onVerifySuccess, onBack,}: OTPVerificationProps) {
    const [otpInput, setOtpInput] = useState<string[]>(["", "", "", "", "", ""])
    const [countdown, setCountdown] = useState(60)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])


    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1)
        }

        if (value && !/^\d$/.test(value)) {
            return
        }

        const newOtp = [...otpInput]
        newOtp[index] = value
        setOtpInput(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otpInput[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)

        if (!/^\d+$/.test(pastedData)) {
            return
        }

        const newOtp = [...otpInput]
        pastedData.split("").forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char
            }
        })
        setOtpInput(newOtp)

        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleVerify = () => {
        const otpValue = otpInput.join("")
        if (otpValue.length === 6) {
            mutation.mutate({
                phoneNumber: phoneNumber,
                otp: otpValue
            })
        }
    }

    const maskedPhone = phoneNumber.replace(/\d(?=\d{3})/g, "*")

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const mutation = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(
                `${apiBaseUrl}/v1/otp/verify`,
                postRequest,
                {
                    "Content-Type": "application/json",
                }
            );

            const {data, status} = response;

            if (!data.success) throw new Error(data.message || 'Request failed');

            return data;
        },
        onSuccess: () => {
            onVerifySuccess()
        },
        onError: (error) => {
            handleError(error)
        }
    });

    const reSendOTP = useMutation({
        mutationFn: async (postRequest: any) => {
            const response = await httpPOST(
                `${apiBaseUrl}/v1/otp/send`,
                postRequest,
                {"Content-Type": "application/json"}
            );

            const {data, status} = response;

            if (!data.success) throw new Error(data.message || 'Request failed');

            return data;
        },
        onError: (error) => {
            handleError(error)
        },
    });

    const handleResend = () => {
        if (countdown === 0) {
            setCountdown(34)
            setOtpInput(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()
            reSendOTP.mutate({phoneNumber: phoneNumber})
        }
    }

    return (
        <div className="w-full max-w-full p-1 md:p-3">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Enter OTP</h1>
                <p className="text-sm text-foreground/80 leading-relaxed">
                    A one time OTP has been sent to your phone number ending {maskedPhone}
                    <br/>
                    Enter the OTP to join the Cardii waitlist
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex justify-center gap-2 md:gap-3">
                    {otpInput.map((digit, index) => (
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
                            className="w-9 h-9 md:w-14 md:h-16 text-center text-xl font-semibold border-2 border-border rounded-lg focus:border-foreground focus:outline-none transition-colors"
                        />
                    ))}
                </div>

                <div className="text-center text-sm text-foreground/80">
                    Didn&apos;t receive OTP?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={countdown > 0}
                        className={`font-medium underline ${
                            countdown > 0 ? "text-foreground/40 cursor-not-allowed" : " text-blue-400 hover:text-blue-600"
                        }`}
                    >
                        Resend
                    </button>
                    {" "}
                    {countdown > 0 && `in ${countdown} secs`}
                </div>

                <div className="pt-6">
                    <Button
                        onClick={handleVerify}
                        disabled={otpInput.join("").length !== 6}
                        className="w-full h-12 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white disabled:opacity-50"
                    >
                        Verify OTP
                    </Button>
                </div>
            </div>
        </div>
    )
}
