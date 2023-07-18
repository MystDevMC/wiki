"use client";

import { cx } from "@/lib/common-utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Props = {
  link?: string;
  section?: string;
  title: string;
  shortDesc: string;
};

export default function ProjectCard({ ...props }: Props) {
  const zoomable = useRef<HTMLAnchorElement>(null);

  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    zoomable.current?.addEventListener("mouseover", (event) => {
      setZoomed(true);
    });
    zoomable.current?.addEventListener("mouseout", (event) => {
      setZoomed(false);
    });
  });

  return (
    <a
      href={`${props.link || "/" + props.section}`}
      className="transition-all hover:brightness-110"
      ref={zoomable}
    >
      <div className="h-64 bg-gray-800 rounded-md shadow-lg overflow-hidden">
        <div className="relative z-10">
          {props.section ? (
            <Image
              src={`/${props.section}/avatar.png`}
              alt=""
              width={100}
              height={100}
              className="w-24 h-24 rounded-md absolute left-6 top-14 border-4 border-gray-800"
            ></Image>
          ) : (
            <div className="w-24 h-24 rounded-md absolute left-6 top-14 border-4 border-gray-800 bg-gray-700"></div>
          )}
        </div>
        <div className="w-full h-32 overflow-hidden bg-gray-700/50">
          {props.section ? (
            <Image
              src={`/${props.section}/cover.png`}
              alt=""
              width={1600}
              height={1600}
              className={cx(
                "object-cover transition-all",
                zoomed ? "scale-110 rotate-[-3deg]" : ""
              )}
              priority={true}
            ></Image>
          ) : (
            <></>
          )}
        </div>
        <div className="p-7 flex flex-col gap-2 mt-1">
          <span className="font-display font-medium text-2xl">
            {props.title}
          </span>
          <div className="text-gray-400 italic flex-shrink">
            {props.shortDesc}
          </div>
        </div>
      </div>
    </a>
  );
}
