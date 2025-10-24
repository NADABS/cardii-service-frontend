"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RiSettings3Line } from "react-icons/ri"
import { BsThreeDotsVertical } from "react-icons/bs"
import {
    LayoutDashboardIcon,
    UsersIcon,
    LogOutIcon,
    UserIcon,
    UserStarIcon,
    MessageSquareShareIcon
} from "lucide-react"
import { cn, getInitials } from "@/src/lib/utils"
import { useEffect, useState } from "react"
import {clearLocalStore} from "@/src/lib/storage";
import {CustomSpinner} from "@/src/components/CustomSpinner";

const primaryLinks = [
    { title: "Overview", href: "/overview", icon: <LayoutDashboardIcon />, roles: ["admin", "super admin", "manager", "user"] },
    { title: "Partners", href: "/partners", icon: <UsersIcon />, roles: ["admin", "super admin", "manager"] },
    { title: "Campaigns", href: "/campaigns", icon: <MessageSquareShareIcon />, roles: ["admin", "super admin", "marketer"] },
    { title: "Users", href: "/users", icon: <UserStarIcon />, roles: ["admin", "super admin"] },
]

export default function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetails")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const handleLogout = () => {
        setIsLoading(true)
        clearLocalStore();
        router.replace("/")
    }

    // Extract the role name safely
    const roleName = user?.role?.[0]?.name?.toLowerCase() || "user"

    // Filter sidebar links based on the role
    const visibleLinks = primaryLinks.filter((link) =>
        link.roles.map((r) => r.toLowerCase()).includes(roleName)
    )

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center absolute inset-0 z-50 bg-opacity-50 backdrop-blur">
                <CustomSpinner/>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col justify-between border-r border-gray-200 p-4">
            <div>
                <div className="mt-4 font-bold text-2xl">Cardii</div>
                <nav className="mt-6 flex flex-col gap-8">
                    {visibleLinks.map((link) => {
                        const isActive =
                            pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 transition-colors",
                                    isActive ? "text-black" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <span className="text-lg">{link.icon}</span>
                                <p className="text-md font-medium">{link.title}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Profile section */}
            <div className="w-full flex items-center justify-between">
                <div className="flex space-x-4 items-center">
                    <div className="w-12 h-12 rounded-full text-white flex justify-center text-lg font-bold items-center bg-blue-500">
                        {getInitials(user?.name || "")}
                    </div>
                    <div>
                        <div className="text-sm truncate">{user?.name}</div>
                        <div className="text-sm capitalize">{roleName}</div>
                    </div>
                </div>

                {/* Popover menu */}
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
    )
}
