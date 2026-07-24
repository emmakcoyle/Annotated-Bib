import { readFileSync, writeFileSync, existsSync } from "fs";

const files = [
  "content/index.md",
  "content/about.md",
  "content/Sources.md",
  "content/Ideas.md",
  "content/Publications.md",
  "content/Bibliography.md",
  "content/map.md",
];

// Matches the whole legacy <details class="fold-nav-wrap">...</details>
// block, including the summary/svg/nav inside it, non-greedy so it stops
// at the FIRST closing </details> rather than swallowing anything after it.
const pattern = /<details class="fold-nav-wrap">[\s\S]*?<\/details>\s*/g;

for (const f of files) {
  if (!existsSync(f)) {
    console.log(`${f}: file not found — check the path/casing`);
    continue;
  }
  const text = readFileSync(f, "utf8");
  const matches = text.match(pattern);
  if (matches) {
    const newText = text.replace(pattern, "");
    writeFileSync(f, newText);
    console.log(`${f}: removed ${matches.length} block(s)`);
  } else {
    console.log(`${f}: no match found — open it manually and check`);
  }
}