import type { Metadata } from "next";
import { LayoffTable } from "@/components/layoff-table";
import { getLayoffs } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Layoff Board",
  description:
    "CEOs who cut staff and cited AI as the reason — ranked by headcount lost. Every entry is backed by a public source.",
};

export default function LayoffsPage() {
  const layoffs = getLayoffs();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">🪓 The Layoff Board</h1>
      <p className="text-muted-foreground max-w-prose text-sm">
        CEOs who reduced headcount and named AI as a reason. Ranked by people
        cut. Every entry links to the public statement or filing behind it.
      </p>
      <LayoffTable layoffs={layoffs} />
    </div>
  );
}
