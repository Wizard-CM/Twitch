"use server";
import { updateStream } from "@/lib/stream-services";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const Update = async (values: Partial<Stream>) => {
  try {
    const updateStreamData = await updateStream(values);

    revalidatePath("/");
    if (updateStreamData?.id) {
      revalidatePath(`/u/${updateStreamData?.user.username}/chat`);
      revalidatePath(`/u/${updateStreamData?.user.username}`);
      revalidatePath(`/${updateStreamData?.user.username}`);
    }
  } catch (error) {
    console.log(error);
  }
};
