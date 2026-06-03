import type { Metadata } from "next";
import { ExitTable } from "@/components/exit-table";
import { YearTabs } from "@/components/year-tabs";
import { JsonLd } from "@/components/json-ld";
import { getExitsByYear } from "@/lib/data";
import { exitSchemas } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The Exit Club",
  description:
    "Solo-owned, bootstrapped, AI-built companies that sold for a multi-million exit — ranked by exit value, for 2025 and 2026.",
  alternates: { canonical: "/exits" },
};

export default function ExitsPage() {
  const exitYears = getExitsByYear();
  return (
    <div className="space-y-4">
      <JsonLd data={exitSchemas(exitYears)} />
      <h1 className="text-2xl font-bold tracking-tight">🤖 The Exit Club</h1>
      <p className="text-muted-foreground max-w-prose text-sm">
        Solo-owned, bootstrapped, AI-built companies — one founder, no outside
        funding, product built on AI — that sold for a multi-million exit.
        Ranked by exit value.
      </p>
      <YearTabs
        panels={exitYears.map(({ year, exits }) => ({
          year,
          node: <ExitTable exits={exits} />,
        }))}
      />
    </div>
  );
}
