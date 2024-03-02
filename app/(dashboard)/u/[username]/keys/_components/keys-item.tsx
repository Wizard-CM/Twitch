"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import React, { useState } from "react";

interface KeysItemProps {
  label: string;
  value: string;
  showFeature?: boolean;
}

export const KeysItem = ({
  label,
  value,
  showFeature = false,
}: KeysItemProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const copyHandler = () => {
    navigator.clipboard.writeText(value);
    setShow(true);
    setTimeout(() => {
      setShow((prev) => !prev);
    }, 2000);
  };
  return (
    <div
      className={cn(
        "flex w-full justify-between p-4 sm:p-8 bg-[#252731] rounded-lg gap-x-6 items-center my-3 relative",
        showFeature && "sm:py-10"
      )}
    >
      <p className="shrink-0 font-semibold">{label}</p>
      <Input
        value={value}
        type={showKey ? "text" : showFeature ? "password" : "text"}
      />
      {show ? <CheckCheck className="shrink-0" /> : <Copy onClick={copyHandler} className="shrink-0" />}
      {showFeature && (
        <p
          className="font-semibold absolute right-[20px] top-[70px] py-2"
          onClick={() => {
            setShowKey((prev) => !prev);
          }}
        >
          {showKey ? "Hide" : "Show"}
        </p>
      )}
    </div>
  );
};
