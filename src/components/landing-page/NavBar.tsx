import React from 'react'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const NavBar = () => {

    const router = useRouter();

    function handleNavigate() {
        router.push('/register')
    }

    return (
        <header className="bg-[#91A7BC] px-6 py-4 lg:px-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h1 className="font-bold text-2xl text-white lg:text-3xl">Cardii</h1>
                <Button onClick={handleNavigate} className="hidden py-3 px-10 rounded-xl md:inline-flex bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D]" size="lg">
                    Join the waitlist
                </Button>
            </div>
        </header>
    )
}
export default NavBar
