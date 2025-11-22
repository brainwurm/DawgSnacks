import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/add-post",
        "/add-recipe",
        "/authenticated-view",
        "/food-page",
        "/history"
    ],
};

// TODO: Re-enable auth middleware after NextAuth is configured
// For now, allowing all requests to test frontend
export default function middleware(request: NextRequest) {
    return NextResponse.next();
}