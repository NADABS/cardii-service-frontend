import { NextRequest } from "next/server";
import authorize from "@/src/app/middlewares/authorization";

export default async function middleware(request: NextRequest) {
     return authorize(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/webpack-hmr).*)"],
};