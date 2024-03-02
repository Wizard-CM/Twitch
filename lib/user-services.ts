import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { User } from "@prisma/client";

export const getAllRecommendedUsers = async () => {
  // await new Promise((r) => {
  //   setTimeout(r, 5000);
  // });
  const self = await currentUser();
  const dbSelf = await db.user.findFirst({
    where: { externalUserId: self?.id },
  });
  const allUsers = await db.user.findMany({
    where: {
      AND: [
        { NOT: { externalUserId: self?.id } },
        { NOT: { Follower: { some: { followingId: dbSelf?.id } } } },
        { NOT: { blocker: { some: { blockingId: dbSelf?.id } } } },
      ],
    },
    include: {
      stream: { select: { isLive: true } },
    },
  });
  return allUsers;
};

export const getUserByUserName = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
      include: {
        stream: true,
        _count: {
          select: {
            Follower: true,
          },
        },
      },
    });

    if (!user?.id) {
      throw new Error("User Not Found , Username is Incorrect");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getSelf = async () => {
  const self = await currentUser();

  const databaseSelf = await db.user.findFirst({
    where: { externalUserId: self?.id },
  });

  return databaseSelf;
};

// Jasle block garyo , teskoma tyo block gareko user dekhinu paryo , later for unblocking purposes.
// Jaslai block garyo , tesma tyo block garne user lai nadekhaune.
