import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

const roles = ["ADMIN", "USER"];

export async function POST(request: Request) {
  const { userId, role } = await request.json();
  console.log("Completing user with role: ", role, " and userId: ", userId);

  if (!role || !userId) {
    const what = !role ? `role${!userId ? " and userId" : ""}` : "userId";
    return NextResponse.json(
      { success: false, message: `Missing ${what}.` },
      { status: 500 }
    );
  }

  if (!roles.includes(role)) {
    return NextResponse.json(
      {
        success: false,
        message: `Invalid role. Available roles are 'ADMIN' or 'USER'.`,
      },
      { status: 500 }
    );
  }

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  });
  console.log("User updated.");
  return NextResponse.json({ success: true });
}
