import React from 'react'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const NavBar = () => {

    const router = useRouter();

    function handleNavigate() {
        router.push('/login')
    }

    return (
        <header className="bg-[#91A7BC] px-10 py-4">
            <div className="w-full flex items-center justify-between">
                <h1 className="font-bold text-2xl text-white lg:text-3xl">Cardii</h1>
                <Button onClick={handleNavigate} className="hidden py-3 px-5 rounded-xl md:inline-flex bg-[#D4F14E] font-semibold text-[#2563EB] hover:bg-[#C5E23D]" size="lg">
                    Login
                </Button>
            </div>
        </header>
    )
}
export default NavBar
