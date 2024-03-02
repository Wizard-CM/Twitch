"use client";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import React from "react";
import NavItem from "./nav-item";
import { useParams, usePathname } from "next/navigation";



export const Navigation = () => {
  const { username } = useParams();
  const path = usePathname();

  const routes = [
    {
      label: "Stream",
      href: `/u/${username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${username}/community`,
      icon: Users,
    },
  ];
  return (
    <div className="px-3 w-full mt-2">
      {routes.map((i) => (
        <NavItem label={i.label} icon={i.icon} href={i.href} isActive={i.href == path} />
      ))}
    </div>
  );
};
