'use client';
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import NavBar from "@/src/components/landing-page/NavBar";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useRouter} from "next/navigation";

export default function Page() {

    const router = useRouter();

    function handleNavigate() {
        router.push('/register')
    }

    return (
        <div className="min-h-screen">
            <NavBar />
            <main className="relative h-[calc(100vh-60px)]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-center bg-cover sm:bg-[length:auto_170%] sm:bg-center md:bg-[length:auto_150%] md:bg-center lg:[length:auto_100%] lg:bg-center
  "
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #11182700, #111827), url('/images/escalade.jpg')`,
                    }}
                >
                </div>

                <div className="relative z-10 flex h-full flex-col items-start justify-end pb-24 px-6 md:justify-end md:pb-32 lg:justify-center lg:pb-0 lg:px-24">
                    <div className="max-w-4xl lg:px-12">
                        <h1 className="font-bold text-4xl text-white leading-tight md:text-5xl lg:text-7xl">
                            Rent A Car{" "}
                            <span className="relative inline-block">
                Anytime
                <span className="absolute bottom-1 left-0 h-1.5 w-full bg-[#D4F14E] md:bottom-2 md:h-2" />
              </span>
                            , Anywhere.
                        </h1>

                        <p className="mt-4 text-base text-white/90 md:mt-6 md:text-lg lg:text-xl">
                            Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one tap.
                        </p>

                        <Button onClick={handleNavigate} size="lg" className="mt-6 pl-4 py-6 pr-0.5 flex justify-between items-center rounded-full gap-2 bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D] md:mt-8">
                            Reserve a seat
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    className="absolute top-1/4 left-6 z-20 flex h-36 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#A2BFFF4D] backdrop-blur-sm transition-colors hover:bg-slate-600/70 lg:left-12"
                    aria-label="Previous slide"
                >
                    <FaArrowLeft className="h-4 w-4 text-white" />
                </button>

                <button
                    className="absolute top-1/4 right-6 z-20 flex h-36 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#A2BFFF4D] backdrop-blur-sm transition-colors hover:bg-slate-600/70 lg:right-12"
                    aria-label="Next slide"
                >
                    <FaArrowRight className="h-4 w-4 text-white" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-blue-600" />
                    <div className="h-1.5 w-4 rounded-full bg-white/50" />
                    <div className="h-1.5 w-4 rounded-full bg-white/50" />
                    <div className="h-1.5 w-4 rounded-full bg-white/50" />
                </div>
            </main>
        </div>
    )
}
