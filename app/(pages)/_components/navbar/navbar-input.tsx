"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const NavbarInput = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  // Handler

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      return;
    }

    router.push(`search?term=${input}`);
  };

  return (
    <form
      className="flex gap-x-1 items-center w-full lg:max-w-[400px] relative lg:mx-4 mr-5"
      onSubmit={submitHandler}
    >
      <Input
        placeholder="Search..."
        className="w-full p-5"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {input && (
        <X
          className="absolute right-[13%] text-muted-foreground"
          onClick={() => {
            setInput("");
          }}
        />
      )}
      <Button type="submit" variant={"navbarButton"} className="p-2">
        <Search />
      </Button>
    </form>
  );
};
