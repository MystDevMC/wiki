import { getJson } from "@/lib/server-utils";
import Image from "next/image";
import ItemTooltip from "./item-tooltip";
import { cx } from "@/lib/common-utils";

type Item = {
  name: string;
  id: string;
  texture: string;
};

export default async function ItemComponent({
  rl,
  count,
  small,
}: {
  rl: string;
  count?: number;
  small?: boolean;
}) {
  let item: Item;
  if (rl.startsWith("#")) {
    item = (await getJson(
      `/data/items${rlToPath("minecraft:tag")}.json`
    )) as Item;
    item.id = rl;
    item.name = rl;
  } else {
    item = (await getJson(`/data/items${rlToPath(rl)}.json`)) as Item;
  }
  return (
    <ItemTooltip
      content={
        <div className="flex gap-2 items-center px-1">
          <div>
            <Image
              width={100}
              height={100}
              src={`/${item.texture}.png`}
              alt={item.name}
              className="w-8 h-auto pixelate"
            ></Image>
          </div>
          <div>
            <div className="font-display font-semibold">{item.name}</div>
            <div className="font-mono text-gray-500 font-semibold text-sm">
              {item.id}
            </div>
          </div>
        </div>
      }
      trigger={
        <div>
          <Image
            width={100}
            height={100}
            src={`/${item.texture}.png`}
            alt={item.name}
            className={cx("h-auto pixelate", small ? "w-8" : "w-12")}
          ></Image>
          {count ? (
            <div className="relative">
              <div className="absolute bottom-[-0.25em] right-[-0.25em] font-mono text-xl font-bold bg-gray-950/50 rounded-md px-1 leading-tight">
                {count}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      }
    />
  );
}

export function rlToPath(rl: string) {
  return `/${rl.split(":").join("/")}`;
}
