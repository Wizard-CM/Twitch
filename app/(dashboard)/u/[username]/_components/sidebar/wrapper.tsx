"use client";
import { cn } from "@/lib/utils";
import { useDashboardSideBarState } from "@/store/dashboard-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collaspe, onCollaspe, onExpand } = useDashboardSideBarState(
    (state) => state
  );
  const matches = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (matches) {
      onCollaspe();
    } else {
      onExpand();
    }
  }, [matches, onCollaspe, onExpand]);
  return (
    <aside
      className={cn(
        "fixed left-0 h-full  w-[70px] lg:w-64 bg-[#252731]  border-r  border-[#6a6b6c] flex flex-col items-center lg:items-start",
        collaspe && "lg:w-[70px] ",
        !collaspe && "lg:p-3 lg:pr-0"
      )}
    >
      {children}
    </aside>
  );
};
