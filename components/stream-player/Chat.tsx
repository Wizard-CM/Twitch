import React, { useEffect, useMemo, useState } from "react";
import { ChatHeader } from "./chat-header";
import { ChatVariant, useChatSidebarState } from "@/store/chat-sidebar-state";
import { useMediaQuery } from "usehooks-ts";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { Skeleton } from "../ui/skeleton";
import ChatList, { ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const { collasped, onCollaspe, onExpand, variant, onChangeVariant } =
    useChatSidebarState((state) => state);

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  const sortedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  // Logic for ChatSideBar Collasping //
  const matches = useMediaQuery("(max-width:1024px)");
  useEffect(() => {
    if (matches) {
      onCollaspe();
    } else {
      onExpand();
    }
  }, [matches, onExpand]);

  // Submit Handlers
  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };
  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="p-4 flex flex-col w-full h-full border border-x-red-50">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={sortedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      {/* <ChatHeaderSkeleton /> */}
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
