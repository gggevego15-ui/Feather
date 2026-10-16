import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "www");
const excluded = new Set([".git", "node_modules", "desktop", "android", "www", "scripts", "dist", ".github", ".idea", ".vscode"]);
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".apng"]);
await mkdir(output, { recursive: true });

async function copyTree(source, destination, topLevel = false) {
  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    if (topLevel && (excluded.has(entry.name) || entry.name === "package.json")) continue;
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

const assets = [];
async function scanImages(dir, relative = "") {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = path.posix.join(relative, entry.name);
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", ".git"].includes(entry.name)) await scanImages(absolute, rel);
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      assets.push({ name: entry.name, path: "./" + rel.replaceAll(path.sep, "/") });
    }
  }
}
await scanImages(output);
await writeFile(path.join(output, "asset-manifest.js"), "window.FEATHER_ASSETS = " + JSON.stringify(assets) + ";\n", "utf8");
const buttonAssets = assets.filter(asset => /(buttons?|btn|кноп|animation|anim)/i.test(asset.path + " " + asset.name));
console.log(`Prepared Feather app assets in ./www (${assets.length} images/animations found)`);
console.log(`Button/animation candidates (${buttonAssets.length}): ${buttonAssets.map(asset => asset.path).join(", ") || "none detected by filename"}`);
