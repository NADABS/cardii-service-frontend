
 import React, {PropsWithChildren} from 'react'
import bottomImage from "@/public/images/bottomImg.jpg";
import higherZ from "@/public/images/higherZIndex.png";
import lowerZ from "@/public/images/lowerZIndex.jpg"
import Image from "next/image";

const AuthLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="min-h-screen w-full">
            {/* ---------- Laptop / Desktop (lg+) ---------- */}
            <div className="hidden lg:flex h-screen w-full relative">
                {/* Left side (image visible) */}
                <div className="flex-1 relative flex flex-col bg-[#F5F5F5]  ">
                    <div className="z-10 absolute bg-white h-fit w-fit p-2 border rounded-2xl top-1/20 left-28">
                        <Image width={341} height={456} src={lowerZ} alt="Img1"/>
                    </div>
                    <div className="z-30 absolute h-fit w-fit bottom-1/8 right-28">
                        <Image width={341} height={456} src={higherZ} alt="Img2"/>
                    </div>
                    <div className="z-30 absolute h-fit w-fit bottom-1/5 left-40">
                        <Image width={175} height={200} src={bottomImage} alt="Img3" style={{borderRadius: '16px'}}/>
                    </div>
                </div>

                {/* Right side (white content panel) */}
                <div className="flex-1 bg-white relative flex items-center justify-center z-10 overflow-y-auto p-8">
                    {children}
                </div>
            </div>

            {/* ---------- Mobile / Tablet (sm & md) ---------- */}
            <div className="flex flex-col lg:hidden min-h-screen bg-white">
                {/* Blue banner */}
                <div className="bg-[#2563EB33] text-[#111827] text-left py-4 px-8 font-semibold">
                    Cardii
                </div>

                {/* Page content */}
                <div className="flex-1 p-6">{children}</div>
            </div>
        </div>
    )
}
export default AuthLayout
