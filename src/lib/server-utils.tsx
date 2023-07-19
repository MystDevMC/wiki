import { promises as fs } from "fs";

export async function getData(path: string) {
    return require(`data/${path}`);
 }