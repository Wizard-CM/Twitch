import { cn, stringToColor } from "@/lib/utils";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Sides, ToolTip } from "../tooltip-component";
import { MinusCircle } from "lucide-react";
import { toast } from "sonner";
import { Block } from "@/actions/block";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      Block(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <ToolTip label="Block" side={Sides.Left}>
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </ToolTip>
      )}
    </div>
  );
};

export default CommunityItem;
