import { promises as fs } from "fs";
import MDX from "@/components/docs/mdx-wrapper";
import { cx } from "@/lib/common-utils";
import MD from "@/components/docs/md-wrapper";
import { envSensitivePath } from "@/lib/server-utils";

// TODO Refactor this
async function parseListJson(name: string) {
  const data = await fs.readFile(envSensitivePath(name + "/list.json"), "utf8");
  const elements: JSX.Element[] = [];
  const addtional = {
    changelogLink: "",
  };
  var json = JSON.parse(data);
  Object.keys(json).forEach((key) => {
    if (key === "Changelog") {
      elements.push(
        <li>
          <a href={`/${name}/changelog`}>{key}</a>
        </li>
      );
      addtional.changelogLink = json[key];
    } else if (json[key] === "index") {
      elements.push(
        <li>
          <a href={`/${name}`}>{key}</a>
        </li>
      );
    } else if (json[key] instanceof Array) {
      elements.push(
        <li className="flex flex-col gap-4">
          <div>{key}</div>
          <ul className="flex flex-col gap-4 pl-4">
            {parseListContent(name, json[key])}
          </ul>
        </li>
      );
    } else {
      var e = json[key];
      elements.push(
        <li>
          <a href={`/${name}/${e["docs"]}`}>{key}</a>
        </li>
      );
    }
  });
  return { links: elements, addtional: addtional };
}

function parseListContent(section: string, list: any[]) {
  const elements: JSX.Element[] = [];
  list.forEach((e) => {
    elements.push(
      <li>
        <a href={`/${section}/${e["docs"]}`}>{e["title"]}</a>
      </li>
    );
  });
  return elements;
}

export default async function SectionPage({
  params,
}: {
  params: { section: string; content: string[] };
}) {
  const result = await parseListJson(params.section);
  const docsDir =
    params.section + (params.content ? "/" + params.content.join("/") : "");
  const isChangelog = params.content && params.content[0] === "changelog";
  return (
    <div className="flex gap-8 w-full p-8">
      <ul className="w-[200px] shrink-0 flex flex-col gap-4">
        <div className="font-mono text-xl">
          {params.section}
          <div className="w-full h-[1px] rounded-full bg-slate-700 mb-2"></div>
        </div>
        {result.links}
      </ul>
      <div
        className={cx(
          "leading-loose",
          "max-h-[calc(100vh-8rem)] h-auto overflow-auto",
          "shrink w-full flex flex-col gap-6 px-32",
          "scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-w-2 scroll-smooth"
        )}
      >
        {!isChangelog ? (
          <MDX section={docsDir} />
        ) : (
          <MD url={result.addtional.changelogLink} />
        )}

        <div className="h-8 w-full shrink-0"></div>
      </div>
    </div>
  );
}
