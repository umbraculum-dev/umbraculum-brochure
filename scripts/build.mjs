import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const pub = join(root, "public");
const announcementSrc = join(root, "announcement.config.json");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(pub, dist, { recursive: true });

writeFileSync(
  join(dist, "announcement.config.json"),
  readFileSync(announcementSrc, "utf8"),
  "utf8",
);

console.log(`@umbraculum/brochure: copied ${pub} + announcement.config.json -> ${dist}`);
