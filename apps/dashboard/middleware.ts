// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
// import { NextResponse } from "next/server";

// export default authMiddleware({
//   afterAuth(auth, req, evt) {
//     if (!auth.userId && !auth.isPublicRoute) {
//       const loginUrl = new URL("/login", req.url);

//       // Add ?from=/incoming-url to the /login URL
//       loginUrl.searchParams.set("from", req.nextUrl.pathname);

//       return NextResponse.redirect(loginUrl);
//     }
//   },
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export default function handler() {}
