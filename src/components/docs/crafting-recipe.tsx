import { getData } from "@/lib/server-utils";
import ItemComponent from "./item";
import { MoveRight, Shuffle } from "lucide-react";
import { ReactNode } from "react";
import { cx } from "@/lib/common-utils";

enum RecipeType {
  SHAPED,
  SHAPELESS,
}

type RawRecipe = {
  type: string;
  pattern: string[];
  result: string;
  count?: number;
  keys: any;
};

type Recipe = {
  type: RecipeType;
  pattern: string[];
  result: string;
  count?: number;
  keys: any;
};

export default async function CraftingRecipe({
  path,
  small,
}: {
  path: string;
  small?: boolean;
}) {
  const rawRecipe = (await getData(`recipes${path}`)) as RawRecipe;
  const key: keyof typeof RecipeType = rawRecipe.type.toUpperCase() as any;
  const recipe = {
    type: RecipeType[key],
    pattern: rawRecipe.pattern,
    keys: rawRecipe.keys,
    result: rawRecipe.result,
    count: rawRecipe.count,
  } as Recipe;

  const items: JSX.Element[] = [];

  recipe.pattern.forEach(async (row, rowIdx) => {
    const rowItems: JSX.Element[] = [];
    row.split("").forEach(async (c, idx) => {
      if (c === " ") {
        rowItems.push(
          <Slot key={String(idx)}>
            <div className={cx(small ? "w-8 h-8" : "w-12 h-12")}></div>
          </Slot>
        );
        return;
      }
      const rl = recipe.keys[c] as string;
      rowItems.push(
        <Slot key={String(idx)}>
          <ItemComponent rl={rl} small={small} />
        </Slot>
      );
    });
    items.push(<div className="flex gap-2" key={String(rowIdx)}>{rowItems}</div>);
  });

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">{items}</div>
      {recipe.type == RecipeType.SHAPED ? (
        <MoveRight className={cx(small ? "w-4 h-4" : "w-8 h-8")} />
      ) : (
        <Shuffle className={cx(small ? "w-4 h-4" : "w-8 h-8")} />
      )}
      <Slot key="result">
        <ItemComponent rl={recipe.result} count={recipe.count} small={small} />
      </Slot>
    </div>
  );
}

export function Slot({ ...props }) {
  return (
    <div className="bg-gray-950/50 p-2 flex items-center justify-center" key={props.key}>
      {props.children}
    </div>
  );
}
