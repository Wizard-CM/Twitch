import React from "react";
import { Navbar } from "./[username]/_components/navbar";
import { Container } from "./[username]/_components/container";
import { Sidebar } from "./[username]/_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Navbar />
      <Container>
        <Sidebar />
        {children}
      </Container>
    </div>
  );
};

export default DashboardLayout;
