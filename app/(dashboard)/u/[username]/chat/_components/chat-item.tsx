"use client";
import { Update } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface ChatItemProps {
  label: string;
  value: boolean;
  name: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
}

export const ChatItem = ({ label, value, name }: ChatItemProps) => {
  const [valueData, setValueData] = useState<boolean>(value);
  const [isPending, startInterval] = useTransition();
  const handleChange = () => {
    startInterval(() => {
      Update({ [name]: !value })
        .then((data) => {
          toast.success("Chat Data Updated Successfully");
        })
        .catch((error) => {
          toast.error(`Error While Updating Chat Information`);
        });
    });
  };
  return (
    <div className="px-5  py-8 my-2 rounded-lg w-full flex justify-between  bg-[#252731] hover:bg-[#252731a7]">
      <p className="font-semibold text-md">{label}</p>
      <Switch
        checked={valueData}
        disabled={isPending}
        onCheckedChange={() => {
          handleChange();
          setValueData((prev) => !prev);
        }}
      />
    </div>
  );
};
