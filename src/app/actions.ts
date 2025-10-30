'use server'

import {cookies} from "next/headers";

export async function setSession(data: string) {
    const cookieStore = await cookies();
    cookieStore.set("session", data);
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get("session");
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}