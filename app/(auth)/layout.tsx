import React from "react";
import { Logo } from "./_components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
