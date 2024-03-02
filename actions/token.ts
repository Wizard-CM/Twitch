"use server";
import { isBlockedByUser } from "@/lib/block-services";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/user-services";
import { AccessToken } from "livekit-server-sdk";
import { v4 as uuid } from "uuid";

export const createViewerToken = async (hostIdentity: string) => {
  let self;
  try {
    self = await getSelf();
  } catch (error) {
    self = {
      id: uuid(),
      username: `guest-${Math.floor(Math.random() * 10000)}`,
    };
  }

  const host = await db.user.findFirst({ where: { id: hostIdentity } });

  if (!host?.id) {
    throw new Error("Host not found");
  }

  const loggedInUserBlock = await isBlockedByUser(hostIdentity);
  if (loggedInUserBlock) {
    throw new Error("Logged-In User Is Blocked By The Host");
  }

  const isHost = self?.id === host?.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${self?.id}` : `${self?.id}`,
      name: self?.username,
    }
  );
  token.addGrant({
    room: host?.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return await Promise.resolve(token.toJwt());
};
