#!/usr/bin/env node
// Refreshes reads/saves counts on publication-type notes sourced from
// The Olive Branch Review, which prints "This post has been read X
// times and saved Y times" directly in each post's own page HTML.
// Run as a build step before `npx quartz build` (see deploy.yml) so
// the numbers update automatically on the existing 8-hour schedule.
//
// This can't be done client-side in the browser: olivebranchreview.com
// sends no Access-Control-Allow-Origin header (confirmed directly --
// fetched a live page and checked the response header), so a
// cross-origin fetch from the deployed site would be blocked by CORS.
// A server-side fetch from this CI runner has no such restriction,
// since CORS is a browser-enforced policy, not a server-side one.
//
// Only touches notes that already have BOTH an external_url pointing
// at olivebranchreview.com AND an existing `reads:` frontmatter field
// -- so it can't accidentally touch the Musée Magazine notes or
// anything else that doesn't carry this data.

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = "content";

async function findMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(full)));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function extractField(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : null;
}

async function scrapeCounts(url) {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  fetch failed (${res.status}): ${url}`);
    return null;
  }
  const html = await res.text();
  const match = html.match(
    /This post has been read ([\d,]+) times? and saved ([\d,]+) times?/i
  );
  if (!match) {
    console.warn(`  no reads/saves text found on page: ${url}`);
    return null;
  }
  return {
    reads: parseInt(match[1].replace(/,/g, ""), 10),
    saves: parseInt(match[2].replace(/,/g, ""), 10),
  };
}

async function main() {
  const files = await findMarkdownFiles(CONTENT_DIR);
  let updated = 0;
  let checked = 0;

  for (const file of files) {
    const text = await readFile(file, "utf-8");
    const frontmatterEnd = text.indexOf("\n---", 4);
    if (!text.startsWith("---") || frontmatterEnd === -1) continue;

    const frontmatter = text.slice(0, frontmatterEnd);
    const externalUrlRaw = extractField(frontmatter, "external_url");
    const hasReadsField = /^reads:/m.test(frontmatter);
    if (!externalUrlRaw || !hasReadsField) continue;

    const externalUrl = externalUrlRaw.replace(/^"|"$/g, "");
    if (!externalUrl.includes("olivebranchreview.com")) continue;

    checked++;
    console.log(`Checking ${file}`);
    const counts = await scrapeCounts(externalUrl);
    if (!counts) continue;

    let next = text;
    next = next.replace(/^reads:.*$/m, `reads: ${counts.reads}`);
    next = next.replace(/^saves:.*$/m, `saves: ${counts.saves}`);

    if (next !== text) {
      await writeFile(file, next, "utf-8");
      updated++;
      console.log(`  -> reads: ${counts.reads}, saves: ${counts.saves}`);
    } else {
      console.log(`  -> unchanged (reads: ${counts.reads}, saves: ${counts.saves})`);
    }
  }

  console.log(`Done. Checked ${checked} Olive Branch Review note(s), updated ${updated}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});