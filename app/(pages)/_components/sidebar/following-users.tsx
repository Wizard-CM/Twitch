"use client";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/store/sidebar-states";
import { Follow, User } from "@prisma/client";
import React from "react";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";
interface FollowingUsersProps {
  data: (Follow & {
    follower: { stream: { isLive: boolean } | null } & User;
  })[];
}

export const FollowingUser = ({ data }: FollowingUsersProps) => {
  const { collaspe } = useSidebarState((state) => state);

  return (
    <>
      {data.length > 0 && (
        <>
          <p
            className={cn(
              "text-muted-foreground mt-5 mb-2 hidden",
              !collaspe && "lg:block"
            )}
          >
            Following
          </p>
          {data.length > 0 &&
            data.map((i, index) => {
              return (
                <UserItem
                  key={index}
                  user={i.follower}
                  isLive={i.follower.stream?.isLive}
                />
              );
            })}
        </>
      )}
    </>
  );
};

export const FollowingUsersSkeleton = () => {
  const { collaspe } = useSidebarState((state) => state);
  return (
    <>
      <Skeleton
        className={cn("h-7 w-[130px] my-5  hidden", !collaspe && "lg:block")}
      />

      {[...Array(3)].map((i) => (
        <UserItemSkeleton key={i} />
      ))}
    </>
  );
};
