"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export default function ItemTooltip({
  trigger,
  content,
}: {
  trigger: ReactNode;
  content: ReactNode;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger className="cursor-default">{trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={10}>
            <div className="bg-gray-950/90 p-2 border-2 rounded-md border-blue-700 shadow-md backdrop-blur-sm">
              {content}
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
