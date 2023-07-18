"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Anchor } from "lucide-react";
import { ReactNode } from "react";

export default function LinkTooltip({
  trigger,
  link,
}: {
  trigger: ReactNode;
  link: string;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild className="hover:cursor-auto">
          {trigger}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={10} side="left" align="center" >
            <a href={"#" + link} className="text-gray-400">
              <div className="p-1">
                <Anchor className="h-[1.5em] w-auto" />
              </div>
            </a>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
