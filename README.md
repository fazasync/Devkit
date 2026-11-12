# DevKit

Universal Developer Toolkit — Build faster. Develop smarter.

DevKit is an open-source developer productivity platform that combines frequently used developer utilities into one unified workspace. Processing happens locally in the browser.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Zustand
- Zod
- Vitest

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — start development server.
- `pnpm build` — build for production.
- `pnpm start` — start production server.
- `pnpm lint` — run ESLint.
- `pnpm typecheck` — run TypeScript checks.
- `pnpm test` — run Vitest in watch mode.
- `pnpm test:run` — run Vitest once.

## Project Structure

```
app/            Next.js routes
components/     UI and layout components
config/         Tool registry and categories
hooks/          Reusable React hooks
lib/            Utilities and pure helpers
stores/         Zustand stores
types/          Shared TypeScript types
```

## Privacy

All tool processing runs locally. No tool input is sent to remote services by default.

## License

MIT
```

Call the write tool with the absolute path and the full file contents.<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Created file successfully: D:\ZProject\PROJECT\devkit\README.md