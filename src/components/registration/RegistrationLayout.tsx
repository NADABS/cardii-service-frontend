import React, {PropsWithChildren} from 'react'

const RegistrationLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="min-h-screen w-full">
            {/* ---------- Laptop / Desktop (lg+) ---------- */}
            <div className="hidden lg:flex h-screen w-full relative">
                {/* Background image + gradient */}
                <div
                    className="absolute inset-0 bg-cover bg-center "
                    style={{
                        backgroundImage: "url('/images/escalade.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#11182700] to-[#111827]" />
                </div>

                {/* Left side (image visible) */}
                <div className="flex-1 relative flex flex-col justify-end text-white ">
                    <footer className=" p-4 font-bold  text-3xl text-left">
                        Cardii
                    </footer>
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
export default RegistrationLayout
