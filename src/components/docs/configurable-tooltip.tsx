"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Settings } from "lucide-react";
import { ReactNode } from "react";

export default function Configurable({
  content,
  isClient,
}: {
  content: ReactNode;
  isClient?: boolean;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger className="inline-flex align-middle cursor-default">
          <div className="bg-gray-800 text-blue-200 rounded-md p-1 h-[1em] min-h-[24px]">
            <Settings className="w-auto h-full" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={10}>
            <div className="bg-gray-950/90 backdrop-blur-sm p-4 border-2 rounded-md border-blue-700 shadow-md max-w-xs w-max">
              <div className="font-mono mb-2 text-blue-500 flex gap-2 items-center leading-tight">
                <Settings className="w-4 h-4" />
                CONFIGURABLE
                <div className="font-mono text-sm text-gray-500">
                  @{!isClient ? "common" : "client"}-side
                </div>
              </div>
              <div className="text-sm">
              {content}
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
