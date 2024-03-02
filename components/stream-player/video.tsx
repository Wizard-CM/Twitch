
import {
  useConnectionState,
  useRemoteParticipant,
  useTrack,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import React from "react";
import { OfflineVideo } from "./offline-video";
import { VideoLoading } from "./video-loading";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}
export const Video = ({ hostIdentity, hostName }: VideoProps) => {
  const connection = useConnectionState();
  // participant refers to host
  // const participant = useRemoteParticipant(hostIdentity);
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);
  let content;



  // viewer cha tara host chaina bhane ko condition

  if (!participant && connection === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <VideoLoading label={connection} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  console.log(participant)


  return <div className="aspect-video border-b border-[#7a7a7adc]  relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};