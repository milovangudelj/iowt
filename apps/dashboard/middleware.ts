import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const authRoutes = ["/signin", "/signup"];

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const redirectTo = decodeURI(
      req.nextUrl.searchParams.get("redirectTo") ?? "/"
    );

    if (
      auth.userId &&
      authRoutes.some(
        (route) => route.localeCompare(req.nextUrl.pathname) === 0
      )
    )
      return NextResponse.redirect(new URL(redirectTo, req.url));

    if (!auth.userId && !auth.isPublicRoute) {
      const signinUrl = new URL("/signin", req.url);

      // Add ?redirectTo=/incoming-url to the /signin URL
      signinUrl.searchParams.set("redirectTo", req.nextUrl.pathname);

      return NextResponse.redirect(signinUrl);
    }
  },
  publicRoutes: authRoutes,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
