import React from "react";
import { ChatItem } from "./chat-item";
import { currentUser } from "@clerk/nextjs";
import { getSelf } from "@/lib/user-services";
import { getStreamByUserId } from "@/lib/stream-services";

export const ChatComponent = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id!);

  return (
    <div className="p-5">
      <h2 className="font-semibold text-2xl sm:text-3xl">Chat Settings</h2>
      <div className="flex flex-col gap-2 mt-5">
        <ChatItem
          label="Enable Chat"
          value={stream?.isChatEnabled!}
          name={"isChatEnabled"}
        />
        <ChatItem
          label="Delay Chat"
          value={stream?.isChatDelayed!}
          name={"isChatDelayed"}
        />
        <ChatItem
          label="Must Be A Follower To Chat"
          value={stream?.isChatFollowersOnly!}
          name={"isChatFollowersOnly"}
        />
      </div>
    </div>
  );
};
