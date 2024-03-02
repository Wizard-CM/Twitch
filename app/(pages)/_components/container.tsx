"use client";

import { cn } from "@/lib/utils";
import { useSidebarState } from "@/store/sidebar-states";

interface ContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  const { collaspe } = useSidebarState((state) => state);
  return (
    <div className={cn("pt-[5rem] pl-[75px]", !collaspe && "lg:pl-64")}>
      {children}
    </div>
  );
};
