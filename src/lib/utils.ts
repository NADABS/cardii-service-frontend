// lib/utils.ts
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {ParsedError} from "@/src/types/ApiError";

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs))
}

export const getToday = (): string => {
    const date = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("en-US", {month: "long"});
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
    suspended: "border-[#FF3B30] bg-[#FFECEC] text-[#FF3B30] ",
    inprogress: "bg-[#DD944B] text-white",
    success: "bg-[#EBFFF2] text-[#4AA673]  border-[#4AA673] ",
    completed: "bg-[#EBFFF2] text-[#4AA673]  border-[#4AA673] ",
    verified: "bg-[#E9F9EF] text-[#34C759] border-[#34C759]",
    unverified: "bg-[#FFF6E5] text-[#FF9500] border-[#FF9500]",
    pending: "bg-[#FFF6E5] text-[#FF9500] border-[#FF9500]",
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


export function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function extractErrorsLabeled(
    errorData: Record<string, string[]>
): string[] {
    return Object.entries(errorData).flatMap(([field, messages]) =>
        messages.map((_message) => `${capitalize(field)}: ${_message}`)
    );
}

/**
 * 🧩 Parses errors gracefully — supports Axios, Laravel 422, custom thrown, and fetch-like errors.
 */
export function parseApiError(error: any, fallbackMessage = "An unknown error occurred") {
    let status = 500;
    let message = fallbackMessage;
    let errors: Record<string, string[]> = {};

    try {
        // 🧱 Axios error format
        if (error?.response) {
            const res = error.response;
            status = res.status ?? 500;
            const data = res.data || {};

            message = data.message || fallbackMessage;
            errors = data.errors || data.data || {};

            return {status, message, errors};
        }

        // 💬 Custom thrown (e.g. from fetch wrapper)
        if (error?.__custom) {
            status = error.status ?? 500;
            message = error.message ?? fallbackMessage;
            errors = error.errors ?? {};
            return {status, message, errors};
        }

        // 🌐 Plain or fetch error
        if (error?.status) {
            status = error.status;
            message = error.message || fallbackMessage;
            errors = error.errors || {};
            return {status, message, errors};
        }

        // 🪶 Generic fallback
        message = error?.message || fallbackMessage;
    } catch (e) {
        console.error("Error parsing API error:", e);
    }

    return {status, message, errors};
}

export function capitalizeFirstLetter(string: string | null) {
    if (typeof string !== 'string' || string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}