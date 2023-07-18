import { useMDXComponent } from "next-contentlayer/hooks";
import { mdxComponents } from "./mdx-components";
import { allDocs } from "contentlayer/generated";

export default function MDX({ section }: { section: string }) {
  const doc = allDocs.filter((doc) => doc.url === "/docs/" + section).pop();
  const MDX = useMDXComponent(doc?.body.code || "");
  return (
    <>
      <div className="w-full h-0 relative -mb-6">
        <div className="font-mono p-1 rounded-sm absolute right-0 bg-lime-600 leading-tight text-sm top-5">{doc?.version}</div>
      </div>
      <MDX components={mdxComponents} />
    </>
  );
}
