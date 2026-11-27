import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One line, 1-240 characters, in the voice of the Moon answering back at
// last to the wishes, howls and late-night promises aimed at it.
// The earplugs gag was a quick joke; the birthday line is wryer and older —
// four billion years of granting wishes, and nobody ever wished the Moon
// anything back. It sounds like the Moon, and the turn lands in one read.
const ENTRY =
  "Four billion years of wishes, and not one of you has ever wished me a happy birthday.";

const HERE = dirname(fileURLToPath(import.meta.url));

// The entry text is also kept in entry.txt next to this script. If it is
// present it must agree with the embedded entry; if it is absent (for
// example a harness that copies only main.ts) the embedded text is used.
let TEXT = ENTRY;
const entryPath = join(HERE, "entry.txt");
if (existsSync(entryPath)) {
  const fromFile = readFileSync(entryPath, "utf8").trim();
  if (fromFile.length > 0 && fromFile !== ENTRY) {
    throw new Error("entry.txt does not match the entry embedded in main.ts");
  }
}

if (TEXT.length < 1 || TEXT.length > 240) {
  throw new Error(`entry must be 1-240 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote ${TEXT.length} characters to ${join(outDir, "entry.txt")}`);
