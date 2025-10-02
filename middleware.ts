import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { headers } from "next/headers";


type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest){
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            }
        }
    );

    if (!session){
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"]
}