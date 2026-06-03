import Link from "next/link";
import { ExitTable } from "@/components/exit-table";
import { LayoffTable } from "@/components/layoff-table";
import { Separator } from "@/components/ui/separator";
import { getExits, getLayoffs } from "@/lib/data";

export default function Home() {
  const exits = getExits();
  const layoffs = getLayoffs();

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The AI labor leaderboards
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Two sides of the same coin. On one side, solo founders who built and
          sold a company on AI alone — never hiring a single human. On the
          other, the CEOs who cut human staff and named AI as the reason.
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
          Solo founders who sold without ever hiring anyone, ranked by exit
          value.
        </p>
        <ExitTable exits={exits} />
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
        <LayoffTable layoffs={layoffs} />
      </section>
    </div>
  );
}
