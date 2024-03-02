import StreamPlayer from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/block-services";
import { isFollowing } from "@/lib/follow-services";
import { getUserByUserName } from "@/lib/user-services";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowingUser = await isFollowing(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isfollowing={isFollowingUser!}
    />
  );
};

export default UserPage;
