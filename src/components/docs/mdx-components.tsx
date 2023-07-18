import { cx } from "@/lib/common-utils";
import { AlertTriangle, Code, Cog, Flame, Wrench } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import CraftingRecipe from "./crafting-recipe";
import DataDriven from "./data-driven-tooltip";
import Configurable from "./configurable-tooltip";
import OneToOneRecipe from "./one-to-one-recipe";
import JsonStructure, { JsonDataType, JsonNode } from "./json-structure";
import { ReactNode } from "react";
import LinkTooltip from "./link-tooltip";

const icons = {
  code: <Code size={16}></Code>,
  warn: <AlertTriangle size={16}></AlertTriangle>,
  fire: <Flame size={16}></Flame>,
  wrench: <Wrench size={16}></Wrench>,
};

function idFromChildren(children: ReactNode) {
  return extractTextFromChildren(children)
    .toLowerCase()
    .replaceAll("[object object]", "")
    .replaceAll(/[^a-zA-Z0-9\s]/g, "")
    .trimEnd()
    .trimStart()
    .replaceAll(" ", "-");
}

const isBlockElement = (element: ReactNode): boolean => {
  // Define the block-level element types that you want to ignore
  const blockElements = ['DataDriven', 'Configurable'];

  if (typeof element === 'object' && element !== null) {
    const elementType = (element as any).type ;
    return blockElements.includes(elementType.name);
  }

  return false;
};

const isIterable = (obj: any): boolean => {
  return typeof obj !== 'string' && typeof obj[Symbol.iterator] === 'function';
};

const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }

  if (isIterable(children)) {
    const childArray = Array.from(children as Iterable<ReactNode>);
    return childArray
      .filter(child => !isBlockElement(child))
      .map(child => extractTextFromChildren(child))
      .join(' ');
  }

  if (typeof children === 'object' && children !== null) {
    if (isBlockElement(children)) {
      return '';
    }

    if ((children as any).props && (children as any).props.children) {
      return extractTextFromChildren((children as any).props.children);
    }
  }

  return '';
};


export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <LinkTooltip
      trigger={
        <h1 className="font-display text-4xl font-semibold mt-2" id={idFromChildren(children)}>
          {children}
        </h1>
      }
      link={idFromChildren(children) || ""}
    />
  ),
  h2: ({ children, id }) => (
    <LinkTooltip
      trigger={
        <h2 className="font-display text-2xl font-semibold mt-2" id={idFromChildren(children)}>
          {children}
        </h2>
      }
      link={idFromChildren(children) || ""}
    />
  ),
  h3: ({ children, id }) => (
    <LinkTooltip
      trigger={
        <h3 className="font-display text-xl font-semibold mt-2" id={idFromChildren(children)}>
          {children}
        </h3>
      }
      link={idFromChildren(children) || ""}
    />
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-blue-500">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col list-disc ">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="ml-4">{children}</li>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      width={1600}
      height={1600}
      alt={alt || ""}
      className="w-full h-auto rounded-md"
    />
  ),
  p: ({ children }) => <p className="break-words">{children}</p>,
  code: ({ children }) => (
    <span className="text-lime-400 font-mono bg-slate-800 px-1 py-0.5 rounded-sm shadow-md">
      {children}
    </span>
  ),
  FlexRow: ({ children }) => (
    <div className="flex justify-center gap-4 max-w-full flex-wrap">
      {children}
    </div>
  ),
  LinkButton: ({ link, children, className, icon }) => (
    <a
      href={link}
      className={cx(
        "px-3 py-1 font-semibold font-mono w-32 hover:brightness-110 flex gap-2 items-center justify-center",
        className
      )}
    >
      <div className="shrink-0">{(icons as any)[icon as string]}</div>
      <>{children}</>
    </a>
  ),
  Icon: ({ img, rounded }) => (
    <Image
      src={img}
      width={100}
      height={100}
      alt={img}
      className={cx(
        "h-[1em] w-auto object-contain inline-block mr-[0.125em] mb-0.5",
        rounded ? "rounded-md" : "pixelate"
      )}
    />
  ),
  CraftingRecipe: ({ recipe, small }) => (
    <div className="mx-auto my-4 w-fit">
      <CraftingRecipe path={recipe as string} small={small}></CraftingRecipe>
    </div>
  ),
  OneToOneRecipe: ({ recipe, small }) => (
    <div className="mx-auto my-4 w-fit">
      <OneToOneRecipe path={recipe as string} small={small}></OneToOneRecipe>
    </div>
  ),
  Technical: ({ title, children }) => (
    <div className="bg-gray-800/50 py-2 px-4 flex flex-col rounded-md">
      <div className="flex gap-2 items-center font-display text-gray-300">
        <Cog className="w-[1em] h-[1em]" /> {title}
      </div>
      <div className="py-2 w-full gap-2 flex flex-col">{children}</div>
    </div>
  ),
  DataDriven: ({ children }) => <DataDriven content={children} />,
  Configurable: ({ children, isClient }) => (
    <Configurable content={children} isClient={isClient} />
  ),
  JsonStructure: ({ title, children }) => (
    <JsonStructure title={title}>{children}</JsonStructure>
  ),
  JsonNode: ({ content, children }) => (
    <JsonNode content={content}>{children}</JsonNode>
  ),
  JsonDataType: ({ type }) => <JsonDataType type={type} />,
};
