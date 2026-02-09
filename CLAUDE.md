# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Landing page for Godínez.AI — AI employee for Latin American SMBs.

**Stack:** Next.js 16, Tailwind CSS 4, TypeScript
**Runtime:** Bun (exclusive — do NOT use npm/yarn/pnpm)
**Live:** https://godinez-ai.vercel.app
**Repo:** fruteroclub/godinez-ai

## Development Commands

```bash
bun install         # Install dependencies
bun run dev         # Dev server on :3000
bun run build       # Production build — MUST pass before deploying
bun run start       # Start production server
bunx convex dev     # Start Convex backend (separate terminal)
tsc --noEmit        # Type checking (no lint script)
```

**Convex Setup:**
1. Install Convex CLI: `bun add -d convex` (already in package.json)
2. Run `bunx convex dev` to initialize and start local development
3. Copy deployment URL to `.env.local` as `NEXT_PUBLIC_CONVEX_URL`
4. Schema and functions in `convex/` directory auto-deploy on save

## Architecture

### Next.js App Router (v16)
- Uses **App Router** (`app/` directory, NOT `pages/`)
- Uses **Turbopack** (Next.js 16 default) — DO NOT add webpack config
- Server components by default; add `"use client"` only when needed

### Component Structure
- **Page:** `src/app/page.tsx` → renders `HomePage` component
- **Layout:** `src/app/layout.tsx` → configures fonts, metadata, root HTML
- **Components:** `src/components/*.tsx` — one component per file
- **Content:** `src/lib/content.ts` — ALL user-facing text (i18n-ready)
- **API:** `src/app/api/waitlist/route.ts` — waitlist form handler

### Landing Page Flow
```
HomePage (orchestrator)
├── Navbar
├── Hero
├── ProblemSection
├── BridgeSection
├── WhatIsSection
├── PricingSection
├── CapabilitiesSection
├── WaitlistForm
└── Footer
```

### Data Persistence (Convex Backend)
- **Primary:** Convex database (serverless backend)
  - Schema: `convex/schema.ts` — defines `waitlist` table with indexes
  - Functions: `convex/waitlist.ts` — mutations (`add`) and queries (`count`, `list`)
  - API route: `src/app/api/waitlist/route.ts` — calls Convex mutation via `ConvexHttpClient`
- **Configuration:** Requires `NEXT_PUBLIC_CONVEX_URL` env var
  - If not set, API route falls back to console logging
  - Get URL from Convex dashboard or by running `bunx convex dev`
- **Development workflow:**
  - Run `bunx convex dev` in separate terminal to start Convex backend
  - Schema changes in `convex/` auto-deploy to development deployment
  - Use Convex MCP tools for querying data during development

## Design System

### Colors (Brand Identity)
Defined in `src/app/globals.css` via `@theme inline`:
- **magenta:** `#E91E8C` (primary accent)
- **violet:** `#8B5CF6` (secondary)
- **gold:** `#FFB800` (highlights, CTAs)
- **dark:** `#0A0A0A` (main background)
- **charcoal:** `#1A1A1A` (card backgrounds)
- **cream:** `#FFF9F5` (unused currently, full dark mode)

### Typography
- **Headers + body:** Plus Jakarta Sans (default)
- **Italics/emphasis only:** Playfair Display
- Configured in `layout.tsx` using `next/font/google`

### Animations
All keyframes in `globals.css`:
- `animate-glitch` — subtle text displacement with color shadows
- `animate-pulse-glow` — pulsing glow for CTAs
- `animate-gradient-shift` — moving gradient backgrounds
- `animate-float` — gentle floating for SVG illustrations
- `animate-fade-in-up` — scroll-triggered entrance

### Custom Utility Classes
Defined in `globals.css`:
- `.bg-gradient-brand` — magenta to violet
- `.text-gradient-brand` — gradient text effect
- `.glow-magenta` / `.glow-violet` / `.glow-gold` — box shadows
- `.delay-{100-800}` — staggered animation delays

### SVG Illustrations
All icons are **inline SVGs** (no external files) with:
- Custom colors matching brand palette
- SMIL animations (e.g., pulsing eyes, rotating gears)
- Hover state transitions

## Key Rules

1. **Package Manager:** Bun only — enforced via `packageManager` field in package.json
2. **Styling:** Tailwind CSS only — NO CSS modules, NO styled-components
3. **Content:** All text strings go in `src/lib/content.ts` for i18n support
4. **TypeScript:** Strict mode enabled — all types required
5. **Components:** One component per file, client components marked with `"use client"`
6. **Backend:** Convex for all data operations — schema changes require `convex/schema.ts` updates
7. **Build validation:** Always run `bun run build` before pushing

## Development Tools

### Convex MCP Integration
Claude Code has access to Convex MCP tools for inspecting and managing the backend:
- `mcp__convex__status` — List deployments (dev/prod) with URLs
- `mcp__convex__tables` — View schema and table structure
- `mcp__convex__data` — Query table data with pagination
- `mcp__convex__run` — Execute Convex functions (queries, mutations, actions)
- `mcp__convex__logs` — Fetch execution logs
- `mcp__convex__runOneoffQuery` — Run ad-hoc read-only queries

**Usage:** These tools are available when helping debug waitlist issues, verify data structure, or test backend functionality.

## Documentation

- `docs/phases/PHASE-1-REDESIGN.md` — Complete Phase 1 spec and ticket breakdown
- `README.md` — Quick start guide and deployment info
- `tailwind.config.ts` — Design tokens reference (actual theme in `globals.css`)

## Deployment

### Vercel (Frontend)
- Connect GitHub repo to Vercel project
- Push to `main` branch triggers production deploy
- Preview deployments on all branches
- Add `NEXT_PUBLIC_CONVEX_URL` to Vercel environment variables

### Convex (Backend)
- Production deployment: `bunx convex deploy`
- Get production URL and update Vercel env vars
- Convex Cloud manages database, schema migrations, and function deployments
- No additional server infrastructure needed
