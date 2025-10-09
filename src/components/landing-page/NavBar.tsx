import React from 'react'
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const NavBar = () => {

    const router = useRouter();

    function handleNavigate() {
        router.push('/register')
    }

    return (
        <header className="bg-[#91A7BC] px-6 py-4 lg:px-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h1 className="font-bold text-2xl text-white lg:text-3xl">Cardii</h1>

                <button className="md:hidden text-white" aria-label="Open menu">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Menu className="h-8 w-8" />
                        </PopoverTrigger>
                        <PopoverContent className="bg-transparent border-none shadow-none w-fit">
                            <button
                                className="bg-white text-foreground text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 active:scale-[0.98] "
                                style={{
                                    width: "170px",
                                    height: "42px",
                                    padding: "5px",
                                    opacity: 1,
                                }}
                            >
                                <p className="bg-[#F1F5F9] rounded-md p-1">Join the waitlist</p>
                            </button>
                        </PopoverContent>
                    </Popover>
                </button>

                <Button onClick={handleNavigate} className="hidden py-3 px-10 rounded-xl md:inline-flex bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D]" size="lg">
                    Join the waitlist
                </Button>
            </div>
        </header>
    )
}
export default NavBar
