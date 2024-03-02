import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export enum Sides {
  Left = "left",
  Right = "right",
  Bottom = "bottom",
  Top = "top",
}

interface TooTipProps {
  children: React.ReactNode;
  label: string;
  side: Sides;
}

export const ToolTip = ({ children, label, side }: TooTipProps) => {
  return (
    <>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side={side} className="p-3">
            <p className="font-semibold text-[1rem]">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
