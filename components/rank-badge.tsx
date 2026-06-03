import { cn } from "@/lib/utils";

/** Medal for the top 3, plain "#n" otherwise. */
export function RankBadge({ rank }: { rank: number }) {
  const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-mono tabular-nums",
        medal ? "text-xl" : "text-muted-foreground text-sm",
      )}
      aria-label={`rank ${rank}`}
    >
      {medal ?? `#${rank}`}
    </span>
  );
}
