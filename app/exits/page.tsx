import type { Metadata } from "next";
import { ExitTable } from "@/components/exit-table";
import { getExits } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Exit Club",
  description:
    "Solo founders who built and sold a company without ever hiring anyone, using only AI — ranked by exit value.",
};

export default function ExitsPage() {
  const exits = getExits();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">🤖 The Exit Club</h1>
      <p className="text-muted-foreground max-w-prose text-sm">
        Solo founders who built and sold a company without ever hiring a single
        human being, running on AI instead. Ranked by exit value.
      </p>
      <ExitTable exits={exits} />
    </div>
  );
}
