# Quantix Dashboard UI Kit

## Session 1: Core Architecture & Theme

This iteration focuses on:
- a robust `ThemeProvider` with light/dark/system mode persistence
- responsive dashboard shell (`Sidebar` + `TopNav` + `DashboardLayout`)
- centralized TypeScript contracts in `src/types/fintech.ts`

## Structure

- `src/types/fintech.ts` — project-wide interfaces and domain types
- `src/components/theme/*` — theme context and controls
- `src/components/layout/*` — responsive app shell primitives
- `src/config/navigation.ts` — navigation metadata
- `src/data/sessionOneMock.ts` — temporary seed data for Session 1 demo

## Run

```bash
npm install
npm run dev
```
