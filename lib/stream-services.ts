import { Stream } from "@prisma/client";
import { db } from "./db";
import { getSelf } from "./user-services";

export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findFirst({ where: { userId } });

  return stream;
};

export const updateStream = async (values: Partial<Stream>) => {
  const self = await getSelf();
  if (!self?.id) return;

  const stream = await db.stream.findFirst({ where: { userId: self.id } });
  if (!stream?.id) return;

  // const updateData = {};

 const updateData = await db.stream.update({
    where: { id: stream.id },
    data: {
      ...values,
    },
    include:{
      user:true
    }
  });
  return updateData;
};

// {isChatEnabled : true / false}
