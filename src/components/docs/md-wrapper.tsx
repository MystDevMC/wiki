import { marked } from 'marked';
import MDContent from './md-content';
import { promises as fs } from "fs";

const fetchMarkdown = async (url: string): Promise<string> => {
  const response = await fetch(url);
  // const response = await fs.readFile(
  //   process.cwd() + "/public/md.txt",
  //   "utf8"
  // );
  const markdown = await response.text();
  // const markdown = response;
  return markdown;
};

export default async function MD({ url, ...props }: { url: string }) {
  const md = marked(await fetchMarkdown(url), {headerIds: false, mangle: false});
  return <MDContent unsanitizedMD={md}/>
}
