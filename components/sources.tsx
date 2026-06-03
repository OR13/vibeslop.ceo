import type { Source } from "@/lib/schema";

/** Inline list of citations: "Source: TechCrunch · Reuters". */
export function Sources({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <div className="text-muted-foreground mt-1 text-xs">
      <span className="font-medium">Source{sources.length > 1 ? "s" : ""}: </span>
      {sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && " · "}
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {s.label}
          </a>
        </span>
      ))}
    </div>
  );
}
