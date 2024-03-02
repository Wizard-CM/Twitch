import { Button } from "@/components/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flex ">
      <Button variant={"ghost"} asChild size={"sm"}>
        <Link href={"/"}>
          <span className="text-lg">Exit</span>
          <LogOut className="h-5 w-5 ml-1" />
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
