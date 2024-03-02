import StreamPlayer from "@/components/stream-player";
import { getUserByUserName } from "@/lib/user-services";
import React from "react";

interface DashboardPageProps {
  params: { username: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const user = await getUserByUserName(params.username);
  if (!user?.id) {
    return <h2>Host Not Found</h2>;
  }
  return (
    <div className="h-[calc(100vh-5rem)]">
      <StreamPlayer user={user} stream={user.stream} isfollowing />
    </div>
  );
};

export default DashboardPage;
