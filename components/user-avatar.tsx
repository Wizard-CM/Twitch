import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imgUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  imgUrl,
  username,
  size,
  isLive = false,
  showBadge = false,
}: UserAvatarProps) => {
  return (
    <div>
      <Avatar
        className={cn(
          "border border-background",
          "ring-2 ring-blue-600",
          isLive && "ring-2 ring-red-700",
          avatarVariants({ size })
        )}
      >
        <AvatarImage src={imgUrl} />
        <AvatarFallback>
          <UserAvatarSkeleton />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export const UserAvatarSkeleton = () => {
  return <Skeleton className="h-8 w-8 shrink-0 rounded-full" />;
};
