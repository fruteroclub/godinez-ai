# Godínez.AI — Project Context

## Overview
Landing page for Godínez.AI — AI employee for Latin American SMBs. Built with Next.js 15, Tailwind CSS, TypeScript.

**Live:** https://godinez-ai.vercel.app  
**Repo:** fruteroclub/godinez-ai

## Phase Status

| Phase | Status | Description |
|-------|--------|-------------|
| 0     | ✅     | Initial landing page (basic) |
| 1     | 🔨     | Bold UI Redesign — atrevida/maker aesthetic |

## Current Phase: 1 — Bold UI Redesign

**Goal:** Transform safe/generic landing into bold, professional design with:
- Vibrant color palette: magenta (#E91E8C), violet (#8B5CF6), gold (#FFB800), black (#0A0A0A), cream (#FFF9F5)
- Typography: Plus Jakarta Sans (headers), Playfair Display (italics only)
- SVG illustrations instead of emojis
- Animations: glitch, pulse-glow, gradient-shift
- Professional but energetic ("maker" audience)

### Ticket Status

| Ticket | Name | Status | Branch |
|--------|------|--------|--------|
| 1.1 | globals.css + animations | ⬜ | feat/1.1-globals |
| 1.2 | Hero redesign | ⬜ | feat/1.2-hero |
| 1.3 | ProblemSection + SVG icons | ⬜ | feat/1.3-problem |
| 1.4 | WhatIsSection redesign | ⬜ | feat/1.4-whatis |
| 1.5 | CapabilitiesSection + illustrations | ⬜ | feat/1.5-capabilities |
| 1.6 | PricingSection bold | ⬜ | feat/1.6-pricing |
| 1.7 | WaitlistForm + effects | ⬜ | feat/1.7-waitlist |
| 1.8 | Navbar + Footer | ⬜ | feat/1.8-nav-footer |
| 1.9 | Integration + polish | ⬜ | feat/1.9-integration |

## Architecture Rules

- ✅ Next.js 15 App Router (NO pages/, use app/)
- ✅ Tailwind CSS for styling (NO CSS modules)
- ✅ TypeScript strict mode
- ✅ Push directly to main for this redesign session
- ⚠️ DO NOT add webpack config (Next.js 15 uses Turbopack)
- ⚠️ Keep component files focused — one component per file

## Commands

```bash
npm run dev      # Dev server on :3000
npm run build    # Production build (MUST pass before push)
npm run lint     # ESLint check
tsc --noEmit     # Type check
```

## Documentation Index

- `docs/phases/PHASE-1-REDESIGN.md` — Full phase spec
- `src/lib/content.ts` — All copy/text content
- `tailwind.config.ts` — Theme config (colors, fonts)

## Design System

### Colors (add to tailwind.config.ts)
```js
colors: {
  magenta: '#E91E8C',
  violet: '#8B5CF6', 
  gold: '#FFB800',
  dark: '#0A0A0A',
  cream: '#FFF9F5',
}
```

### Fonts
- **Headers:** Plus Jakarta Sans (font-medium weight)
- **Italics only:** Playfair Display (font-semibold)
- Already configured in layout.tsx

## Known Issues

- ⚠️ Claude Code hit 32k token limit — work in smaller batches
- ⚠️ Previous attempt stashed: `git stash pop` to recover partial work

## Last Commit Log

```
(stashed) WIP: claude code partial redesign
- globals.css + 8 components partially updated
- +554/-100 lines but session killed before commit
```
