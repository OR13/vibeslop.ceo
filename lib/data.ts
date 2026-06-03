import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import {
  ExitSchema,
  LayoffSchema,
  BOARD_YEARS,
  type BoardYear,
  type Exit,
  type Layoff,
} from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Read every *.yaml file in data/<dir>, validate each against `schema`, and
 * return the parsed objects tagged with their filename-derived id and the
 * calendar year of their `date`. Files beginning with "_" (e.g. _example.yaml)
 * are templates and skipped.
 *
 * Validation throws on the first bad file, which fails `next build` — that is
 * the enforcement mechanism for "layoff entries require a source".
 */
function loadDir<T extends { date: string }>(
  dir: string,
  schema: { parse: (x: unknown) => T },
): (T & { id: string; year: number })[] {
  const full = path.join(DATA_DIR, dir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((f) => /\.ya?ml$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const id = file.replace(/\.ya?ml$/, "");
      try {
        const parsed = schema.parse(parse(raw));
        return { ...parsed, id, year: Number(parsed.date.slice(0, 4)) };
      } catch (err) {
        throw new Error(
          `Invalid data file data/${dir}/${file}:\n${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    });
}

/** Rank a within-year slice 1..n by `score` (desc) after the caller sorts it. */
function ranked<T>(rows: T[]): (T & { rank: number })[] {
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

/**
 * Solo-owned/bootstrapped/AI-built exits for `year`, ranked by exit value.
 * Anything dated outside BOARD_YEARS is simply never surfaced.
 */
export function getExits(year: BoardYear): Exit[] {
  return ranked(
    loadDir("exits", ExitSchema)
      .filter((e) => e.year === year)
      .sort((a, b) => b.exit_amount_usd - a.exit_amount_usd),
  );
}

/**
 * AI-attributed layoffs for `year`, ranked by headcount cut (count first, then
 * percent as a tiebreak/fallback).
 */
export function getLayoffs(year: BoardYear): Layoff[] {
  return ranked(
    loadDir("layoffs", LayoffSchema)
      .filter((l) => l.year === year)
      .sort(
        (a, b) =>
          (b.layoff_count ?? 0) - (a.layoff_count ?? 0) ||
          (b.percent ?? 0) - (a.percent ?? 0),
      ),
  );
}

/** All exit boards keyed by year, newest first — for the year switcher. */
export function getExitsByYear(): { year: BoardYear; exits: Exit[] }[] {
  return BOARD_YEARS.map((year) => ({ year, exits: getExits(year) }));
}

/** All layoff boards keyed by year, newest first — for the year switcher. */
export function getLayoffsByYear(): { year: BoardYear; layoffs: Layoff[] }[] {
  return BOARD_YEARS.map((year) => ({ year, layoffs: getLayoffs(year) }));
}
