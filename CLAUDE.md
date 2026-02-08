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
bun install      # Install dependencies
bun run dev      # Dev server on :3000
bun run build    # Production build — MUST pass before deploying
bun run start    # Start production server
```

**Note:** No `lint` script configured. Use `tsc --noEmit` for type checking.

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

### Data Persistence
- Waitlist submissions saved to `data/waitlist.json` (local file storage)
- Directory created automatically if missing
- **For production:** Replace with proper database

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

1. **Styling:** Tailwind CSS only — NO CSS modules, NO styled-components
2. **Content:** All text strings go in `src/lib/content.ts` for i18n support
3. **TypeScript:** Strict mode enabled — all types required
4. **Components:** One component per file, client components marked with `"use client"`
5. **Build validation:** Always run `bun run build` before pushing

## Documentation

- `docs/phases/PHASE-1-REDESIGN.md` — Complete Phase 1 spec and ticket breakdown
- `README.md` — Quick start guide and deployment info
- `tailwind.config.ts` — Design tokens reference (actual theme in `globals.css`)

## Deployment

Configured for Vercel automatic deployments:
- Connect GitHub repo to Vercel project
- Push to `main` branch triggers production deploy
- Preview deployments on all branches
