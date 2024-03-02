"use client";
import React, { useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createIngress } from "@/actions/ingress";
import { IngressInput } from "livekit-server-sdk";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const DialogBox = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const [selectValue, setSelectValue] = useState<IngressType>(RTMP);

  // Handlers
  const generateHandler = () => {
    startTransition(() => {
      createIngress(parseInt(selectValue))
        .then((data) => {
          closeRef.current?.click();
          toast.success("Ingress Created Successfully");
        })
        .catch((error) => {
          toast.error("Ingress Created Successfully");
        });
    });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-[#61ffff] font-semibold text-[#000000cc] p-2 sm:px-4 sm:py-2 rounded-md">
            Generate Connection
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Connection</DialogTitle>
          </DialogHeader>
          <Select
            onValueChange={(value) => {
              setSelectValue(value);
            }}
          >
            <SelectTrigger className="w-full my-3">
              <SelectValue placeholder="Connection Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RTMP">RTMP</SelectItem>
              <SelectItem value="WHIP">WHIP</SelectItem>
            </SelectContent>
          </Select>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning !</AlertTitle>
            <AlertDescription>
              This Will Reset All Active Stream Using The Current Connection
            </AlertDescription>
          </Alert>

          <div className="flex justify-between w-full mt-3">
            <DialogClose ref={closeRef}>
              <Button variant={"customButton"}>Cancel</Button>
            </DialogClose>
            <Button
              variant={"customButton"}
              disabled={isPending}
              onClick={generateHandler}
            >
              Generate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
