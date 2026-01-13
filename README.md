# BC Newspaper

A React-based frontend for displaying BitCraft regional newspaper editions.

## Configuration

### Environment Variables

- `VITE_API_BASE_URL`: Base origin for the generator worker API (no trailing slash). Example: `https://your-generator.workers.dev`
  - If empty or undefined, requests will use same-origin (useful for development with proxy)
  - In production, set this to your deployed generator worker URL

- `VITE_DEV_API_PROXY_TARGET`: Optional dev-only proxy target (e.g., `http://localhost:8788`)
  - Only used when running `npm run dev`; not used in production builds
  - If set, proxies `/api` requests to this target during development

Copy `env` to `.env` and configure as needed.

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
