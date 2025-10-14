"use client"
import Link from "next/link"
import {VscChecklist} from "react-icons/vsc"
import {PiCirclesThree} from "react-icons/pi"
import {RiSettings3Line} from "react-icons/ri"
import {usePathname} from "next/navigation"
import {cn} from "@/src/lib/utils";
import {LayoutDashboardIcon, UsersIcon} from "lucide-react";


const primaryLinks = [
    {
        title: "Overview",
        href: "/overview",
        icon: <LayoutDashboardIcon/>,
    },
    {
        title: "Partners",
        href: "/partners",
        icon: <UsersIcon/>,
    },
    {
        title: "Administration",
        href: "/administration",
        icon: <VscChecklist/>,
    },
    {
        title: "Members",
        href: "/members",
        icon: <PiCirclesThree/>,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: <RiSettings3Line/>,
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
