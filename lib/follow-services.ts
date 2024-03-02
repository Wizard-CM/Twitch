import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

// This function will check if the currently logged in user is following the other user that is passed in it's param or not.
export const isFollowing = async (userId: string) => {
  const self = await currentUser();
  const databaseSelf = await db.user.findFirst({
    where: { externalUserId: self?.id },
  });
  if (!self?.id || !databaseSelf?.id) {
    return;
  }

  const otherUser = await db.user.findFirst({ where: { id: userId } });

  if (!otherUser) {
    throw new Error("Other User Does Not Exists");
  }

  const follow = await db.follow.findFirst({
    where: {
      followingId: databaseSelf?.id,
      followerId: otherUser.id,
    },
  });

  if (!follow?.id) {
    return false;
  }
  return true;
};

// This function will find all the users that the logged in user has followed to display in the side bar.
export const getAllFollowingUsers = async () => {
  try {
    const self = await currentUser();
    const databaseSelf = await db.user.findFirst({
      where: { externalUserId: self?.id },
    });
    if (!self?.id || !databaseSelf?.id) {
      throw new Error(
        "Current User Does Not Exists || Current User Does Not Exist In Database"
      );
    }

    const followingUsers = await db.follow.findMany({
      where: { followingId: databaseSelf.id },
      include: {
        follower: {
          include: {
            stream: {
              select: { isLive: true },
            },
          },
        },
      },
    });

    return followingUsers;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Database Queries
export const followAUser = async (userId: string) => {
  try {
    const self = await currentUser();
    const databaseSelf = await db.user.findFirst({
      where: { externalUserId: self?.id },
    });
    if (!self?.id || !databaseSelf?.id) {
      throw new Error(
        "Current User Does Not Exists || Current User Does Not Exist In Database"
      );
    }
    const otherUser = await db.user.findFirst({ where: { id: userId } });

    if (!otherUser) {
      throw new Error("Other User Does Not Exists");
    }

    const followExists = await db.follow.findFirst({
      where: {
        followingId: databaseSelf.id,
        followerId: otherUser.id,
      },
    });

    if (followExists?.id) {
      throw new Error("Already Followed");
    }

    const follow = await db.follow.create({
      data: {
        followingId: databaseSelf.id,
        followerId: otherUser.id,
      },
      include: {
        follower: true,
      },
    });

    return follow;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const unFollowAUser = async (userId: string) => {
  try {
    const self = await currentUser();
    const databaseSelf = await db.user.findFirst({
      where: { externalUserId: self?.id },
    });
    if (!self?.id || !databaseSelf?.id) {
      throw new Error(
        "Current User Does Not Exists || Current User Does Not Exist In Database"
      );
    }
    const otherUser = await db.user.findFirst({ where: { id: userId } });

    if (!otherUser) {
      throw new Error("Other User Does Not Exists");
    }

    const followExists = await db.follow.findFirst({
      where: {
        followingId: databaseSelf.id,
        followerId: otherUser.id,
      },
    });

    if (!followExists?.id) {
      throw new Error("Follow Model Does Not Exist , So Error In Deleting");
    }

    const follow = await db.follow.delete({
      where: {
        followingId: databaseSelf.id,
        followerId: otherUser.id,
      },
      include: {
        follower: true,
      },
    });

    return follow;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
