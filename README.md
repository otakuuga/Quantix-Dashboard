# Quantix Dashboard UI Kit

A React + TypeScript + Tailwind UI kit for FinTech dashboards with themed analytics, high-volume transaction tables, and KYC onboarding flows.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (typically `http://localhost:5173`).

## Change the primary theme color

Primary accent color is defined in `src/index.css`:

```css
:root {
  --primary: 14 165 233;
}
```

Update the numeric RGB triple to your brand color.

## Clean component exports

All key components are re-exported from `src/components/index.ts` for cleaner imports:

```ts
import { TransactionTable, OverviewChart } from '@/components';
```

If your project does not use the `@` path alias, import from the relative index path instead:

```ts
import { TransactionTable, OverviewChart } from './components';
```

## Included modules

- Session 1: Theme/layout shell
- Session 2: Themed Recharts + virtualized TanStack transactions
- Session 3: KYC wizard with Zod validation and status badges
