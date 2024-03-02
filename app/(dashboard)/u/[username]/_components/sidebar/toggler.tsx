"use client";
import { Sides, ToolTip } from "@/components/tooltip-component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardSideBarState } from "@/store/dashboard-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const Toggle = () => {
  const { collaspe, onCollaspe, onExpand } = useDashboardSideBarState(
    (state) => state
  );
  return (
    <div
      className={cn(
        "flex w-full justify-center lg:justify-between items-center",
        collaspe && "lg:justify-center"
      )}
    >
      <p className={cn("text-md hidden text-lg", !collaspe && "lg:block")}>Dashboard</p>

      {collaspe ? (
        <ToolTip label="Expand" side={Sides.Right}>
          <Button
            variant={"ghost"}
            onClick={() => {
              onExpand();
            }}
            className={cn("hidden", collaspe && "lg:block p-0")}
          >
            <ArrowRightFromLine className="h-4 w-4 " />
          </Button>
        </ToolTip>
      ) : (
        <ToolTip label="Collaspe" side={Sides.Right}>
          <Button
            variant={"ghost"}
            onClick={() => {
              onCollaspe();
            }}
            className={cn("hidden", !collaspe && "lg:block")}
          >
            <ArrowLeftFromLine className="h-4 w-4" />
          </Button>
        </ToolTip>
      )}
    </div>
  );
};

export default Toggle;

export const ToggleSkeleton = () => {
  return <></>;
};
