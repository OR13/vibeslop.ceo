import type { Metadata } from "next";
import { ExitList, LayoffList } from "@/components/leaderboard";
import { JsonLd } from "@/components/json-ld";
import { getExitsByYear, getLayoffsByYear } from "@/lib/data";
import { exitSchemas, layoffSchemas, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = { alternates: { canonical: "/" } };

function BoardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-muted-foreground border-b pb-2 text-xs font-semibold tracking-wider uppercase">
      {children}
    </h3>
  );
}

export default function Home() {
  const exitYears = getExitsByYear();
  const layoffYears = getLayoffsByYear();

  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          ...exitSchemas(exitYears),
          ...layoffSchemas(layoffYears),
        ]}
      />

      <div className="space-y-16">
        {exitYears.map(({ year, exits }, i) => (
          <section key={year} className="space-y-6">
            <div className="text-center">
              <h2 className="font-mono text-3xl font-bold tracking-tight tabular-nums">
                {year}
              </h2>
              {i === 0 && (
                <p className="text-muted-foreground mt-1 text-xs">current</p>
              )}
            </div>

            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              <div className="space-y-4">
                <BoardHeading>Exits</BoardHeading>
                <ExitList exits={exits} />
              </div>
              <div className="space-y-4">
                <BoardHeading>Layoffs</BoardHeading>
                <LayoffList layoffs={layoffYears[i].layoffs} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
