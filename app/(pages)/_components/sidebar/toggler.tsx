"use client";
import React from "react";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useSidebarState } from "@/store/sidebar-states";
import { cn } from "@/lib/utils";
import { Sides, ToolTip } from "@/components/tooltip-component";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Toggle = () => {
  const { collaspe, onCollaspe, onExpand } = useSidebarState((state) => state);
  return (
    <div
      className={cn(
        "flex w-full justify-center lg:justify-between items-center",
        collaspe && "lg:justify-center"
      )}
    >
      <p className={cn("text-md hidden", !collaspe && "lg:block")}>Let's See</p>

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
  const { collaspe } = useSidebarState((state) => state);
  return (
    <div
      className={cn(
        "flex w-full justify-center lg:justify-between items-center",
        collaspe && "lg:justify-center"
      )}
    >
      <Skeleton className={cn("h-7 w-[100px] hidden", !collaspe && "lg:block")} />
      <Skeleton className={cn("h-7 w-8 hidden lg:block mr-2")} />
    </div>
  );
};
