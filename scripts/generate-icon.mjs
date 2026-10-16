import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const out = path.join(root, "build");
await mkdir(out, { recursive: true });
const svg = await readFile(path.join(root, "icon.svg"));
const png = await sharp(svg).resize(256, 256).png().toBuffer();
await writeFile(path.join(out, "icon.png"), png);
const sizes = [16, 24, 32, 48, 64, 128, 256];
const icons = await Promise.all(sizes.map(size => sharp(svg).resize(size, size).png().toBuffer()));
await writeFile(path.join(out, "icon.ico"), await pngToIco(icons));
console.log("Generated Feather PNG and Windows ICO icons.");
