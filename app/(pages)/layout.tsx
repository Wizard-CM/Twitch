import React, { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { User } from "@prisma/client";
import { getAllRecommendedUsers } from "@/lib/user-services";
import { currentUser } from "@clerk/nextjs";

interface layoutInterface {
  children: React.ReactNode;
}

const PagesLayout = async ({ children }: layoutInterface) => {


  return (
    <div>
      <Navbar />
      <Container>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        {children}
      </Container>
    </div>
  );
};

export default PagesLayout;
