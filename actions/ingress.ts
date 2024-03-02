"use server"
import { db } from "@/lib/db";
import { getSelf } from "@/lib/user-services";
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

// Provides feature for creating a room as well as deleting a room and other serverices
// In this code it is used for resetting the rooms that belongs to the host
const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);
// In this code , it is used for creating ingress and reseting ingress that belongs to the host
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });
  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};
export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();
  await resetIngress(self?.id!);
  const options: CreateIngressOptions = {
    name: self?.username,
    roomName: self?.id,
    participantName: self?.username,
    participantIdentity: self?.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress.ingressId || !ingress.streamKey || !ingress.url) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: { userId: self?.id },
    data: {
      ingressId: ingress.ingressId,
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
    },
  });

  revalidatePath(`/u/${self?.username}/keys`);
  return ingress;
};
