"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Year switcher for a leaderboard. `panels` arrive newest-first (server-rendered
 * tables passed as children across the RSC boundary); the first one is the
 * default selected tab, so the latest year is always the "current" board.
 */
export function YearTabs({
  panels,
}: {
  panels: { year: number; node: React.ReactNode }[];
}) {
  if (panels.length === 0) return null;
  const latest = String(panels[0].year);

  return (
    <Tabs defaultValue={latest} className="w-full">
      <TabsList>
        {panels.map((p, i) => (
          <TabsTrigger key={p.year} value={String(p.year)}>
            {p.year}
            {i === 0 && (
              <span className="text-muted-foreground ml-1.5 text-xs">current</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((p) => (
        <TabsContent key={p.year} value={String(p.year)} className="pt-4">
          {p.node}
        </TabsContent>
      ))}
    </Tabs>
  );
}
