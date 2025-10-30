import "server-only";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {getSession} from "@/src/app/actions";

const publicRoutes: string[] = ["/", "/login", "/register", "/verify"];
export default async function authorize(request: NextRequest) {
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
        const userDetails = await getSession();
        if (!userDetails)
            return NextResponse.redirect(request.nextUrl.origin);
    }
}