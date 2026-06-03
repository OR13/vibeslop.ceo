import type { Metadata } from "next";
import { Boards } from "@/components/boards";
import { JsonLd } from "@/components/json-ld";
import { getExitsByYear, getLayoffsByYear } from "@/lib/data";
import { exitSchemas, layoffSchemas, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const exitYears = getExitsByYear();
  const layoffYears = getLayoffsByYear();

  return (
    <div className="space-y-8">
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
          2026 — pick a board.
        </p>
      </section>

      <Boards exitYears={exitYears} layoffYears={layoffYears} />
    </div>
  );
}
