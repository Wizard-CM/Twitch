"use client"
import { cn } from "@/lib/utils";
import { useDashboardSideBarState } from "@/store/dashboard-sidebar";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collaspe } = useDashboardSideBarState((state) => state);
  return (
    <div className={cn("pt-[5rem] pl-[75px]", !collaspe && "lg:pl-64")}>
      {children}
    </div>
  );
};
