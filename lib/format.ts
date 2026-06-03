/** $575,000,000 -> "$575M", $3,200,000 -> "$3.2M", $2,500,000,000 -> "$2.5B". */
export function formatMoney(usd: number): string {
  if (usd >= 1_000_000_000) return `$${trim(usd / 1_000_000_000)}B`;
  if (usd >= 1_000_000) return `$${trim(usd / 1_000_000)}M`;
  if (usd >= 1_000) return `$${trim(usd / 1_000)}K`;
  return `$${usd}`;
}

/** Drop a trailing ".0" so 3.0 -> "3" but keep 3.2 -> "3.2". */
function trim(n: number): string {
  return n.toFixed(1).replace(/\.0$/, "");
}

/** "2015-07-14" -> "Jul 2015". */
export function formatMonth(iso: string): string {
  const [y, m] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number(m) - 1] ?? "?"} ${y}`;
}
