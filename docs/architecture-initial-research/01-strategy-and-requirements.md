# 01 — Strategy and Requirements

*Sources: godinez-strategy-launch.md, frutero-strategy-q1-2026.md, godinez-ai CLAUDE.md*

---

## North Star

**Poner los Godínez (Agentes IA) en las manos de los usuarios para recibir feedback, aplicar aprendizajes, iterar.**

Translation: Get the AI agents into users' hands to receive feedback, apply learnings, iterate.

## The Product Loop

```
Marketing → Usuarios → Tech → Producto → Inversión
    ↑                                        ↓
    ←←←←←←←← feedback + aprendizajes ←←←←←←←
```

Marketing brings users → users generate data → tech builds product → product attracts investment → investment funds marketing.

---

## 3-Tier Pricing Model

| Tier | Name | Target Margin |
|------|------|---------------|
| 🌱 Becario (Intern) | Lightweight agents, low traffic | 90% |
| ⚡ Asistente (Assistant) | General-purpose, mid-traffic | 87% |
| 🚀 Agente (Agent) | Full production, heavy Opus usage | 77% |

All tiers target **75%+ margins**. The architecture must support this constraint — infrastructure costs must stay low enough to preserve margin even at the Agent tier with heavy LLM usage.

---

## Architecture Priority Stack

Ordered by importance — when trade-offs arise, higher priorities win:

1. **Costos** — Maintain margins. Cheapest viable infrastructure.
2. **Seguridad** — Protect API keys, bot tokens, customer data.
3. **Privacidad** — User data isolation between agents.
4. **Disponibilidad** — Agent uptime (target: always-on for production agents).
5. **Confiabilidad** — Consistent behavior, no silent failures.
6. **Desempeño** — Response speed (secondary to cost).

This stack directly influenced decisions like choosing `c7i-flex.large` over `t3.medium` (cost + reliability over raw performance), single-region deployment (cost over availability), and per-instance isolation (security/privacy over resource efficiency).

---

## Alfa Test Goals

The marketing campaign ("Se buscan Godínez") brings diverse early users. The alfa test validates:

- **Usage patterns** — How do users interact with agents? Which model tiers get used?
- **Bottlenecks** — Where does the architecture struggle? Session bloat? API rate limits?
- **Improvements** — What features do users actually need vs. what we assumed?
- **Architecture validation** — Does the one-instance-per-agent model hold up at 10 agents? 25? 50?

---

## Current Status (as of 2026-02-09)

| Component | Status |
|-----------|--------|
| Landing page (godinez.ai) | ✅ Live |
| Waitlist (tier + industry) | ✅ Convex backend |
| Agent infrastructure (Burrito.gg) | ⏳ Architecture documented, manual runbook validated |
| Agent provisioning API | ⏳ Not started |
| Production agents | ✅ K7 (Kukulcan) running as reference implementation |

---

## Responsibilities

| Area | Owner |
|------|-------|
| Marketing | Mel (CEO) + Ema (Marketing Lead) |
| Tech / Architecture | Scarf (Technical Lead) + K7 (CPO) |
| Product | K7 (CPO) |
| Revenue | Ian (BD Lead) |
