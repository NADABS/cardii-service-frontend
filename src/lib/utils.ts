// lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs))
}

export const getToday = (): string => {
    const date = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const getOrdinal = (n: number) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
};

export const formatStatus = (_status?: string) => {
    if (!_status) {
        return "";
    }
    return _status.replace(/\s+/g, "").toLowerCase();
}

export const statusColourMap: Record<string, string> = {
    done: "bg-[#92C9B8]",
    onhold: "bg-[#6A9AD3] text-white",
    inprogress: "bg-[#DD944B] text-white",
    success: "bg-[#EBFFF2] text-[#4AA673]  border-[#4AA673] ",
    completed: "bg-[#EBFFF2] text-[#4AA673]  border-[#4AA673] ",
    verified: "bg-[#E9F9EF] text-[#34C759] border-[#34C759]",
    unverified: "bg-[#FFF6E5] text-[#FF9500] border-[#FF9500]",
    "": "bg-gray-400 text-gray-600",
}

export const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length > 0) {
        return (
            words[0].charAt(0) +
            (words.length > 1 ? words[words.length - 1].charAt(0) : "")
        );
    }
    return "";
};