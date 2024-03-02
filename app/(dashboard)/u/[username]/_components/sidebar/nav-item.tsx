"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDashboardSideBarState } from "@/store/dashboard-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const NavItem = ({ label, href, icon: Icon, isActive }: NavItemProps) => {
  const { collaspe } = useDashboardSideBarState((state) => state);
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "block w-full h-auto px-3 py-4 my-3",
        isActive &&
          "bg-[#61ffff] hover:bg-[#62ffff9d] hover:text-[#000000] text-[#000000]"
      )}
    >
      <Link
        href={href}
        className={cn(
          "flex gap-x-8 justify-center items-center w-full",
          !collaspe && "lg:justify-start"
        )}
      >
        <Icon className="h-5 w-5" />
        <p
          className={cn(
            "hidden font-semibold truncate",
            !collaspe && "lg:block"
          )}
        >
          {label}
        </p>
      </Link>
    </Button>
  );
};

export default NavItem;

// export const NavItemSkeleton = () => {
//   const { collaspe } = useDashboardSideBarState((state) => state);
//   return (
//     <div className="flex gap-x-8 justify-center items-center w-full">
//       <Skeleton className="h-5 w-5" />
//       <Skeleton className={cn("hidden", !collaspe && "lg:block")} />
//     </div>
//   );
// };
