# BC Newspaper

A React-based frontend for displaying BitCraft regional newspaper editions.

## Frontend

**BC Codex News** is a static React site that renders published BitCraft regional "newspaper edition" documents fetched from the generator public API. The frontend is presentation-first: it treats the edition document as render-ready and avoids adding business logic.

### Quick Start

```bash
npm install
npm run dev
```

The app will start on `http://localhost:5173` (or the next available port).

### Environment Variables

- `VITE_API_BASE_URL`: Base origin for the generator worker API (no trailing slash)
  - **Local dev**: `http://localhost:8788` (or leave empty for same-origin)
  - **Production**: `https://your-generator.workers.dev`

Copy `.env.example` to `.env` and configure as needed. The default Vite config does not include an API proxy; requests go directly to `VITE_API_BASE_URL`.

### Opening a Specific Edition

The app supports one URL query parameter for deep linking:

- `?region=<id>` - Region ID (1–9). Defaults to Region 1 if missing or invalid. Back/forward navigation updates the region from the URL.

Date is controlled only by the date picker (local state); it is not in the URL. The date control defaults to today, or the minimum edition date (2026-01-15) if today is before that.

Example: `http://localhost:5173/?region=3` opens Region 3; use the date control to pick the edition date.

### Documentation

For detailed frontend documentation, see:

- **[Frontend Overview](docs/frontend/OVERVIEW.md)** - Start here: UI mental model, routing, data flow, component map
- **[Theme and Tokens](docs/frontend/THEME_AND_TOKENS.md)** - Theme system, token separation (chrome vs paper), paper tokens
- **[Style Rules](docs/frontend/STYLE_RULES.md)** - Layout bans, masthead rules, typography scope, accessibility
- **[Markdown](docs/MARKDOWN.md)** - Markdown rendering contract (MarkdownText, MainStoryBody, supported subset)

## Configuration

### Environment Variables

- `VITE_API_BASE_URL`: Base origin for the generator worker API (no trailing slash). Example: `https://your-generator.workers.dev`
  - If empty or undefined, requests use relative URLs (same-origin)
  - In production, set this to your deployed generator worker URL

Copy `.env.example` to `.env` and configure as needed.

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run lint
```
