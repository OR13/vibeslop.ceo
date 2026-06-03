import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import {
  ExitSchema,
  LayoffSchema,
  type Exit,
  type Layoff,
} from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Read every *.yaml file in data/<dir>, validate each against `schema`, and
 * return the parsed objects tagged with their filename-derived id. Files
 * beginning with "_" (e.g. _example.yaml) are treated as templates and skipped.
 *
 * Validation throws on the first bad file, which fails `next build` — that is
 * the enforcement mechanism for "layoff entries require a source".
 */
function loadDir<T>(dir: string, schema: { parse: (x: unknown) => T }): (T & { id: string })[] {
  const full = path.join(DATA_DIR, dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((f) => /\.ya?ml$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const id = file.replace(/\.ya?ml$/, "");
      try {
        return { ...schema.parse(parse(raw)), id };
      } catch (err) {
        throw new Error(
          `Invalid data file data/${dir}/${file}:\n${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    });
}

/** Solo-founder exits, ranked by exit value (largest first). */
export function getExits(): Exit[] {
  return loadDir("exits", ExitSchema)
    .sort((a, b) => b.exit_amount_usd - a.exit_amount_usd)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

/**
 * AI-attributed layoffs, ranked by headcount cut (largest first); entries with
 * no count fall back to percent, then sink to the bottom.
 */
export function getLayoffs(): Layoff[] {
  return loadDir("layoffs", LayoffSchema)
    .sort((a, b) => (b.layoff_count ?? 0) - (a.layoff_count ?? 0))
    .map((l, i) => ({ ...l, rank: i + 1 }));
}
