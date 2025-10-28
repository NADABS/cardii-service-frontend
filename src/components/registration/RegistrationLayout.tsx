
 import React, {PropsWithChildren} from 'react'
import mainImage from "@/public/images/registrationPic.png";
import Image from "next/image";

const AuthLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="min-h-screen w-full">
            {/* ---------- Laptop / Desktop (lg+) ---------- */}
            <div className="hidden lg:flex h-screen w-full relative">
                {/* Left side (image visible) */}
                <div className="flex-1  flex justify-center items-center bg-[#F5F5F5]  ">
                    <Image src={mainImage} alt={"Img1"} width={586} height={707} />
                </div>

                {/* Right side (white content panel) */}
                <div className="flex-1 bg-white  relative flex items-center justify-center z-10 overflow-y-auto p-8">
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
                <div className="flex-1  p-6">{children}</div>
            </div>
        </div>
    )
}
export default AuthLayout
