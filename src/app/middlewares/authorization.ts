import "server-only";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@/src/app/actions";

const publicRoutes: string[] = ["/", "/login", "/register", "/verify"];

export default async function authorize(request: NextRequest) {
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
        const session = await getSession();
        if (!session) {
            const response = NextResponse.redirect(new URL("/", request.url));

            // response.cookies.set("token", "", { expires: new Date(0), path: "/" });
            // response.cookies.set("session", "", { expires: new Date(0), path: "/" });

            return response;
        }
    }
}
