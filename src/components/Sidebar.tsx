"use client"
import Link from "next/link"
import { VscChecklist } from "react-icons/vsc"
import { PiCirclesThree } from "react-icons/pi"
import { RiSettings3Line } from "react-icons/ri"
import {cn, getInitials} from "@/src/lib/utils";
import {BsThreeDotsVertical} from "react-icons/bs";
import {usePathname, useRouter} from "next/navigation"
import { LayoutDashboardIcon, UsersIcon, LogOutIcon, UserIcon } from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

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

    const router = useRouter();

    const pathname = usePathname()

    const user = {
        name: "John Doe",
        role: "Admin",
    }

    const handleLogout = () => {
        router.replace("/")
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                                <BsThreeDotsVertical />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2" align="end">
                            <div className="flex flex-col gap-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <RiSettings3Line className="w-4 h-4" />
                                    <span>Settings</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors text-left w-full"
                                >
                                    <LogOutIcon className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
