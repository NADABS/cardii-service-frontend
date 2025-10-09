"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import {useRouter} from "next/navigation";


export function SuccessScreen() {

    const router = useRouter();

    return (
        <div className="w-full max-w-xl bg-white rounded-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-8">
                <div className="relative">
                    {/* Outer light blue ring */}
                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50" />
                    {/* Main blue circle with checkmark */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-16 h-16 md:w-20 md:h-20 text-white stroke-[3]" />
                    </div>
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">You are all set</h1>

            <Button onClick={()=>router.replace('/')} className="w-full h-12 text-base bg-[#1a1d2e] hover:bg-[#2a2d3e] text-white">
                Back to Website
            </Button>
        </div>
    )
}
