import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Internal routes bypass
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    // Clean headers
    const cleanHeaders = new Headers();
    cleanHeaders.set("Accept", "application/json");

    const cookie = request.headers.get("cookie");

    if (cookie) {
      cleanHeaders.set("cookie", cookie);
    }

    const sessionRes = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        method: "GET",
        headers: cleanHeaders,
      }
    );

    if (!sessionRes.ok) {
      return NextResponse.next();
    }

    const session = await sessionRes.json();
    const user = session?.user;

    if (pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(
        new URL("/auth/sign-in", request.url)
      );
    }


    if (
      pathname.startsWith("/dashboard/admin") &&
      user?.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }


    if (
      pathname.startsWith("/dashboard/writer") &&
      user?.role !== "writer"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      pathname.startsWith("/dashboard/user") &&
      user?.role !== "reader"
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    if (
      user &&
      (
        pathname.startsWith("/auth/sign-in") ||
        pathname.startsWith("/auth/sign-up")
      )
    ) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
   
  ],
};