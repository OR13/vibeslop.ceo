"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YearTabs } from "@/components/year-tabs";
import { ExitTable } from "@/components/exit-table";
import { LayoffTable } from "@/components/layoff-table";
import type { Exit, Layoff } from "@/lib/schema";

type ExitYears = { year: number; exits: Exit[] }[];
type LayoffYears = { year: number; layoffs: Layoff[] }[];

const BOARDS = ["exits", "layoffs"] as const;
type Board = (typeof BOARDS)[number];

function boardFromHash(): Board {
  if (typeof window === "undefined") return "exits";
  const h = window.location.hash.replace(/^#/, "");
  return (BOARDS as readonly string[]).includes(h) ? (h as Board) : "exits";
}

/**
 * Single-page board switcher. The visible leaderboard is driven by the URL
 * hash (#exits / #layoffs) so it's deep-linkable and back-button friendly;
 * within each board, YearTabs handles 2025 vs 2026.
 */
export function Boards({
  exitYears,
  layoffYears,
}: {
  exitYears: ExitYears;
  layoffYears: LayoffYears;
}) {
  // Start on the default; sync from the hash after mount to avoid an SSR/CSR
  // mismatch (the server has no window.location).
  const [board, setBoard] = useState<Board>("exits");

  useEffect(() => {
    setBoard(boardFromHash());
    const onHash = () => setBoard(boardFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Drive selection through the hash so the URL is the source of truth.
  const select = (value: string) => {
    if (window.location.hash !== `#${value}`) window.location.hash = value;
    else setBoard(value as Board);
  };

  return (
    <Tabs value={board} onValueChange={select} className="w-full">
      <TabsList>
        <TabsTrigger value="exits">🤖 Exit Club</TabsTrigger>
        <TabsTrigger value="layoffs">🪓 Layoff Board</TabsTrigger>
      </TabsList>

      <TabsContent value="exits" className="space-y-4 pt-6">
        <p className="text-muted-foreground max-w-prose text-sm">
          Solo-owned, bootstrapped, AI-built companies that sold for a
          multi-million exit. Ranked by exit value.
        </p>
        <YearTabs
          panels={exitYears.map(({ year, exits }) => ({
            year,
            node: <ExitTable exits={exits} />,
          }))}
        />
      </TabsContent>

      <TabsContent value="layoffs" className="space-y-4 pt-6">
        <p className="text-muted-foreground max-w-prose text-sm">
          CEOs who cut staff and named AI as the reason. Ranked by headcount
          lost; every entry links to a public source.
        </p>
        <YearTabs
          panels={layoffYears.map(({ year, layoffs }) => ({
            year,
            node: <LayoffTable layoffs={layoffs} />,
          }))}
        />
      </TabsContent>
    </Tabs>
  );
}
