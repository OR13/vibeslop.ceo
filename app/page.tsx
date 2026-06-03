import Link from "next/link";
import { ExitTable } from "@/components/exit-table";
import { LayoffTable } from "@/components/layoff-table";
import { YearTabs } from "@/components/year-tabs";
import { JsonLd } from "@/components/json-ld";
import { Separator } from "@/components/ui/separator";
import { getExitsByYear, getLayoffsByYear } from "@/lib/data";
import { exitSchemas, layoffSchemas, websiteSchema } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const exitYears = getExitsByYear();
  const layoffYears = getLayoffsByYear();

  return (
    <div className="space-y-12">
      <JsonLd
        data={[
          websiteSchema(),
          ...exitSchemas(exitYears),
          ...layoffSchemas(layoffYears),
        ]}
      />
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The AI labor leaderboards
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Two sides of the same coin. On one side, solo-owned, bootstrapped
          founders who built and sold a company on AI. On the other, the CEOs
          who cut human staff and named AI as the reason. Tracking 2025 and
          2026.
        </p>
      </section>

      <section className="space-y-4">
        <header className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">🤖 The Exit Club</h2>
          <Link
            href="/exits"
            className="text-muted-foreground text-sm hover:underline underline-offset-4"
          >
            full board →
          </Link>
        </header>
        <p className="text-muted-foreground text-sm">
          Solo-owned, bootstrapped, AI-built companies that sold, ranked by exit
          value.
        </p>
        <YearTabs
          panels={exitYears.map(({ year, exits }) => ({
            year,
            node: <ExitTable exits={exits} />,
          }))}
        />
      </section>

      <Separator />

      <section className="space-y-4">
        <header className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">🪓 The Layoff Board</h2>
          <Link
            href="/layoffs"
            className="text-muted-foreground text-sm hover:underline underline-offset-4"
          >
            full board →
          </Link>
        </header>
        <p className="text-muted-foreground text-sm">
          CEOs who cut staff citing AI, ranked by headcount lost.
        </p>
        <YearTabs
          panels={layoffYears.map(({ year, layoffs }) => ({
            year,
            node: <LayoffTable layoffs={layoffs} />,
          }))}
        />
      </section>
    </div>
  );
}
