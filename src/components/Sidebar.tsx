"use client"
import { GoHome } from "react-icons/go"
import Link from "next/link"
import { CiGrid41 } from "react-icons/ci"
import { VscChecklist } from "react-icons/vsc"
import { PiCirclesThree } from "react-icons/pi"
import { RiSettings3Line } from "react-icons/ri"
import { usePathname } from "next/navigation"
import {cn, getInitials} from "@/src/lib/utils";
import {BsThreeDotsVertical} from "react-icons/bs";


const primaryLinks = [
    {
        title: "Home",
        href: "/overview",
        icon: <GoHome />,
    },
    {
        title: "Projects",
        href: "/projects",
        icon: <CiGrid41 />,
    },
    {
        title: "Tasks",
        href: "/partners",
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

    const user = {
        name: "John Doe",
        role: "Admin",
    }

    return (
        <div className="w-full h-full flex flex-col justify-between border-r border-gray-200 p-6">
            <div>
                <div className="mt-4 font-bold text-2xl">Cardii</div>
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
            <div className="w-full flex items-center justify-between">
                <div className="flex space-x-4 items-center">
                    <div className="w-12 h-12 rounded-full text-white flex justify-center text-lg font-bold items-center bg-blue-500">
                        {getInitials(user.name)}
                    </div>
                    <div>
                        <div>{user.name}</div>
                        <div className="text-sm">{user.role}</div>
                    </div>
                </div>
                <div>
                    <button><BsThreeDotsVertical /></button>
                </div>
            </div>

        </div>
    )
}

export default Sidebar