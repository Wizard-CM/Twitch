import React from "react";
import { Sides, ToolTip } from "../tooltip-component";
import { Button } from "../ui/button";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VolumeControllerProps {
  onChangeHandler: (value:number) => void;
  onToggleHanlder: () => void;
  value: number;
}

export const VolumeController = ({
  onChangeHandler,
  value,
  onToggleHanlder
}: VolumeControllerProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  const label = isMuted ? "UnMute" : "Mute";
  let Icon = Volume1;

  // Icons Should Change According to the value Logic
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  return (
    <div className="flex">
      <ToolTip label={label} side={Sides.Top} >
        <Button variant={"ghost"} className="p-2" onClick={onToggleHanlder}>
          <Icon className="h-6 w-6" />
        </Button>
      </ToolTip>
      <Slider
      className="w-[8rem] cursor-pointer"
        value={[value]}
        onValueChange={(value) => {onChangeHandler(value[0])}}
        max={100}
        step={1}
      />
    </div>
  );
};
