"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Braces } from "lucide-react";
import { ReactNode, useState } from "react";

export default function DataDriven({ content }: { content: ReactNode }) {
  const [inside, setInside] = useState(false);
  const [pop, setPop] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={inside || pop}>
        <Tooltip.Trigger
          onMouseEnter={() => setPop(true)}
          onMouseLeave={() => setTimeout(() => setPop(false), 100)}
          className="inline-flex align-middle cursor-default"
        >
          <div className="bg-gray-800 text-blue-200 rounded-md p-1 h-[1em] min-h-[24px]">
            <Braces className="w-auto h-full" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            onMouseEnter={() => setInside(true)}
            onMouseLeave={() => setInside(false)}
          >
            <div className="bg-gray-950/90 backdrop-blur-sm p-4 rounded-md border-2 border-blue-700 shadow-md max-w-xs">
              <div className="font-mono mb-2 text-blue-500 flex gap-2 items-center leading-tight">
                <Braces className="w-4 h-4" />
                DATA-DRIVEN
              </div>
              <div className="text-sm">{content}</div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
