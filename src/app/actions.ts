'use server'

import {cookies} from "next/headers";

export async function setSession(data: string) {
    const cookieStore = await cookies();
    cookieStore.set("session", data);
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session || !session.value || session.value === "undefined") {
        return null;
    }

    try {
        return JSON.parse(session.value);
    } catch {
        return null;
    }
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}