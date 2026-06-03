import { Badge } from "@/components/ui/badge";
import { RankBadge } from "@/components/rank-badge";
import { Sources } from "@/components/sources";
import type { Exit, Layoff } from "@/lib/schema";
import { formatMoney, formatMonth } from "@/lib/format";

/**
 * Shared card row. A flex layout (not a <table>) so long blurbs/quotes wrap
 * instead of forcing a horizontal scrollbar. `min-w-0` lets the text column
 * shrink and wrap; the metric stays pinned on the right.
 */
function Row({
  rank,
  title,
  subtitle,
  metric,
  date,
  children,
}: {
  rank: number;
  title: string;
  subtitle: string;
  metric: string;
  date: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 py-4 first:pt-0">
      <div className="pt-0.5">
        <RankBadge rank={rank} />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground"> · {subtitle}</span>
          </div>
          <span className="shrink-0 font-mono font-semibold tabular-nums">
            {metric}
          </span>
        </div>
        {children}
        <div className="text-muted-foreground text-xs">{formatMonth(date)}</div>
      </div>
    </li>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
      {children}
    </div>
  );
}

export function ExitList({ exits }: { exits: Exit[] }) {
  if (exits.length === 0) {
    return (
      <Empty>
        No verified entries yet this year. Know a solo-owned, bootstrapped,
        AI-built company that sold? Open a PR.
      </Empty>
    );
  }
  return (
    <ol className="divide-y">
      {exits.map((e) => (
        <Row
          key={e.id}
          rank={e.rank}
          title={e.name}
          subtitle={e.acquirer ? `${e.company} → ${e.acquirer}` : e.company}
          metric={e.exit_amount_usd ? formatMoney(e.exit_amount_usd) : "undisclosed"}
          date={e.date}
        >
          <p className="text-sm break-words">{e.blurb}</p>
          {e.ai_tools.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {e.ai_tools.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          )}
          <Sources sources={e.sources} />
        </Row>
      ))}
    </ol>
  );
}

function cut(l: Layoff): string {
  if (l.layoff_count && l.percent)
    return `${l.layoff_count.toLocaleString()} · ${l.percent}%`;
  if (l.layoff_count) return l.layoff_count.toLocaleString();
  if (l.percent) return `${l.percent}%`;
  return "—";
}

export function LayoffList({ layoffs }: { layoffs: Layoff[] }) {
  if (layoffs.length === 0) {
    return <Empty>No verified entries yet this year.</Empty>;
  }
  return (
    <ol className="divide-y">
      {layoffs.map((l) => (
        <Row
          key={l.id}
          rank={l.rank}
          title={l.ceo_name}
          subtitle={l.company}
          metric={cut(l)}
          date={l.date}
        >
          <p className="text-sm break-words">{l.blurb}</p>
          <blockquote className="text-muted-foreground border-l-2 pl-3 text-sm break-words italic">
            “{l.ai_quote}”
          </blockquote>
          <Sources sources={l.sources} />
        </Row>
      ))}
    </ol>
  );
}
