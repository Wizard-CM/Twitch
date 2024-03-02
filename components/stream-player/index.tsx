"use client";
import React from "react";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./Chat";
import { useViewerToken } from "@/hooks/viewer-token";
import { Stream, User } from "@prisma/client";
import { useChatSidebarState } from "@/store/chat-sidebar-state";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./chat-header";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

interface StreamPlayerProps {
  user: User & {
     stream: Stream | null,
     _count: { Follower: number
     } };
  stream: Stream | null;
  isfollowing: boolean;
}

const StreamPlayer = ({ user, stream, isfollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collasped } = useChatSidebarState((state) => state);

  if (!name || !token || !identity) {
    return <div>Cannot Watch Stream</div>;
  }
  return (
    <>
      {collasped && (
        <div className="hidden lg:block fixed top-[100px]  right-2 z-50">
          <ChatHeader />
        </div>
      )}
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        token={token}
        // Without token , livekitRoom wouldn't allow the features like useConneciton hooks etc to work.
        className="grid grid-cols-1  lg:grid-cols-3 2xl:grid-cols-6 h-[calc(100vh-80px)]"
      >
        <div
          className={cn(
            "col-span-1 lg:col-span-2 2xl:col-span-4 border",
            collasped && "lg:col-span-3 2xl:col-span-6"
          )}
        >
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isfollowing}
            name={stream?.name!}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream?.name!}
            thumbnailUrl={stream?.thumbnailUrl!}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.Follower}
          />
        </div>
        <div
          className={cn(
            "col-span-1 h-full  2xl:col-span-2",
            collasped && "lg:hidden"
          )}
        >
          <Chat
            viewerName={name}
            hostName={user?.username}
            hostIdentity={user?.id}
            isFollowing={isfollowing}
            isChatEnabled={stream?.isChatEnabled!}
            isChatDelayed={stream?.isChatDelayed!}
            isChatFollowersOnly={stream?.isChatFollowersOnly!}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        {/* <HeaderSkeleton /> */}
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
