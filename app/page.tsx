import type { Metadata } from "next";
import { ExitTable } from "@/components/exit-table";
import { LayoffTable } from "@/components/layoff-table";
import { JsonLd } from "@/components/json-ld";
import { getExitsByYear, getLayoffsByYear } from "@/lib/data";
import { exitSchemas, layoffSchemas, websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** A year's slice of a board: small year header + the table, no interaction. */
function YearBlock({
  year,
  current,
  children,
}: {
  year: number;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2 border-b pb-1">
        <h3 className="font-mono text-sm font-semibold tabular-nums">{year}</h3>
        {current && (
          <span className="text-muted-foreground text-xs">current</span>
        )}
      </div>
      {children}
    </div>
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

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <section id="exits" className="space-y-5">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">🤖 Exits</h2>
            <p className="text-muted-foreground text-sm">
              Solo-owned, bootstrapped, AI-built companies that sold — ranked by
              exit value.
            </p>
          </header>
          {exitYears.map(({ year, exits }, i) => (
            <YearBlock key={year} year={year} current={i === 0}>
              <ExitTable exits={exits} />
            </YearBlock>
          ))}
        </section>

        <section id="layoffs" className="space-y-5">
          <header className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">🪓 Layoffs</h2>
            <p className="text-muted-foreground text-sm">
              CEOs who cut staff and named AI as the reason — ranked by headcount
              lost, each backed by a public source.
            </p>
          </header>
          {layoffYears.map(({ year, layoffs }, i) => (
            <YearBlock key={year} year={year} current={i === 0}>
              <LayoffTable layoffs={layoffs} />
            </YearBlock>
          ))}
        </section>
      </div>
    </>
  );
}
