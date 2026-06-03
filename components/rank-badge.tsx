/** Plain numeric rank: #1, #2, … */
export function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className="text-muted-foreground inline-flex items-center justify-center font-mono text-sm tabular-nums"
      aria-label={`rank ${rank}`}
    >
      #{rank}
    </span>
  );
}
