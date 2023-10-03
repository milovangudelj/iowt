"use client";

import { useAuth, useSession } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { SignOut } from "icons";
import Image from "next/image";

export function NavUser() {
  const { signOut } = useAuth();
  const { session, isLoaded, isSignedIn } = useSession();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  if (!isSignedIn) {
    redirect("/signin");
  }

  const router = useRouter();
  const { user } = session;

  return (
    <div className="ui-flex ui-items-center ui-gap-2">
      <div className="ui-w-8 ui-h-8 ui-rounded-full ui-overflow-hidden ui-border-white/[0.06] ui-bg-gray-900">
        {/* <Image
          src={user.imageUrl}
          alt={`La tua immagine del profilo`}
          width={32}
          height={32}
          className="ui-w-full ui-h-full ui-object-cover"
        /> */}
      </div>
      <div className="ui-flex ui-flex-col">
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span>{user.primaryEmailAddress?.emailAddress}</span>
      </div>
      <button
        onClick={() => {
          signOut();
          router.push("/signin");
        }}
        className="ui-p-1 hover:ui-bg-gray-900 ui-rounded-lg ui-border-white/[0.06]"
      >
        <SignOut size={16} />
      </button>
    </div>
  );
}
