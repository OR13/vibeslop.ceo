# vibeslop.ceo

Two leaderboards for the AI-and-labor era:

- **🤖 The Exit Club** — solo founders who built and sold a company **without
  ever hiring anyone**, running on AI instead. Ranked by exit value.
- **🪓 The Layoff Board** — CEOs who cut staff and **cited AI** as the reason.
  Ranked by headcount lost. Every entry links to a public source.

Static site, no backend. Content is plain YAML; the site is rebuilt and
redeployed on every push.

## How it's built

- **Next.js 16** (`output: 'export'`) → fully static HTML/CSS/JS
- **Tailwind + shadcn/ui** for the interface
- **YAML** data in [`data/`](./data), validated at build time with **Zod**
- **GitHub Pages** via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

## Contributing an entry

Each entry is one YAML file. **Which directory it lives in is the claim** —
there are no flags restating it:

- `data/exits/<slug>.yaml` → a solo founder who sold without hiring anyone.
- `data/layoffs/<slug>.yaml` → a CEO who laid off staff citing AI.

Copy the `_example.yaml` in either directory and fill it in. Files starting
with `_` are templates and are ignored by the build.

Validation rules (enforced at build — a bad file fails CI):

- **Layoff entries require at least one `source`.** Every name on that board is
  backed by public record, or it doesn't ship.
- Exit-entry sources are encouraged but optional.
- Dates are `YYYY-MM-DD`; exit amounts are integer USD.

Open a pull request. The build re-validates and the site redeploys on merge.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # validates YAML + emits static site to ./out
```

## Deployment

Pushes to `main` trigger the GitHub Pages workflow, which runs `next build` and
publishes `./out`. Custom domain `vibeslop.ceo` is set via
[`public/CNAME`](./public/CNAME).

One-time setup in the repo: **Settings → Pages → Source = "GitHub Actions"**,
plus the DNS records in your registrar (see below).
