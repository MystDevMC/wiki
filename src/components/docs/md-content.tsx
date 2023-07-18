"use client";

import sanitizeHtml from "sanitize-html";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Element, domToReact } from "html-react-parser";

export default function MDContent({
  unsanitizedMD,
}: {
  unsanitizedMD: string;
}) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const children = domToReact(domNode.children, options);

        if (domNode.tagName === "h1") {
          return (
            <h1 className="mt-2">
              <span className="font-mono text-3xl font-semibold bg-lime-600 py-1 px-2 rounded-md leading-tight">
                {children}
              </span>
            </h1>
          );
        }

        if (domNode.tagName === "h2") {
          return (
            <h2 className="mt-2 font-display text-2xl font-semibold">
              {children}
            </h2>
          );
        }

        if (domNode.tagName === "h3") {
          return (
            <h3 className="mt-2 font-display text-xl font-semibold">
              {children}
            </h3>
          );
        }

        if (domNode.tagName === "code") {
          return (
            <code className="text-lime-400 font-mono bg-slate-800 px-1 py-0.5 rounded-sm shadow-md">
              {children}
            </code>
          );
        }
        if (domNode.tagName === "li") {
          return <li className="ml-4 list-disc">{children}</li>;
        }
        if (domNode.tagName === "a") {
          return (
            <a href={domNode.attribs.href} className="text-blue-500">
              {children}
            </a>
          );
        }
      }
    },
  };
  const contents = parse(sanitizeHtml(unsanitizedMD), options);

  return <ul className="flex flex-col gap-6">{contents}</ul>;
}
