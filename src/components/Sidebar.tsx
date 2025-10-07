"use client"
import { GoHome } from "react-icons/go"
import Link from "next/link"
import { CiGrid41 } from "react-icons/ci"
import { VscChecklist } from "react-icons/vsc"
import { PiCirclesThree } from "react-icons/pi"
import { RiSettings3Line } from "react-icons/ri"
import { usePathname } from "next/navigation"
import {cn} from "@/src/lib/utils";


const primaryLinks = [
    {
        title: "Home",
        href: "/dashboard",
        icon: <GoHome />,
    },
    {
        title: "Projects",
        href: "/projects",
        icon: <CiGrid41 />,
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: <VscChecklist />,
    },
    {
        title: "Team",
        href: "/team",
        icon: <PiCirclesThree />,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: <RiSettings3Line />,
    },
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className="w-full h-full flex flex-col justify-between border-r border-gray-200 p-6">
            <div>
                <div className="mt-4">Logpip logo</div>
                <nav className="mt-6 flex flex-col gap-3">
                    {primaryLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                        return (
                            <Link
                                href={link.href}
                                key={link.href}
                                className={cn(
                                    "flex items-center gap-3 transition-colors",
                                    isActive ? "text-black" : "text-gray-500 hover:text-gray-700",
                                )}
                            >
                                <span className="text-lg">{link.icon}</span>
                                <p className="text-sm font-medium">{link.title}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div>{/* Footer content can go here */}</div>
        </div>
    )
}

export default Sidebar
