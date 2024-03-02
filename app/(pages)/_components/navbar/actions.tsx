import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import React, { Suspense } from "react";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { UserAvatarSkeleton } from "@/components/user-avatar";
import { User } from "@clerk/nextjs/server";

export const Actions = async () => {
  const user = await currentUser();
  return (
    <div>
      {!!user && (
        <div className="flex items-center gap-x-3">
          <Link
            href={`/u/${user.username}`}
            className="flex items-center gap-x-1"
          >
            <Clapperboard />
            <p>Dashboard</p>
          </Link>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
      {!user && (
        <SignInButton>
          <Button className=" bg-white/90 text-black">Login</Button>
        </SignInButton>
      )}
    </div>
  );
};
