import { Badge } from "@/components/ui/badge";
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
import type { Exit } from "@/lib/schema";
import { formatMoney, formatMonth } from "@/lib/format";

export function ExitTable({ exits }: { exits: Exit[] }) {
  if (exits.length === 0) {
    return (
      <EmptyState>
        No verified entries yet. Know a founder who built and sold a company on
        AI alone — never hiring a soul? Open a PR.
      </EmptyState>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Founder</TableHead>
          <TableHead className="text-right">Exit</TableHead>
          <TableHead className="hidden sm:table-cell">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exits.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="align-top">
              <RankBadge rank={e.rank} />
            </TableCell>
            <TableCell className="align-top">
              <div className="font-medium">{e.name}</div>
              <div className="text-muted-foreground text-sm">
                {e.company}
                {e.acquirer && ` → ${e.acquirer}`}
              </div>
              <div className="mt-1 max-w-prose text-sm">{e.blurb}</div>
              {e.ai_tools.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {e.ai_tools.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              <Sources sources={e.sources} />
            </TableCell>
            <TableCell className="text-right align-top font-mono font-semibold tabular-nums">
              {formatMoney(e.exit_amount_usd)}
            </TableCell>
            <TableCell className="text-muted-foreground hidden align-top text-sm whitespace-nowrap sm:table-cell">
              {formatMonth(e.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
      {children}
    </div>
  );
}
