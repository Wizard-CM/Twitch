import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";
import ChatMessages from "./chat-messages";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 h-full  items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 h-full   flex-col-reverse overflow-y-auto p-3 ">
      {messages.map((message) => (
        <ChatMessages key={message.timestamp} data={message} />
      ))}
    </div>
  );
};

export default ChatList;

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
