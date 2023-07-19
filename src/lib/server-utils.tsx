import { promises as fs } from "fs";
import path from "path";

export async function getJson(path: string) {
    return JSON.parse(await fs.readFile(envSensitivePath(path), "utf-8"));
 }

export function envSensitivePath(relativePath: string) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    let absolutePath;

    if (isDevelopment) {
      // If in development, append the 'public' directory to the path
      absolutePath = path.join(process.cwd(), 'public', relativePath);
    } else {
      // If in production, directly access the file at the root
      absolutePath = path.join(process.cwd(), relativePath);
    }

    return absolutePath;
}