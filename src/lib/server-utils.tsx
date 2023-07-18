import { promises as fs } from "fs";

export async function getJson(path: string) {
    return JSON.parse(await fs.readFile(process.cwd() + path, "utf-8"));
 }