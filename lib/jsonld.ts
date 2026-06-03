import type { Exit, Layoff } from "./schema";
import { formatMoney } from "./format";

const BASE = "https://vibeslop.ceo";

/** Site-level schema for the home page. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "vibeslop.ceo",
    url: BASE,
    description:
      "Two leaderboards for the AI era: solo-owned, bootstrapped, AI-built companies that sold, and CEOs who cut staff citing AI.",
  };
}

function itemList(name: string, elements: { name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: elements.length,
    itemListElement: elements.map((el, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: el.name,
    })),
  };
}

/** One ItemList per year that has exit entries. */
export function exitSchemas(byYear: { year: number; exits: Exit[] }[]) {
  return byYear
    .filter((y) => y.exits.length > 0)
    .map((y) =>
      itemList(
        `The Exit Club — ${y.year}`,
        y.exits.map((e) => ({
          name: `${e.name} — ${e.company} (${formatMoney(e.exit_amount_usd)})`,
        })),
      ),
    );
}

/** One ItemList per year that has layoff entries. */
export function layoffSchemas(byYear: { year: number; layoffs: Layoff[] }[]) {
  return byYear
    .filter((y) => y.layoffs.length > 0)
    .map((y) =>
      itemList(
        `The Layoff Board — ${y.year}`,
        y.layoffs.map((l) => ({
          name: `${l.ceo_name} — ${l.company}`,
        })),
      ),
    );
}
