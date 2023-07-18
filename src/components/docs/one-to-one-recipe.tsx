import { getJson } from "@/lib/server-utils";
import ItemComponent from "./item";
import { MoveRight } from "lucide-react";
import { cx } from "@/lib/common-utils";
import { Slot } from "./crafting-recipe";

enum RecipeType {
  SMOKING,
}

type RawRecipe = {
  type: string;
  result: string;
  count?: number;
  input: string;
};

type Recipe = {
  type: RecipeType;
  result: string;
  count?: number;
  input: string;
};

export default async function OneToOneRecipe({
  path,
  small,
}: {
  path: string;
  small?: boolean;
}) {
  const rawRecipe = (await getJson(`/data/recipes${path}`)) as RawRecipe;
  const key: keyof typeof RecipeType = rawRecipe.type.toUpperCase() as any;
  const recipe = {
    type: RecipeType[key],
    result: rawRecipe.result,
    count: rawRecipe.count,
    input: rawRecipe.input
  } as Recipe;

  return (
    <div className="flex gap-4 items-center">
      <Slot>
        <ItemComponent rl={recipe.input} count={recipe.count} small={small} />
      </Slot>
      <MoveRight className={cx(small ? "w-4 h-4" : "w-8 h-8")} />
      <Slot>
        <ItemComponent rl={recipe.result} count={recipe.count} small={small} />
      </Slot>
    </div>
  );
}
