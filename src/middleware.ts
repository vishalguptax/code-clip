import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  console.log("origin", origin);

  if (origin !== process.env.NEXT_PUBLIC_API_URL) {
    return NextResponse.json({ error: "Invalid source" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
