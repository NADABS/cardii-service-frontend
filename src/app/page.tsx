'use client';
import {Button} from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import NavBar from "@/src/components/landing-page/NavBar";
import {useRouter} from "next/navigation";
import lgVector from "@/public/images/lgVector.svg";
import mdVector from "@/public/images/mdVector.svg";
import Image from "next/image";
import {useState, useEffect} from "react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

function CarouselTitle () {
    return <div className="font-bold  text-white text-2xl  md:text-3xl lg:text-7xl">
        Rent A <span className="relative">Car {" "}
        <span className="absolute left-1 top-5 md:top-10  lg:top-18">
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
}

export default function Page() {

    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const [currentCarouselPage, setCurrentCarouselPage] = useState(0)

    const router = useRouter();

    function handleNavigate() {
        router.push('/register')
    }

    const slides = [
        {
            id: 1,
            title: <CarouselTitle />,
            description: "Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one tap.",
        },
        {
            id: 2,
            title: <CarouselTitle />,
            description: "Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one tap.",
        },
        {
            id: 3,
            title: <CarouselTitle />,
            description: "Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one tap.",
        },
        {
            id: 4,
            title: <CarouselTitle />,
            description: "Flexible rentals for individuals and fleet managers. Choose, book, and drive, all in one tap.",
        },
    ]

    useEffect(() => {
        if (!carouselApi) return

        setCurrentCarouselPage(carouselApi.selectedScrollSnap())

        carouselApi.on("select", () => {
            setCurrentCarouselPage(carouselApi.selectedScrollSnap())
        })
    }, [carouselApi])

    return (
        <div className="h-screen overflow-hidden">
            <NavBar/>
            <main className="relative h-[calc(100vh-40px)] flex flex-col justify-center">

                <div
                    className="absolute w-full inset-0 bg-no-repeat bg-center bg-cover "
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #11182700, #111827), url('/images/escalade.jpg')`,
                    }}
                >
                </div>
                <div>
                    <Carousel
                        setApi={setCarouselApi}
                        opts={{
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}>
                        <CarouselContent>
                            {slides.map((slide)=> (
                                <CarouselItem  key={slide.id}>
                                    <div className="max-w-4xl px-6 lg:px-12">
                                        {slide.title}
                                        <p className="mt-4 text-base text-white/90 md:mt-6 md:text-lg lg:text-xl">
                                            {slide.description}
                                        </p>
                                        <Button onClick={handleNavigate} size="lg"
                                                className="mt-6 pl-4 py-6 pr-0.5 flex justify-between items-center rounded-full gap-2 bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D] md:mt-8">
                                            Reserve a seat
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                                <ArrowRight className="h-4 w-4 text-white"/>
                                            </div>
                                        </Button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => carouselApi?.scrollTo(index)}
                                className={`h-1.5 rounded-full transition-all ${
                                    index === currentCarouselPage ? "w-12 bg-blue-600" : "w-4 bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </main>
        </div>
    )
}
