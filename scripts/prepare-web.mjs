import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "www");
const excluded = new Set([".git", "node_modules", "desktop", "android", "www", "scripts", "dist", ".github", ".idea", ".vscode"]);
await mkdir(output, { recursive: true });

async function copyTree(source, destination, topLevel = false) {
  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    if (topLevel && excluded.has(entry.name)) continue;
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await mkdir(to, { recursive: true });
      await copyTree(from, to, false);
    } else if (!entry.name.endsWith(".map") && entry.name !== "package-lock.json") {
      await cp(from, to);
    }
  }
}
await copyTree(root, output, true);
console.log("Prepared Feather web assets in ./www");
