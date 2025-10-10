'use client';
import {Button} from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import NavBar from "@/src/components/landing-page/NavBar";
import {useRouter} from "next/navigation";
import lgVector from "@/public/images/lgVector.svg";
import mdVector from "@/public/images/mdVector.svg";
import Image from "next/image";

export default function Page() {

    const router = useRouter();

    function handleNavigate() {
        router.push('/register')
    }

    return (
        <div className="h-screen overflow-hidden">
            <NavBar/>
            <main className="relative h-[calc(100vh-70px)] flex flex-col justify-center">

                <div
                    className="absolute w-full inset-0 bg-no-repeat bg-center bg-cover "
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #11182700, #111827), url('/images/escalade.jpg')`,
                    }}
                >
                </div>

                <div
                    className="relative z-10 flex h-fit flex-col items-start  px-6 pt-8 sm:pt-52 justify-center md:pt-0 lg:py-52 lg:px-24">
                    <div className="max-w-4xl lg:px-12">
                        <div className="font-bold  text-white sm:text-xl  md:text-3xl lg:text-7xl">
                            Rent A <span className="relative">Car {" "}
                            <span className="absolute left-1 sm:top-4 md:top-10  lg:top-18">
                                <Image
                                    src={mdVector}
                                    alt="Vector"
                                    className="block lg:hidden"
                                    width={58}
                                    height={17.36}
                                />
                                <Image
                                    src={lgVector}
                                    alt="Vector"
                                    className="hidden lg:block"
                                />
                            </span>
                        </span>
                            Anytime, Anywhere.
                        </div>

                        <p className="mt-4 text-base text-white/90 md:mt-6 md:text-lg lg:text-xl">
                            Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one
                            tap.
                        </p>

                        <Button onClick={handleNavigate} size="lg"
                                className="mt-6 pl-4 py-6 pr-0.5 flex justify-between items-center rounded-full gap-2 bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D] md:mt-8">
                            Reserve a seat
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                <ArrowRight className="h-4 w-4 text-white"/>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-blue-600"/>
                    <div className="h-1.5 w-4 rounded-full bg-white/50"/>
                    <div className="h-1.5 w-4 rounded-full bg-white/50"/>
                    <div className="h-1.5 w-4 rounded-full bg-white/50"/>
                </div>
            </main>
        </div>
    )
}
