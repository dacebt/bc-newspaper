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
- `VITE_DEV_API_PROXY_TARGET`: Optional dev-only proxy target (e.g., `http://localhost:8788`)
  - Only used when running `npm run dev`; not used in production builds

Copy `.env.example` to `.env` and configure as needed.

### Opening a Specific Edition

The app supports URL query parameters to open a specific edition:

- `?region=<id>` - Region ID (1-9). Defaults to Region 1 if missing or invalid.
- `?date=YYYY-MM-DD` - Edition date. Defaults to today's date if missing.

Example: `http://localhost:5173/?region=3&date=2024-01-15`

### Documentation

For detailed frontend documentation, see:

- **[Frontend Overview](docs/frontend/OVERVIEW.md)** - Start here: UI mental model, routing, data flow, component map
- **[Theme and Tokens](docs/frontend/THEME_AND_TOKENS.md)** - Theme system, token separation (chrome vs paper), paper tokens
- **[Style Rules](docs/frontend/STYLE_RULES.md)** - Layout bans, masthead rules, typography scope, accessibility

## Configuration

### Environment Variables

- `VITE_API_BASE_URL`: Base origin for the generator worker API (no trailing slash). Example: `https://your-generator.workers.dev`
  - If empty or undefined, requests will use same-origin (useful for development with proxy)
  - In production, set this to your deployed generator worker URL

- `VITE_DEV_API_PROXY_TARGET`: Optional dev-only proxy target (e.g., `http://localhost:8788`)
  - Only used when running `npm run dev`; not used in production builds
  - If set, proxies `/api` requests to this target during development

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
