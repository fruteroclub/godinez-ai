# Godínez.AI — Project Context

## Overview
Landing page for Godínez.AI — AI employee for Latin American SMBs. Built with Next.js 15, Tailwind CSS, TypeScript.

**Live:** https://godinez-ai.vercel.app  
**Repo:** fruteroclub/godinez-ai

## Phase Status

| Phase | Status | Description |
|-------|--------|-------------|
| 0     | ✅     | Initial landing page (basic) |
| 1     | ✅     | Bold UI Redesign — atrevida/maker aesthetic |

## Phase 1 Complete: Bold UI Redesign

**Goal achieved:** Transformed safe/generic landing into bold, professional design with:
- Vibrant color palette: magenta (#E91E8C), violet (#8B5CF6), gold (#FFB800), black (#0A0A0A)
- Typography: Plus Jakarta Sans (headers), Playfair Display (italics only)
- Custom SVG illustrations instead of emojis throughout
- Animations: pulse-glow, float, gradient-shift
- Dark mode aesthetic with vibrant accents
- Professional but energetic ("maker" audience)

### Ticket Status — All Complete ✅

| Ticket | Name | Commit | Changes |
|--------|------|--------|---------|
| 1.1 | globals.css + animations | 5ce3ff3 | +4 animations, +6 utilities |
| 1.2 | Hero redesign | ded6317 | +131/-42, SVG robot, dark bg |
| 1.3 | ProblemSection + SVG icons | a2791e3 | +125/-21, 3 custom icons |
| 1.4 | WhatIsSection redesign | 39c5c05 | +159/-24, animated chat icon |
| 1.5 | CapabilitiesSection | 5e9b3ad | +115/-20, 8 unique icons |
| 1.6 | PricingSection bold | d8cfba6 | +103/-55, gradient borders |
| 1.7 | WaitlistForm + effects | a254da7 | +185/-113, success animation |
| 1.8 | Navbar + Footer | 9930fee | +82/-17, glass effect, logos |
| 1.9 | Integration + polish | — | This commit |

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

## Design System (Implemented)

### Colors
```js
colors: {
  magenta: '#E91E8C',
  violet: '#8B5CF6', 
  gold: '#FFB800',
  dark: '#0A0A0A',
  cream: '#FFF9F5',
}
```

### Custom SVG Icons
- Hero: Robot with briefcase, animated eyes
- Problem: MoneyIcon, MoonClockIcon, ChecklistIcon
- WhatIs: ChatIcon, ChartIcon, AutomationIcon
- Capabilities: 8 unique icons
- Navbar/Footer: RobotLogo with animated eyes

### Animations (globals.css)
- `animate-glitch` — subtle text glitch
- `animate-pulse-glow` — pulsing glow for CTAs
- `animate-gradient-shift` — moving gradient
- `animate-float` — gentle floating

### Utility Classes
- `.bg-gradient-brand` — magenta to violet
- `.text-gradient-brand` — gradient text
- `.glow-magenta` / `.glow-violet` — box shadows

## Fonts
- **Headers:** Plus Jakarta Sans (font-medium weight)
- **Italics only:** Playfair Display (font-semibold)
- Configured in layout.tsx
