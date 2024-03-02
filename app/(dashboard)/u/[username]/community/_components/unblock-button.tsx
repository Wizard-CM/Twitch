"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { UnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";

interface UnblockButtonProps {
  userId: string;
};

export const UnblockButton = ({
  userId,
}: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
        UnBlock(userId)
        .then((result) => toast.success(`User ${result.blocking.username} unblocked`))
        .catch(() => toast.error("Something went wrong"))
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  )
}