"use client";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/store/sidebar-states";
import { User } from "@prisma/client";
import React from "react";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";
import { userAgent } from "next/server";

interface RecommendedUsersProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

export const RecommendedUsers = ({ data }: RecommendedUsersProps) => {
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
            Recommended
          </p>
          {data.length > 0 &&
            data.map((i,ind) => {
              return <UserItem key={ind} user={i} isLive={i.stream?.isLive} />;
            })}
        </>
      )}
    </>
  );
};

interface RecommendedUsersSkeletonProps {
  data: User[];
}

export const RecommendedUsersSkeleton = () => {
  const { collaspe } = useSidebarState((state) => state);
  return (
    <>
      <Skeleton
        className={cn("h-7 w-[130px] mt-5  hidden", !collaspe && "lg:block")}
      />

      {[...Array(3)].map((i) => (
        <UserItemSkeleton />
      ))}
    </>
  );
};
