import { z } from "zod";

/**
 * A single citation backing a claim on the site. We keep it as a labeled URL so
 * the UI can render "Source: TechCrunch" rather than a bare link.
 */
export const SourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

const SocialLinks = z
  .object({
    x: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    site: z.string().url().optional(),
  })
  .partial()
  .optional();

/**
 * The Exit Club — solo founders who built and sold a company without ever
 * hiring anyone, using only AI.
 *
 * The category is defined by the directory: every file in data/exits/ IS such a
 * founder. There is no per-record boolean asserting that — curation is the
 * enforcement. These are just the descriptive fields the board renders.
 * `ai_tools` optionally lists what they used instead of staff.
 */
export const ExitSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  exit_amount_usd: z.number().int().positive(),
  acquirer: z.string().min(1).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  blurb: z.string().min(1),
  ai_tools: z.array(z.string().min(1)).default([]),
  links: SocialLinks,
  sources: z.array(SourceSchema).default([]),
});

/**
 * The Layoff Board — CEOs who carried out AI-attributed layoffs.
 * `sources` is REQUIRED (min 1): every accusation is backed by public record,
 * or the build fails. `ai_quote` captures where AI was tied to the cuts.
 */
export const LayoffSchema = z.object({
  ceo_name: z.string().min(1),
  company: z.string().min(1),
  layoff_count: z.number().int().positive().optional(),
  percent: z.number().min(0).max(100).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  ai_quote: z.string().min(1),
  blurb: z.string().min(1),
  links: SocialLinks,
  sources: z.array(SourceSchema).min(1, "layoff entries require ≥1 source"),
});

export type Source = z.infer<typeof SourceSchema>;
export type Exit = z.infer<typeof ExitSchema> & { id: string; rank: number };
export type Layoff = z.infer<typeof LayoffSchema> & { id: string; rank: number };
