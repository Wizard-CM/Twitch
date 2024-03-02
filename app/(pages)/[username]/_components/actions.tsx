"use client";
import { Block, UnBlock } from "@/actions/block";
import { Follow, UnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

interface ActionsProps {
  label: string;
  blockLabel: string;
  userId: string;
  isFollowing: boolean;
  isBlocking: boolean;
}

export const Actions = ({
  label,
  userId,
  isFollowing,
  blockLabel,
  isBlocking,
}: ActionsProps) => {
  const followClickHanlder = async () => {
    if (isFollowing) {
      const unfollow = await UnFollow(userId);
      toast.success(`UnFollowed ${unfollow.follower.username} successfully`);
    } else {
      const follow = await Follow(userId);
      toast.success(`Followed ${follow.follower.username} successfully`);
    }
  };
  const blockClickHanlder = async () => {
    if (isBlocking) {
      const unblock = await UnBlock(userId);
      toast.success(`UnBlocked ${unblock?.blocking.username}`);
    } else {
      const block = await Block(userId);
      toast.success(`Blocked ${block?.blocking.username}`);
    }
  };
  return (
    <div className="flex gap-2">
      <Button variant={"customButton"} onClick={followClickHanlder}>
        {label}
      </Button>
      <Button variant={"customButton"} onClick={blockClickHanlder}>
        {blockLabel}
      </Button>
    </div>
  );
};
