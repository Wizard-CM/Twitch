import React, { Suspense } from "react";
import Toggle, { ToggleSkeleton } from "./toggler";
import { Wrapper } from "./wrapper";
import { RecommendedUsers, RecommendedUsersSkeleton } from "./recommended";
import { getAllRecommendedUsers } from "@/lib/user-services";
import { Follow, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { getAllFollowingUsers } from "@/lib/follow-services";
import { FollowingUser } from "./following-users";

type allFollowingUsersType = (Follow & { follower: {stream: { isLive: boolean } | null} & User  })[];
type allRecommendedUsersType = (User & {
  stream: { isLive: boolean } | null;
})[];

export const Sidebar = async () => {
  const allRecommendedUsers: allRecommendedUsersType =await getAllRecommendedUsers();
  const allFollowingUsers: allFollowingUsersType = await getAllFollowingUsers();

  return (
    <Wrapper>
      <Toggle />
      <FollowingUser data={allFollowingUsers}  />
      <RecommendedUsers data={allRecommendedUsers}  />
    </Wrapper>
  );
};

export const SidebarSkeleton = async () => {
  return (
    <aside
      className={cn(
        `fixed left-0 h-full  w-[70px] lg:w-64
         bg-[#252731] lg:p-3 lg:pr-0 
         flex flex-col items-center  lg:items-start`
      )}
    >
      <ToggleSkeleton />
      <RecommendedUsersSkeleton />
    </aside>
  );
};
