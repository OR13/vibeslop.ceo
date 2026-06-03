import type { Metadata } from "next";
import { LayoffTable } from "@/components/layoff-table";
import { YearTabs } from "@/components/year-tabs";
import { JsonLd } from "@/components/json-ld";
import { getLayoffsByYear } from "@/lib/data";
import { layoffSchemas } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The Layoff Board",
  description:
    "CEOs who cut staff and cited AI as the reason — ranked by headcount lost, for 2025 and 2026. Every entry is backed by a public source.",
  alternates: { canonical: "/layoffs" },
};

export default function LayoffsPage() {
  const layoffYears = getLayoffsByYear();
  return (
    <div className="space-y-4">
      <JsonLd data={layoffSchemas(layoffYears)} />
      <h1 className="text-2xl font-bold tracking-tight">🪓 The Layoff Board</h1>
      <p className="text-muted-foreground max-w-prose text-sm">
        CEOs who reduced headcount and named AI as a reason. Ranked by people
        cut. Every entry links to the public statement or filing behind it.
      </p>
      <YearTabs
        panels={layoffYears.map(({ year, layoffs }) => ({
          year,
          node: <LayoffTable layoffs={layoffs} />,
        }))}
      />
    </div>
  );
}
