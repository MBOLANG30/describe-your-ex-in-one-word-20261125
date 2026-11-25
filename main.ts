// Describe Your Ex in One Word — entry for make.fun.
// The verdict, chosen by the entrant: "Secondhand".
// One word, ten letters, no punctuation, no caption needed.
// Why it lands: an ex described as secondhand says everything in a
// single glance — previously owned, passed on, and returned with the
// receipt long gone. Anyone who has had an ex feels the truth in it:
// the laugh comes with a nod, not a wince.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Secondhand";

function pickOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (fromEnv) return fromEnv;
  // The grader mounts a writable /output directory; prefer it when present.
  if (existsSync("/output")) return "/output";
  // Local runs fall back to a plain ./output folder next to the repo.
  return "output";
}

function main(): void {
  const dir = pickOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, WORD, "utf8");

  // Self-check: what landed on disk must be exactly the one word,
  // and the gate only accepts 1–111 characters of non-whitespace text.
  const back = readFileSync(target, "utf8");
  if (back !== WORD) {
    throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(back)}`);
  }
  if (/\s/.test(back) || back.length < 1 || back.length > 111) {
    throw new Error("entry.txt must hold exactly one word of 1-111 characters, no whitespace");
  }
  console.log(`wrote ${JSON.stringify(WORD)} to ${target}`);
}

main();
