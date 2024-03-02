"use server";
import { blockAUser, unBlockAUser } from "@/lib/block-services";
import { getSelf } from "@/lib/user-services";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const Block = async (userId: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockAUser(userId);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(self?.id!, userId);
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self?.username}/community`);

  return blockedUser;
};
export const UnBlock = async (userId: string) => {
  const unblock = await unBlockAUser(userId);

  revalidatePath("/");
  if (unblock.id) {
    revalidatePath(`/${unblock.blocking.username}`);
  }
  return unblock;
};
