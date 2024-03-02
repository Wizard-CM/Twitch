import React from "react";
import { KeysItem } from "./keys-item";
import { getSelf } from "@/lib/user-services";
import { getStreamByUserId } from "@/lib/stream-services";
import { Button } from "@/components/ui/button";
import { DialogBox } from "./dialog";

export const Keys = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id!);
  return (
    <div className="p-6">
      <div className=" flex flex-col sm:flex-row items-start sm:items-center sm:justify-between  w-full mb-6">
        <h2 className="font-semibold text-xl sm:text-3xl mb-2 sm:mb-0">Keys & URLs</h2>
        <DialogBox />
      </div>
      <KeysItem label="Server URL" value={stream?.serverUrl!} />
      <KeysItem label="Stream Key" value={stream?.streamKey!} showFeature={true} />
    </div>
  );
};
