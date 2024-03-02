import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { getSelf } from "./user-services";

export const isBlockerByLoggedInUser = async (userId: string) => {
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

    const otherUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!otherUser?.id) {
      throw new Error("Other User Does Not Exists");
    }

    const block = await db.block.findFirst({
      where: {
        blockerId: databaseSelf.id,
        blockingId: otherUser.id,
      },
    });

    if (block?.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Needed to check if the viewer of the stream is blocked by the stream Host
export const isBlockedByUser = async (userId: string) => {
  try {
    const self = await getSelf();

    if (!self?.id) {
      throw new Error(
        "Current User Does Not Exists || Current User Does Not Exist In Database"
      );
    }

    const otherUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!otherUser?.id) {
      throw new Error("Other User Does Not Exists");
    }

    const block = await db.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockingId: self.id,
      },
    });

    if (block?.id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const blockAUser = async (userId: string) => {
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

    const otherUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!otherUser?.id) {
      throw new Error("Other User Does Not Exists");
    }

    const blockExists = await db.block.findFirst({
      where: {
        blockerId: databaseSelf.id,
        blockingId: userId,
      },
    });

    if (blockExists?.id) {
      throw new Error("Block Already Exists");
    }
    const block = await db.block.create({
      data: {
        blockerId: databaseSelf.id,
        blockingId: userId,
      },
      include: {
        blocking: true,
      },
    });
    return block;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const unBlockAUser = async (userId: string) => {
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

    const otherUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!otherUser?.id) {
      throw new Error("Other User Does Not Exists");
    }

    const blockExists = await db.block.findFirst({
      where: {
        blockerId: databaseSelf.id,
        blockingId: userId,
      },
    });

    if (!blockExists?.id) {
      throw new Error("Block Does Not Exists");
    }
    const unBlock = await db.block.delete({
      where: {
        blockerId: databaseSelf.id,
        blockingId: userId,
      },
      include: {
        blocking: true,
      },
    });
    return unBlock;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self?.id,
    },
    include: {
      blocking: true,
    },
  });

  return blockedUsers;
};