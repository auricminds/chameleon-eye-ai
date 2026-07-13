/**
 * Generates placeholder PWA icons (no copyrighted assets).
 * Run: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

const svg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="#020706"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.28}" fill="#0b1110" stroke="#1fae82" stroke-width="${size * 0.02}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.1}" fill="#1fae82"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.04}" fill="#06110D"/>
</svg>`;

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const size of [192, 512]) {
    const buf = await sharp(Buffer.from(svg(size))).png().toBuffer();
    await writeFile(join(outDir, `icon-${size}.png`), buf);
    await writeFile(join(outDir, `icon-${size}-maskable.png`), buf);
  }
  await writeFile(join(outDir, "icon.svg"), svg(512));

  const tauriDir = join(__dirname, "../src-tauri/icons");
  await mkdir(tauriDir, { recursive: true });
  for (const size of [32, 128, 256, 512]) {
    const buf = await sharp(Buffer.from(svg(size))).png().toBuffer();
    await writeFile(join(tauriDir, size === 256 ? "128x128@2x.png" : `${size}x${size}.png`), buf);
  }
  // Minimal copies for bundle (replace with `tauri icon` for production)
  await writeFile(join(tauriDir, "icon.png"), await sharp(Buffer.from(svg(512))).png().toBuffer());
  console.log("Icons written to public/icons/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
