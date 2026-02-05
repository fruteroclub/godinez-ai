# 🤖 Godínez.AI

**Tu empleado AI que nunca falta al trabajo**

Agentes de inteligencia artificial que trabajan 24/7 por tu negocio. Más baratos que un intern. Más capaces que un equipo.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Typography**: Playfair Display + Inter (Google Fonts)
- **Runtime**: Bun
- **Language**: TypeScript

## Development

```bash
bun install
bun run dev
```

## Deployment

Ready for [Vercel](https://vercel.com):

```bash
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deployments.

## i18n

All user-facing text is centralized in `src/lib/content.ts` for easy translation.

## Waitlist

Form submissions are stored via the `/api/waitlist` API route to a local JSON file (`data/waitlist.json`). Replace with a proper database for production.

---

Un producto de [Frutero Club](https://frutero.club) · Powered by [OpenClaw](https://openclaw.ai)
