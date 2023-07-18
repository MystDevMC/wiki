"use client"

import { cx } from "@/lib/common-utils";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Box, Brackets, Dot, FileText, Hash, Percent, Text } from "lucide-react";

export default function JsonStructure({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) {
  return (
    <ul className="p-4 bg-gray-800/50 rounded-md leading-snug pb-6">
      <div className="flex gap-2 items-center font-display text-gray-300">
        <FileText className="w-[1em] h-[1em]" />
        {title}
      </div>
      <div className="font-mono font-semibold text-gray-500 mt-2">root</div>
      {children}
    </ul>
  );
}

export function JsonNode({
  content,
  children,
}: {
  content: JSX.Element;
  children?: JSX.Element;
}) {
  return (
    <li
      className={cx(
        `pl-4 ml-2 relative`,
        `before:border-b-2 before:content-[""] before:absolute before:top-0 before:left-[-1px]`,
        ` before:w-3 before:h-[1.5em] before:border-gray-600 last:before:border-l-2 last:before:left-[-2px]`,
        `border-l-2 border-gray-600`,
        `last:border-transparent pt-2 text-sm`
      )}
    >
      {content}
      {children ? <ul className="pt-2">{children}</ul> : <></>}
    </li>
  );
}

export const dataType = {
  boolean: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex rounded-sm">
        <div className="bg-green-500 w-full"></div>
        <div className="bg-rose-600 w-full"></div>
      </div>
    ),
    desc: "True/False",
  },
  string: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex bg-gray-500 p-1 rounded-sm">
        <Text className="w-full h-full"/>
      </div>
    ),
    desc: "Text",
  },
  int: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex bg-orange-500 p-1 rounded-sm">
        <Hash className="w-full h-full"/>
      </div>
    ),
    desc: "Full Number",
  },
  float: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex bg-amber-500 p-1 rounded-sm">
        <Percent className="w-full h-full"/>
      </div>
    ),
    desc: "Floating Point Number",
  },
  array: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex bg-purple-500 p-1 rounded-sm">
        <Brackets className="w-full h-full"/>
      </div>
    ),
    desc: "Array of Objects",
  },
  obj: {
    icon: (
      <div className="w-[1.5em] h-[1.5em] flex bg-blue-600 p-1 rounded-sm">
        <Box className="w-full h-full"/>
      </div>
    ),
    desc: "Object",
  },
};

export function JsonDataType({ type }: { type: string }) {
  return <Tooltip.Provider delayDuration={0}>
    <Tooltip.Root>
      <Tooltip.Trigger className="inline-block align-bottom cursor-default mr-0.5">
        {dataType[type as keyof typeof dataType].icon}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={5} side="left">
          <div className="bg-gray-950/90 px-2 py-1 leading-tight border-2 rounded-md border-blue-700 shadow-md backdrop-blur-sm text-sm">
            {dataType[type as keyof typeof dataType].desc}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>;
}
