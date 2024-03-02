"use client";
import { useTracks } from "@livekit/components-react";
import { RemoteParticipant, Track } from "livekit-client";
import React, { useEffect, useRef, useState } from "react";
import { VolumeController } from "./volume-controller";
import { FullScreenController } from "./fullscreen-controller";

interface LiveVideoProps {
  participant: RemoteParticipant | undefined;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const [value, setValue] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Displaying the Stream Video Data Logic
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant?.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  // Hanlders
  // Handlers Related To Volume
  const onChangeHanlder = (value: number) => {
    setValue(value);
  };
  const onToggleHanlder = () => {
    const isMuted = value === 0;

    setValue(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  // Handlers Related To FullScreen
  const screenToggler = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current?.requestFullscreen();
    }
  };
  const handleScreenToggle = () => {
    const isDOMFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isDOMFullScreen);
  };

  window.addEventListener("fullscreenchange", handleScreenToggle);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute w-full h-full top-0 opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 h-14 w-full flex items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeController
            onChangeHandler={onChangeHanlder}
            value={value}
            onToggleHanlder={onToggleHanlder}
          />
          <FullScreenController
            isFullScreen={isFullScreen}
            screenToggler={screenToggler}
          />
        </div>
      </div>
    </div>
  );
};
