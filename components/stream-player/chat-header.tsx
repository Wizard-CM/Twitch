import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessageSquare,
  Users,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ChatVariant, useChatSidebarState } from "@/store/chat-sidebar-state";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Sides, ToolTip } from "../tooltip-component";

export const ChatHeader = () => {
  const { collasped, onCollaspe, onExpand, variant, onChangeVariant } =
    useChatSidebarState((state) => state);
  const canShow = useMediaQuery("(max-width:1024px)");
  const label = collasped ? "Expand" : "Collaspe";

  return (
    <div
      className={cn(
        "flex w-full justify-between items-center pb-2 mb-4 ",
        !collasped && "border-b border-[#5c5c5cdf]"
      )}
    >
      {collasped ? (
        <ToolTip label={label} side={Sides.Left}>
          <Button
            className={cn("hidden lg:block")}
            variant={"ghost"}
            onClick={() => {
              onExpand();
            }}
          >
            <ArrowLeftFromLine className="h-5 w-5" />
          </Button>
        </ToolTip>
      ) : (
        <ToolTip label={label} side={Sides.Left}>
          <Button
            className={cn("hidden lg:block")}
            variant={"ghost"}
            onClick={() => {
              onCollaspe();
            }}
          >
            <ArrowRightFromLine className="h-5 w-5" />
          </Button>
        </ToolTip>
      )}

      {(!collasped || canShow) && (
        <>
          <h3 className="font-semibold font-xl">Stream Chat</h3>

          {variant === ChatVariant.CHAT ? (
            <Button
              variant={"ghost"}
              onClick={() => {
                onChangeVariant(ChatVariant.COMMUNITY);
              }}
            >
              <Users className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              onClick={() => {
                onChangeVariant(ChatVariant.CHAT);
              }}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
