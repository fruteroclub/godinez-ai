# Phase 1: Bold UI Redesign

**Goal:** Transform generic landing into bold, atrevida/maker aesthetic

## Design Direction

### Palette
- **Magenta:** #E91E8C (primary accent)
- **Violet:** #8B5CF6 (secondary)
- **Gold:** #FFB800 (highlights, CTAs)
- **Dark:** #0A0A0A (backgrounds)
- **Cream:** #FFF9F5 (light sections)

### Typography
- **Headers:** Plus Jakarta Sans, font-medium
- **Body:** Plus Jakarta Sans, font-normal
- **Italics (emphasis only):** Playfair Display, font-semibold

### Visual Style
- SVG illustrations instead of emojis
- Subtle animations (not overwhelming)
- Gradient borders and glow effects
- Dark mode aesthetic with vibrant accents
- Professional but energetic

---

## Tickets

### Ticket 1.1: globals.css + Theme Config
**Branch:** `feat/1.1-globals`
**Scope:**
- Update `tailwind.config.ts` with color palette
- Add CSS animations to `src/app/globals.css`:
  - `glitch` — subtle text glitch for headers
  - `pulse-glow` — soft pulsing for CTAs
  - `gradient-shift` — moving gradient backgrounds
  - `float` — gentle floating for illustrations
- Add utility classes for gradients and effects

**Files:**
- `tailwind.config.ts`
- `src/app/globals.css`

**Verify:** `npm run build`

---

### Ticket 1.2: Hero Redesign
**Branch:** `feat/1.2-hero`
**Scope:**
- Bold headline with gradient text
- Add SVG illustration (abstract worker/AI concept)
- Animated background elements
- Strong CTA with glow effect
- Maintain responsive design

**Files:**
- `src/components/Hero.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.3: ProblemSection + SVG Icons
**Branch:** `feat/1.3-problem`
**Scope:**
- Replace emojis with inline SVG icons
- Bold section styling with accent colors
- Card design with gradient borders
- Maintain content from `src/lib/content.ts`

**Files:**
- `src/components/ProblemSection.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.4: WhatIsSection Redesign
**Branch:** `feat/1.4-whatis`
**Scope:**
- Modern card layout
- Feature highlights with icons
- Gradient accents
- Professional illustration placement

**Files:**
- `src/components/WhatIsSection.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.5: CapabilitiesSection + Illustrations
**Branch:** `feat/1.5-capabilities`
**Scope:**
- Icon/illustration for each capability
- Interactive hover states
- Grid layout optimization
- Accent color coding

**Files:**
- `src/components/CapabilitiesSection.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.6: PricingSection Bold
**Branch:** `feat/1.6-pricing`
**Scope:**
- Striking pricing cards
- Highlight recommended tier
- Gradient borders on hover
- Clear CTAs

**Files:**
- `src/components/PricingSection.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.7: WaitlistForm + Effects
**Branch:** `feat/1.7-waitlist`
**Scope:**
- Bold form styling
- Input focus effects
- Submit button with glow
- Success state animation

**Files:**
- `src/components/WaitlistForm.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.8: Navbar + Footer
**Branch:** `feat/1.8-nav-footer`
**Scope:**
- Modern navbar with subtle transparency
- Footer with brand consistency
- Social links styled
- Mobile menu polish

**Files:**
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

**Verify:** `npm run build`

**Depends on:** 1.1

---

### Ticket 1.9: Integration + Polish
**Branch:** `feat/1.9-integration`
**Scope:**
- Review all components together
- Ensure visual consistency
- Animation timing coordination
- Final responsive checks
- Performance optimization (lazy load SVGs if needed)

**Files:**
- All components
- `src/components/HomePage.tsx`

**Verify:** `npm run build && npm run lint`

**Depends on:** 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8

---

## Dependency Graph

```
1.1 (globals) ──────────────────────────────────→ merge
    │
    ├── 1.2 (Hero) ────────────────────────────→ merge
    ├── 1.3 (Problem) ─────────────────────────→ merge  
    ├── 1.4 (WhatIs) ──────────────────────────→ merge
    ├── 1.5 (Capabilities) ────────────────────→ merge
    ├── 1.6 (Pricing) ─────────────────────────→ merge
    ├── 1.7 (Waitlist) ────────────────────────→ merge
    ├── 1.8 (Nav+Footer) ──────────────────────→ merge
    │
    └── All above ─────→ 1.9 (Integration) ────→ merge
```

**Parallel opportunities:**
- Tickets 1.2-1.8 can ALL run in parallel after 1.1 completes
- Use git worktrees for parallelism

---

## Execution Plan

1. Execute 1.1 (globals) first — foundation
2. After 1.1 merges, spawn 2-3 parallel agents for 1.2-1.8
3. After all component tickets merge, run 1.9 integration
4. Human review before final deploy
