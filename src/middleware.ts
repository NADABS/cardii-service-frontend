import { NextRequest } from "next/server";
import authorize from "@/src/app/middlewares/authorization";

export default function middleware(request: NextRequest) {
    return authorize(request);
}