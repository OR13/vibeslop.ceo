import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RankBadge } from "@/components/rank-badge";
import { Sources } from "@/components/sources";
import type { Layoff } from "@/lib/schema";
import { formatMonth } from "@/lib/format";

function cut(l: Layoff): string {
  if (l.layoff_count && l.percent) return `${l.layoff_count.toLocaleString()} (${l.percent}%)`;
  if (l.layoff_count) return l.layoff_count.toLocaleString();
  if (l.percent) return `${l.percent}%`;
  return "—";
}

export function LayoffTable({ layoffs }: { layoffs: Layoff[] }) {
  if (layoffs.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
        No verified entries yet.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>CEO</TableHead>
          <TableHead className="text-right">Cut</TableHead>
          <TableHead className="hidden sm:table-cell">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {layoffs.map((l) => (
          <TableRow key={l.id}>
            <TableCell className="align-top">
              <RankBadge rank={l.rank} />
            </TableCell>
            <TableCell className="align-top">
              <div className="font-medium">{l.ceo_name}</div>
              <div className="text-muted-foreground text-sm">{l.company}</div>
              <div className="mt-1 max-w-prose text-sm">{l.blurb}</div>
              <blockquote className="text-muted-foreground mt-1.5 border-l-2 pl-3 text-sm italic">
                “{l.ai_quote}”
              </blockquote>
              <Sources sources={l.sources} />
            </TableCell>
            <TableCell className="text-right align-top font-mono font-semibold tabular-nums">
              {cut(l)}
            </TableCell>
            <TableCell className="text-muted-foreground hidden align-top text-sm whitespace-nowrap sm:table-cell">
              {formatMonth(l.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
