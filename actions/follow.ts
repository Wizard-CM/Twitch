"use server";

import { followAUser, unFollowAUser } from "@/lib/follow-services";
import { revalidatePath } from "next/cache";

export const Follow = async (userId: string) => {
  const follow = await followAUser(userId);

  revalidatePath("/");
  if (follow.id) {
    revalidatePath(`/${follow.follower.username}`);
  }

  return follow;
};
export const UnFollow = async (userId: string) => {
  const unfollow = await unFollowAUser(userId);

  revalidatePath("/");
  if (unfollow.id) {
    revalidatePath(`/${unfollow.follower.username}`);
  }

  return unfollow;
};
