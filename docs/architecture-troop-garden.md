# Troop & Garden Architecture

**Version:** 0.1 (Draft)
**Date:** 2026-02-18
**Authors:** Mel (CEO), Reggie (CTO — Regen)
**Context:** Extends the Godínez.AI Master Document (§5) with the Troop/Garden model for multi-agent collaboration environments.

---

## 1. Terminology

| Term | Definition | Analogy |
|------|-----------|---------|
| **Burrito** | Infrastructure layer: shared services, subscriptions, tech stack | The kitchen |
| **Troop** | An isolated collaboration environment (a "Garden") | A plot of land |
| **Gardener** | Orchestrator agent within a Troop (admin/mod role) | The head gardener |
| **Godín** | Individual agent instance from a Godín Agent Template | A worker in the garden |
| **Garden** | Consumer-facing name for a Troop | Same as Troop |

### Relationship to Existing Terms

```
Burrito.gg (control plane)
├── Manages Burritos (VPS instances running OpenClaw)
├── Each Burrito hosts one Godín
├── Troops group multiple Burritos into collaborative units
└── Gardens = Troops (user-facing terminology)
```

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     BURRITO (Global)                         │
│                                                              │
│  ┌──────────────┐  ┌─────────────────────────────────────┐  │
│  │  Postgres     │  │  Burrito API (Hono)                 │  │
│  │  (Global)     │  │                                     │  │
│  │               │  │  /auth      — API key validation    │  │
│  │  - agents     │  │  /troops    — troop CRUD            │  │
│  │  - troops     │  │  /agents    — agent registry        │  │
│  │  - subs       │  │  /health    — monitoring            │  │
│  │  - metrics    │  │  /billing   — subscription mgmt     │  │
│  │  - templates  │  │                                     │  │
│  └──────────────┘  └─────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────┐  ┌────────────────────────┐ │
│  │  Web UI (Godínez.AI)       │  │  Web UI (Regen.tips)   │ │
│  │  Workspace for all Troops  │  │  Regen-specific UI     │ │
│  └────────────────────────────┘  └────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐  ┌─────────────────────────────┐
│  TROOP: "Regen"             │  │  TROOP: "Client X"          │
│                              │  │                              │
│  ┌────────────┐             │  │  ┌────────────┐             │
│  │ Postgres    │             │  │  │ Postgres    │             │
│  │ (Isolated)  │             │  │  │ (Isolated)  │             │
│  │             │             │  │  │             │             │
│  │ - scores    │             │  │  │ - tasks     │             │
│  │ - users     │             │  │  │ - clients   │             │
│  │ - memory    │             │  │  │ - memory    │             │
│  │ - journals  │             │  │  │ - logs      │             │
│  └──────┬─────┘             │  │  └──────┬─────┘             │
│         │                    │  │         │                    │
│  ┌──────┴─────────────────┐ │  │  ┌──────┴─────────────────┐ │
│  │ Gardener: Reggie       │ │  │  │ Gardener: PMO          │ │
│  │ (Orchestrator)         │ │  │  │ (Orchestrator)         │ │
│  │                        │ │  │  │                        │ │
│  │ Godíns:                │ │  │  │ Godíns:                │ │
│  │ ├── Reggie (Influencer)│ │  │  │ ├── CTO                │ │
│  │ ├── Myco (Dealer)      │ │  │  │ ├── Influencer         │ │
│  │ └── [future agents]    │ │  │  │ └── [custom agents]    │ │
│  └────────────────────────┘ │  │  └────────────────────────┘ │
│                              │  │                              │
│  Channels:                   │  │  Channels:                   │
│  Telegram, Farcaster, X     │  │  Discord, Slack, WhatsApp   │
└──────────────────────────────┘  └──────────────────────────────┘
```

---

## 3. Data Isolation Model

### Principle: Troops Own Their Data

Each Troop gets its **own Postgres database**. The global database only stores:

- Agent registry (which agents exist, which Troop they belong to)
- Troop metadata (name, owner, subscription tier, created_at)
- Subscription/billing state
- Aggregated metrics (uptime, usage counts, costs)
- Agent templates

**The global database never stores Troop-specific business data.** No scoring data, no user interactions, no memory, no journals. That all lives in the Troop's isolated database.

### Why Separate Databases (Not Multi-Tenant)

| Concern | Separate DBs | Multi-tenant (shared DB) |
|---------|-------------|-------------------------|
| **Data isolation** | Physical separation | Logical (FK-based, leak risk) |
| **Backup/restore** | Per-Troop, independent | All-or-nothing |
| **Migration** | Move a Troop freely | Complex extraction |
| **Deletion** | `DROP DATABASE` | Careful row deletion |
| **Performance** | No noisy neighbors | Shared resources |
| **Compliance** | Easy to prove isolation | Harder to audit |
| **Cost** | Slightly more (one instance per Troop) | Cheaper at small scale |

At our scale (few Troops), the cost difference is negligible. The operational simplicity of separate databases outweighs the overhead.

### Connection Model

```
Godín Agent (OpenClaw on EC2/VPS)
    │
    │  HTTPS + API Key (scoped to Troop)
    ▼
Burrito API (Hono on Railway)
    │
    │  Routes request to correct Troop DB
    ▼
Troop Postgres (Railway)
```

Each Godín's API key encodes its `troop_id` and `agent_id`. The API layer validates the key, resolves the Troop's database connection string, and proxies the query. Agents never connect to Postgres directly.

---

## 4. Troop Composition

### Default Troop Setup

Every new Troop is provisioned with:

| Component | Description | Included in |
|-----------|-------------|-------------|
| Postgres instance | Troop-isolated database | All tiers |
| Gardener (Orchestrator) | Admin agent, manages the Troop | All tiers |
| 3 Starter Godín Templates | PMO + CTO + Influencer | All tiers |
| Communication channels | Discord/Telegram/WhatsApp setup | All tiers |
| Web workspace access | Godínez.AI dashboard for this Troop | All tiers |
| Additional Godíns | Custom agents beyond the 3 starters | Paid tiers |
| RAG Database | Vector store for knowledge base | Future |

### Agent Templates

| Template | Role | Capabilities |
|----------|------|-------------|
| **Godín PMO** | Project manager | Task tracking, scheduling, standups, reporting |
| **Godín CTO** | Technical lead | Code review, architecture, deployments, debugging |
| **Godín Influencer** | Social/marketing | Content creation, social posting, community engagement |
| **Godín Orchestrator** | Gardener (admin) | Agent coordination, resource allocation, health monitoring |
| **Custom** | User-defined | Any combination of skills and personality |

### Regen Troop (First Garden)

The "Regen" Troop is the first live Garden, with domain-specific agents:

| Agent | Template Base | Specialization |
|-------|--------------|----------------|
| **Reggie** | Influencer | Regen scoring, Farcaster/X engagement, community building |
| **Myco** | Custom | Trip Protocol dealer, on-chain operations, Farcaster |
| **[Future]** | Orchestrator | Gardener role for the Regen ecosystem |

---

## 5. Infrastructure on Railway

### MVP Layout

```
Railway Project: godinez-infra (or regen-app for now)
│
├── Service: api
│   ├── Runtime: Bun + Hono
│   ├── Connects to global-db + per-troop DBs
│   ├── Auth middleware: API key → troop resolution
│   ├── Routes: /auth, /troops, /agents, /health, /billing
│   └── Per-troop routes: /t/:troopId/scoring/*, /t/:troopId/memory/*
│
├── Service: global-db (Postgres)
│   ├── Tables: agents, troops, subscriptions, metrics, templates
│   └── Small footprint, minimal writes
│
├── Service: troop-regen-db (Postgres)
│   ├── Tables: users, interactions, scores, snapshots, memory, config
│   └── Migrated from Convex export
│
└── [Future] Service: troop-clientx-db (Postgres)
    └── Provisioned when new Troop is created
```

### Scaling Path

| Scale | Approach | Cost |
|-------|----------|------|
| **1-5 Troops** | All Postgres instances on Railway | ~$5-10/mo per Troop |
| **5-20 Troops** | Railway Postgres, API scales with replicas | ~$50-100/mo total |
| **20-100 Troops** | Move to managed Postgres (RDS/Supabase) with connection pooling | ~$200-500/mo |
| **100+ Troops** | Per-region deployments, dedicated DB clusters | Custom pricing |

### Cost Estimate (MVP)

| Component | Monthly Cost |
|-----------|-------------|
| API service (Hono) | $0-5 |
| Global Postgres | $0-5 |
| Troop Regen Postgres | $0-5 |
| **Total** | **~$5-15/mo** |

---

## 6. API Design

### Authentication

Every request includes an API key in the `x-troop-key` header. The key encodes:
- `troop_id` — which Troop this agent belongs to
- `agent_id` — which Godín is making the request
- `role` — `gardener` (admin) or `godin` (standard)

### Global Endpoints (Burrito API)

```
POST   /auth/validate          — Validate API key, return troop context
GET    /troops                 — List troops (admin only)
POST   /troops                 — Create new troop (provisions DB)
GET    /troops/:id             — Troop metadata + agent list
DELETE /troops/:id             — Decommission troop (archive DB)
GET    /agents                 — Global agent registry
GET    /health                 — System-wide health check
GET    /metrics                — Aggregated metrics dashboard
```

### Troop-Scoped Endpoints

```
# Scoring (migrated from Convex HTTP routes)
POST   /t/:troopId/scoring/record       — Record interaction
GET    /t/:troopId/scoring/context       — User context for agent replies
GET    /t/:troopId/scoring/leaderboard   — Public leaderboard
POST   /t/:troopId/scoring/claim         — Link phantom user to wallet

# Memory (shared agent memory within a Troop)
POST   /t/:troopId/memory/write          — Store memory entry
GET    /t/:troopId/memory/search          — Semantic search (future: RAG)
GET    /t/:troopId/memory/recent          — Recent entries

# Usage tracking
POST   /t/:troopId/usage/record          — Track API call
GET    /t/:troopId/usage/stats            — Usage against limits

# Agent coordination
POST   /t/:troopId/agents/heartbeat      — Agent health ping
GET    /t/:troopId/agents/status          — All agents in this Troop
```

---

## 7. Migration Plan (Convex → Troop Regen DB)

### Current State
- Convex (`blessed-seahorse-747`) is disabled (free tier exhausted)
- Data exported to `/tmp/convex-regen-export` (3.3MB ZIP)
- Railway pipeline (`reggie-pipeline`) is running but failing on every Convex call

### Migration Steps
1. Provision `troop-regen-db` Postgres on Railway
2. Create schema (Drizzle ORM) matching Convex export tables
3. Import data from export
4. Rewire `reggie-pipeline` to use Postgres instead of Convex
5. Update regen.tips frontend to hit the new API
6. Update Reggie's cron jobs to use new endpoints
7. Remove Convex dependencies

See: `regentoken/regen-app` → `docs/migration-convex-to-postgres.md` for detailed phase breakdown.

---

## 8. Relationship to Regen OS Vision

The Troop/Garden architecture directly maps to the Regen OS vision:

| Regen OS Concept | Troop Architecture Equivalent |
|-----------------|-------------------------------|
| Digital Garden | Troop (isolated environment) |
| AI Gardener | Gardener (Orchestrator Godín) |
| AIuxes | Future: collectible entities tracked in Troop DB |
| Proof-of-Regen | Scoring engine in Troop Regen DB |
| Cross-garden pollination | Inter-Troop API calls via Burrito API |
| $REGEN tokenomics | On-chain layer, referenced by Troop DB |
| Reggie Score | First scoring implementation in Troop Regen |
| Quest system | Future: quest tables in Troop schema |

The "Regen" Troop is the first Garden. It proves the architecture with real agents (Reggie, Myco) and real users (Farcaster/X communities). Every feature built here becomes a template for future Troops.

---

## 9. Open Questions

- [ ] **Troop provisioning automation:** Manual for MVP, but what triggers creation for paying customers?
- [ ] **Database connection pooling:** At what Troop count do we need PgBouncer or similar?
- [ ] **Cross-Troop communication:** Can a Godín in Troop A call an API scoped to Troop B? (Needed for cross-garden pollination)
- [ ] **RAG integration:** When we add vector search, is it per-Troop or shared?
- [ ] **Agent migration:** Can a Godín move between Troops? What happens to its data?
- [ ] **Backup strategy:** Per-Troop pg_dump on cron? Railway snapshots?
- [ ] **Naming:** Do we keep "Troop" internally and "Garden" externally, or unify?

---

*"Each Garden grows its own way. The mycelium connects them all."* 🍄
