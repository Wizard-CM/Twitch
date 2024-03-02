import { Maximize, Minimize } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Sides, ToolTip } from "../tooltip-component";
interface FullScreenControllerProps {
  isFullScreen: boolean;
  screenToggler: () => void;
}

export const FullScreenController = ({
  isFullScreen,
  screenToggler,
}: FullScreenControllerProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Minimize" : "Maximize";

  return (
    <div>
      <ToolTip label={label} side={Sides.Top} >
        <Button variant={"ghost"} onClick={screenToggler}>
          <Icon />
        </Button>
      </ToolTip>
    </div>
  );
};
