"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/store/sidebar-states";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UserItemProps {
  user: User;
  isLive?:boolean
}

export const UserItem = ({ user ,isLive}: UserItemProps) => {
  const { collaspe } = useSidebarState();
  return (
    <Button
      variant={"ghost"}
      // className="w-full h-auto px-1 flex justify-center"
      className="block w-full h-auto px-0 py-3 "
    >
      <Link
        href={`/${user.username}`}
        className={cn("flex gap-x-2 justify-center items-center w-full",!collaspe && "lg:justify-start")}
      >
        <UserAvatar imgUrl={user.imageUrl} username={user.username} isLive={isLive} />
        <p className={cn("hidden truncate", !collaspe && "lg:block")}>
          {user.username}
        </p>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  const { collaspe } = useSidebarState();
  return (
    <div className="flex justify-center lg:justify-start gap-x-2 items-center w-full lg:pr-2 my-2">
      <UserAvatarSkeleton />
      <Skeleton className={cn("w-full h-7 hidden", !collaspe && "lg:block")} />
    </div>
  );
};
