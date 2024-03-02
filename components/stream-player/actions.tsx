"use client"
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Follow, UnFollow } from "@/actions/follow";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  // Handlers
  const handleFollow = () => {
    startTransition(() => {
      Follow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.follower.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      UnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.follower.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="customButton"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;
