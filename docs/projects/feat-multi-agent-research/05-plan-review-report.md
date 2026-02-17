# 05 — Kukulcan Avatar System Plan — Review Report

*Reviewer: Claude Code (Opus 4.6) | Date: 2026-02-12*
*Sources: OpenClaw v2026.2.9 docs (Context7), GitHub release notes, plan docs 01–04*

---

## Executive Summary

The implementation plan (doc 04) is **architecturally sound** and well-structured. The core multi-agent concepts — `agents.list`, `sessions_spawn`, per-agent workspace isolation, and the orchestrator-specialist pattern — are all accurately documented and align with OpenClaw's actual configuration schema.

This review incorporates corrections, risk analysis, and two new feature concepts — **Context Pyramid** and **Project Management (Kanban)** — that address session persistence, intelligent routing, and multi-project coordination.

**Key decisions from review:**
- **Swap memory: REMOVED** — incremental deployment is Plan A, EC2 upgrade is Plan B
- **Initial deployment: 2 agents** — CEO and CTO only, with redefined role scopes
- **Model IDs: CORRECTED** — `anthropic/claude-opus-4-6` (verified against OpenClaw docs)
- **Single API key: ACCEPTED** — good CEO orchestration is the primary mitigation
- **Two new feature concepts introduced** — Context Pyramid and Project Management

---

## Factual Corrections

### 1. Model IDs Must Use `anthropic/claude-opus-4-6`

**Status: VERIFIED**

OpenClaw's documentation consistently uses `anthropic/claude-opus-4-6` as the current Opus model ID. The plan's references to `claude-opus-4-5` / `Opus 4.5` are outdated.

Evidence from OpenClaw docs:

```json5
// From docs/gateway/configuration.md
agents: {
  defaults: {
    model: {
      primary: "anthropic/claude-opus-4-6"
    },
    models: {
      Opus: { alias: "anthropic/claude-opus-4-6" }
    }
  }
}

// From docs/concepts/model-providers.md
"primary": "anthropic/claude-opus-4-6"

// From docs/help/faq.md — alias mapping
"anthropic/claude-opus-4-6" → alias "opus"
"anthropic/claude-sonnet-4-5" → alias "sonnet"
"anthropic/claude-haiku-4-5" → alias "haiku"
```

OpenClaw uses **pinned model IDs**, not auto-resolving aliases. The `provider/model` format is literal — `anthropic/claude-opus-4-5` would resolve to the older Opus 4.5, not the current Opus 4.6.

**Action:** All config references must use `anthropic/claude-opus-4-6`.

| Location in Plan | Current | Corrected |
|-----------------|---------|-----------|
| Avatar Roster | `Opus 4.5` | `Opus 4.6` |
| openclaw.json — main agent model | `anthropic/claude-opus-4-5` | `anthropic/claude-opus-4-6` |
| openclaw.json — CTO agent model | `anthropic/claude-opus-4-5` | `anthropic/claude-opus-4-6` |

### 2. Single API Key — Accepted With Orchestration Mitigation

The plan copies the same `auth-profiles.json` to all agents, meaning all agents share the same Anthropic API key and therefore the same upstream rate limit pool.

**Risk acknowledged but accepted.** The mitigation is not a secondary key — it's **good orchestration from the CEO avatar**. The CEO's `AVATARS.md` must enforce:

- **Rate limit awareness** — CEO tracks how many specialist sessions are active and avoids spawning concurrent heavy tasks
- **Memory awareness** — CEO monitors delegation density to prevent resource contention
- **Task serialization** — CEO queues deep tasks rather than parallelizing when resources are constrained
- **Communication discipline** — CEO avoids saturating the channel with back-to-back delegations
- **Loop prevention** — CEO includes explicit guard rails against recursive delegation patterns (e.g., CTO delegating back to CEO which re-delegates to CTO)

This makes the CEO the **resource orchestrator**, not just the task router. The single key constraint is a forcing function for disciplined delegation — which is a feature, not a bug, at this stage.

**Future:** A secondary key remains a good Phase 1 hardening item but is not a blocker for initial deployment.

### 3. Runtime Agent Management APIs — Not a Gap

**Status: CLARIFIED**

The v2026.2.9 release notes mention `agents.create`, `agents.update`, `agents.delete` as "gateway RPC methods for web UI integration." Investigation reveals these are **internal gateway RPC methods** exposed for the Control UI (web dashboard), not documented user-facing configuration tools.

- The OpenClaw sub-agents documentation has **no mention** of these methods
- The documented approach for agent management remains file-based (`openclaw.json` + gateway restart or `openclaw agents add/delete` CLI)
- The RPC methods are for programmatic management from the Control UI, not for agent self-modification

**The plan's file-based approach is correct and aligns with documented best practices.** The omission of RPC methods was appropriate — they are an internal implementation detail of the web UI, not a user-facing feature.

**Future consideration:** These RPC methods could be useful for the Burrito.gg control plane (Phase 2 hot-add API) but are not relevant to the K7 avatar system deployment.

---

## Swap Memory — Decision: REMOVED

### Original Plan

4 GB swap on c7i-flex.large (3.7 GB RAM), persisted via `/etc/fstab`.

### Decision

**Swap will NOT be implemented.** Two-pronged approach instead:

| Plan | Strategy | Trigger |
|------|----------|---------|
| **A (Primary)** | Incremental deployment — start with 2 agents, add more only after memory validation | Default |
| **B (Fallback)** | Upgrade EC2 instance to c7i-flex.xlarge (8 GB RAM, ~$30/mo more) | If 2 agents cause memory pressure on c7i-flex.large |

### Rationale

1. **Swap on AWS EBS is a performance trap** — EBS I/O latency (~0.5–1ms) is 5,000–10,000x slower than RAM (~100ns). Sustained swapping degrades agent response times from seconds to minutes.
2. **Swap masks the real problem** — if the instance can't fit 2 agents in RAM, the answer is more RAM, not disk-backed virtual memory.
3. **Incremental deployment eliminates the need** — by starting with 2 agents and monitoring memory before adding more, we never reach the point where swap is required as a safety net.
4. **EC2 upgrade is cheaper than debugging swap performance** — $30/month for c7i-flex.xlarge is far less than the engineering time spent tuning swappiness, monitoring EBS IOPS, and diagnosing latency spikes.

### What This Changes in the Plan

- Remove Step 1 swap commands entirely
- Remove swap-related success criteria ("Memory < 3 GB")
- Replace with memory monitoring baseline: `free -h` + `ps aux --sort=-rss | head -5` after each agent addition
- Add decision gate: if RSS > 2.5 GB after 2 agents under load → trigger Plan B (instance upgrade)

---

## Revised Avatar Roster — 2 Agents Initial Deployment

The initial deployment starts with **2 agents only**: CEO and CTO. The remaining specialist avatars (CFO, PMO, BD) are deferred to a later phase after memory validation and the Context Pyramid infrastructure is in place.

### Role Definitions

| Avatar | Agent ID | Model | Role Mix | Core Identity |
|--------|----------|-------|----------|---------------|
| **CEO** | `main` | `anthropic/claude-opus-4-6` | Hustler 50%, Hipster 30%, Hacker 20% | Founder + finances/sales + growth/vibes + tech/architecture/scale/security |
| **CTO** | `cto` | `anthropic/claude-opus-4-6` | Hacker 50%, Hipster 30%, Hustler 20% | Tech/architecture/scale/security/development/devops + growth/vibes/UX-UI design + shipping/marketing/sales/BD |

### Why This Split Works for 2 Agents

The CEO and CTO roles are **complementary, not siloed**. The Hustler/Hipster/Hacker framework ensures overlap:

```
              CEO                           CTO
    ┌────────────────────┐       ┌────────────────────┐
    │ HUSTLER 50%        │       │ HACKER 50%         │
    │ • Founder vision   │       │ • Architecture     │
    │ • Finances/sales   │       │ • Security/scale   │
    │ • Business dev     │       │ • Development      │
    │ • Pricing/revenue  │       │ • DevOps/infra     │
    ├────────────────────┤       ├────────────────────┤
    │ HIPSTER 30%        │       │ HIPSTER 30%        │
    │ • Growth strategy  │       │ • UX/UI design     │
    │ • Brand/vibes      │       │ • Product feel     │
    │ • Market sense     │       │ • User experience  │
    ├────────────────────┤       ├────────────────────┤
    │ HACKER 20%         │       │ HUSTLER 20%        │
    │ • Tech feasibility │       │ • Shipping tempo   │
    │ • Architecture Q   │       │ • Marketing/sales  │
    │ • Security posture │       │ • Business context │
    └────────────────────┘       └────────────────────┘
```

The CEO handles **what to build and why** (strategy, money, growth). The CTO handles **how to build it and when** (engineering, design, delivery). Both have enough cross-domain awareness to communicate effectively without a specialist intermediary.

### What the Deferred Avatars Would Add (Phase 2+)

| Avatar | Added Value | Prerequisite |
|--------|------------|--------------|
| **CFO** | Deep financial modeling, unit economics, margin analysis | Context Pyramid for session persistence |
| **PMO** | Sprint management, delivery tracking, team coordination | Project Management (Kanban) system |
| **BD** | Partnership pipeline, competitive intel, customer acquisition | Context Pyramid + external data access |

These roles are currently **absorbed by CEO and CTO** — the CEO handles the Hustler aspects (finance, BD) and the CTO handles Hipster delivery aspects (PMO). Dedicated specialists only become valuable when the Context Pyramid ensures their deep work persists across sessions.

---

## Corrected Configuration

```jsonc
{
  "agents": {
    "defaults": { /* keep existing */ },
    "list": [
      {
        "id": "main",
        "default": true,
        "workspace": "/home/kukulcan/.openclaw/workspace",
        "model": {
          "primary": "anthropic/claude-opus-4-6"
        },
        "subagents": {
          "maxConcurrent": 2,
          "allowAgents": ["cto"]  // Only CTO for initial deployment
        }
      },
      {
        "id": "cto",
        "workspace": "/home/kukulcan/.openclaw/workspace-cto",
        "agentDir": "/home/kukulcan/.openclaw/agents/cto/agent",
        "model": {
          "primary": "anthropic/claude-opus-4-6",
          "fallbacks": ["anthropic/claude-sonnet-4-5"]
        }
      }
    ]
  }
}
```

---

## Risks — Updated Assessment

### Risk 1: Memory Density

**Severity: LOW (revised from HIGH)**

With only 2 agents (both Opus), estimated memory:

| Component | Estimated Memory |
|-----------|-----------------|
| Node.js gateway process | ~200–400 MB |
| CEO session (Opus) | ~500–800 MB |
| CTO session (Opus) | ~500–800 MB |
| OS + system services | ~300–500 MB |
| **Total estimated** | **1.5–2.5 GB** |

This fits comfortably within 3.7 GB. No swap needed. If memory grows beyond 2.5 GB under real load → trigger Plan B (instance upgrade to c7i-flex.xlarge).

### Risk 2: Single API Key

**Severity: MEDIUM (revised from HIGH)**

Accepted. Mitigated by CEO orchestration discipline — see Correction #2 above. The CEO avatar's workspace instructions must encode resource awareness as a first-class operating principle.

### Risk 3: Sub-Agent Sessions Lost on Gateway Restart

**Severity: HIGH (revised from MEDIUM)**

This is now the **top risk** because it directly undermines the context pyramid concept. If specialist work is lost on restart, the CEO loses strategic awareness of delegated outcomes.

**Mitigation: Context Pyramid system** (see new section below). This is not a workaround — it's a core architectural requirement.

### Risk 4: Hashtag Routing Reliability

**Severity: MEDIUM → Addressed by Routing Service concept**

LLM-based hashtag parsing is unreliable. The solution is to move hashtag detection to a **deterministic parsing layer** before messages reach the LLM. See the Hashtag Routing Service section below.

---

## Warnings — Updated

### Warning 1: `maxConcurrent` Must Match Agent Count

Set `maxConcurrent: 2` for initial deployment. This prevents the CEO from spawning more background tasks than the system can handle. Increase only when adding more agents AND after memory validation.

### Warning 2: Add Rollback Procedure

The plan backs up config but doesn't document rollback:

```bash
# Rollback to single-agent
cp ~/.openclaw/openclaw.json.pre-avatars ~/.openclaw/openclaw.json
systemctl --user restart openclaw-gateway.service
openclaw agents list  # Should show only 'main'
```

### Warning 3: Cost Impact Underestimated

A delegated task involves **at least 2 full LLM roundtrips** (CEO processes → CEO delegates → specialist works → CEO synthesizes). More realistic cost estimates:

| Delegation Type | Actual Cost Impact |
|-----------------|-------------------|
| CEO → CTO (both Opus) | +150–200% per delegated task |
| CEO → Sonnet specialist (future) | +50–80% per delegated task |

This is acceptable because specialist work produces **higher quality domain-specific output** than the CEO handling everything alone. The cost increase buys depth.

### Warning 4: Session Compaction Must Be Verified

v2026.2.9 fixed "post-compaction amnesia" but the plan doesn't verify compaction settings per agent. If compaction truncates a specialist session before the CEO reads it via `sessions_history`, context pyramid data is lost.

**Action:** Verify compaction mode per agent. Use `cleanup: "keep"` for all specialist spawns.

---

## New Feature: Context Pyramid System

### Problem

`sessions_spawn` work is lost on gateway restart. The CEO has no persistent record of what specialists decided, delivered, or recommended across sessions. Strategic awareness degrades as sessions expire.

### Concept

The Context Pyramid is a **persistent hierarchical context storage system** that survives session boundaries and gateway restarts. It captures the *strategic essence* of specialist work without duplicating the full conversation.

```
┌──────────────────────────────────────────────┐
│              STRATEGIC LAYER                  │
│    CEO's synthesized awareness of all         │
│    projects, decisions, and pending items     │
│    (persistent, survives restarts)            │
├──────────────────────────────────────────────┤
│            DOMAIN LAYERS                      │
│  CTO: technical decisions, architecture       │
│  CFO: financial models, pricing (future)      │
│  PMO: delivery status, sprints (future)       │
│  BD: pipeline, partnerships (future)          │
├──────────────────────────────────────────────┤
│           SESSION LAYER                       │
│  Ephemeral: active sessions_spawn work        │
│  (lost on restart — this is OK if pyramid     │
│   captures the outputs above)                 │
└──────────────────────────────────────────────┘
```

### Requirements (Initial)

| # | Requirement | Description |
|---|-------------|-------------|
| CP-1 | **Structured handoff persistence** | When a specialist completes a task, the structured handoff (task, outcome, decisions, context, follow-up) must be written to a persistent store — not just announced in chat |
| CP-2 | **Restart survival** | Pyramid data must survive gateway restarts. Options: filesystem (Markdown files), database (Convex), or both |
| CP-3 | **CEO read access** | CEO must be able to query the pyramid for context before making decisions. "What did the CTO decide about the auth architecture?" should return the relevant handoff |
| CP-4 | **Domain scoping** | Each specialist writes to their own domain layer. CEO reads across all domains. No cross-specialist contamination |
| CP-5 | **Temporal ordering** | Handoffs are timestamped and ordered. The CEO can distinguish "CTO's latest position" from "CTO's position last week" |
| CP-6 | **Summarization** | The strategic layer is a CEO-maintained summary, not a copy of all handoffs. The CEO synthesizes periodically |

### Potential Implementations

| Approach | Persistence | Query | Complexity | Fit |
|----------|------------|-------|------------|-----|
| **Markdown files per domain** | Filesystem (`~/.openclaw/pyramid/<agent>/`) | Agent reads files at session start | Low | Good for MVP — agents already read workspace files |
| **Convex database** | Cloud-hosted, survives instance termination | Convex queries via action/mutation | Medium | Best for multi-instance (Troops), query flexibility |
| **Hybrid** | Write to both filesystem + Convex | Filesystem for fast agent access, Convex for cross-instance queries | Medium-High | Best long-term architecture |

### As a Plugin/Skill

The Context Pyramid could be packaged as an **OpenClaw skill** that any agent can invoke:

```
/pyramid write --domain cto --type decision --summary "Migrated auth to JWT"
/pyramid read --domain cto --last 5
/pyramid status  # CEO overview of all domain activity
```

This would be a **game-changing capability** for any multi-agent OpenClaw deployment — not just K7. It solves the universal problem of "agents forget across sessions" in a structured, queryable way.

---

## New Feature: Project Management (Kanban)

### Problem

Multi-agent orchestration needs visibility into **what's being worked on, what's done, and what's blocked** — across multiple projects and agents simultaneously. Without this, the CEO operates blind and specialists duplicate work or leave tasks orphaned.

### Concept

A lightweight, agent-managed Kanban system where:

1. **CEO maintains a central board** with high-level project/task visibility
2. **Each specialist maintains their own sub-board** with domain-specific task detail
3. **Central board has references** to sub-boards — knows *that* work exists and its status, but not the implementation detail
4. **Agents manage their boards** through simple tool calls during normal operation

```
┌─────────────────────────────────────────────────┐
│                CEO CENTRAL BOARD                 │
│                                                  │
│  PROJECT: Godínez.AI v2                          │
│  ┌──────────┬──────────┬──────────┬───────────┐ │
│  │ BACKLOG  │   TODO   │  DOING   │   DONE    │ │
│  ├──────────┼──────────┼──────────┼───────────┤ │
│  │ BD:      │ CTO:     │ CTO:     │ CEO:      │ │
│  │ Partner  │ Auth     │ Multi-   │ Pricing   │ │
│  │ research │ redesign │ agent    │ model v2  │ │
│  │          │          │ deploy   │           │ │
│  └──────────┴──────────┴──────────┴───────────┘ │
│                                                  │
│  PROJECT: Burrito.gg Infrastructure              │
│  ┌──────────┬──────────┬──────────┬───────────┐ │
│  │ BACKLOG  │   TODO   │  DOING   │   DONE    │ │
│  ├──────────┼──────────┼──────────┼───────────┤ │
│  │ PMO:     │ CTO:     │ CTO:     │ CTO:      │ │
│  │ Scaling  │ Troops   │ K7 swap  │ EC2       │ │
│  │ plan     │ API      │ removal  │ baseline  │ │
│  └──────────┴──────────┴──────────┴───────────┘ │
└─────────────────────────────────────────────────┘
          │              │
          ▼              ▼
┌─────────────────┐ ┌─────────────────┐
│  CTO SUB-BOARD  │ │  CEO SUB-BOARD  │
│                 │ │                 │
│ Multi-agent     │ │ Pricing v2      │
│ deploy:         │ │ • Market comp   │
│ • Config done   │ │ • Unit econ     │
│ • Testing next  │ │ • Tier struct   │
│ • Need memory   │ │ • Approved ✓    │
│   benchmarks    │ │                 │
└─────────────────┘ └─────────────────┘
```

### Design Principles

1. **Simple and fast** — adding a task should be one tool call, not a workflow
2. **Agent-managed** — each agent updates their own board during natural work, not through a separate management session
3. **Hierarchical** — detail lives at the sub-board level, summaries propagate to the central board
4. **Lightweight storage** — Markdown files or simple JSON, not a full project management database
5. **Usable immediately** — the MVP should work with filesystem storage before any Convex integration

### MVP Storage Format

```
~/.openclaw/kanban/
├── central.json          # CEO's view of all projects
├── ceo/
│   └── tasks.json        # CEO's task detail
├── cto/
│   └── tasks.json        # CTO's task detail
├── cfo/                  # (future)
│   └── tasks.json
└── ...
```

### Task Schema (Minimal)

```jsonc
{
  "id": "task-001",
  "project": "godinez-v2",
  "title": "Deploy multi-agent avatar system",
  "status": "doing",        // backlog | todo | doing | done | blocked
  "owner": "cto",
  "created": "2026-02-12",
  "updated": "2026-02-12",
  "blockedBy": null,         // task-id or null
  "notes": "Config done, testing next. Need memory benchmarks."
}
```

### Central Board Entry (CEO View)

```jsonc
{
  "id": "task-001",
  "project": "godinez-v2",
  "title": "Deploy multi-agent avatar system",
  "status": "doing",
  "owner": "cto",
  "updated": "2026-02-12"
  // No detailed notes — detail lives in CTO sub-board
}
```

### Integration with Context Pyramid

The Kanban system and Context Pyramid are complementary:

| System | Answers | Persistence |
|--------|---------|-------------|
| **Kanban** | "What is being worked on? What's done? What's blocked?" | Task state |
| **Context Pyramid** | "What was decided? What are the strategic implications?" | Decision context |

A specialist's handoff (Context Pyramid) should automatically update their Kanban board status. When a CTO task completes and produces a structured handoff, the Kanban entry moves to `done` and the pyramid stores the decision context.

---

## New Feature: Hashtag Routing Service

### Problem

LLM-based hashtag detection (`#cto`, `#cfo`) is unreliable — the CEO might misinterpret hashtags in quotes, mixed hashtags, or hashtags that appear in URLs/code blocks.

### Concept

Move hashtag detection to a **deterministic parsing layer** before messages reach the LLM. Handle hashtags as strings, parse them, and use them to route via an API-like service.

```
User message: "#cto review the auth flow for godinez.ai"
                │
                ▼
┌──────────────────────────────┐
│    Hashtag Routing Service    │
│                              │
│  1. Parse message for #tags  │
│  2. Extract: ["cto"]        │
│  3. Strip tags from message  │
│  4. Store routing record     │
│  5. Route to target agent    │
└──────────────────────────────┘
                │
                ▼
   CTO receives: "review the auth flow for godinez.ai"
   (routing context stored in database)
```

### Integration Points

| Component | Role |
|-----------|------|
| **Parser** | Regex-based hashtag extraction from message text (runs before LLM) |
| **Database** | Store routing records: `{ messageId, hashtags, source, target, timestamp }` |
| **Context Pyramid** | Routing records feed into the pyramid — CEO can query "what has the CTO been asked about recently?" |
| **OpenClaw gateway** | Could be implemented as a message preprocessor or webhook middleware |

### Why This Is Part of Context Pyramid

Routing records are **context metadata** — they capture the flow of work delegation. The Context Pyramid should store not just *what was decided* but *what was asked* and *who handled it*. This creates an audit trail of delegation patterns that helps the CEO optimize orchestration over time.

**Priority:** This is an enhancement, not a blocker for initial deployment. The CEO can handle hashtag routing via workspace instructions for the 2-agent deployment. The deterministic service becomes valuable when adding 3+ agents.

---

## Revised Implementation Order

| Step | Action | Gate |
|------|--------|------|
| 1. **Backup config** | `cp openclaw.json openclaw.json.pre-avatars` | — |
| 2. **Create CTO workspace + agent dir** | Directories, auth copy, symlink SOUL.md | — |
| 3. **Write CTO identity files** | IDENTITY.md, AGENTS.md, MEMORY.md with Hacker/Hipster/Hustler scope | — |
| 4. **Write CEO AVATARS.md** | Delegation protocol, orchestration discipline, resource awareness | — |
| 5. **Update openclaw.json** | 2-agent config (see Corrected Configuration above) | — |
| 6. **Restart + validate** | `openclaw agents list`, test messages, verify isolation | Memory < 2.5 GB |
| 7. **Monitor 24–48 hours** | Real workload, track RSS, session sizes, response times | Stable memory |
| **GATE: Memory Decision** | If RSS > 2.5 GB sustained → Plan B (instance upgrade) | — |
| 8. **Implement Context Pyramid MVP** | Filesystem-based handoff persistence | Required for Phase 2 agents |
| 9. **Implement Kanban MVP** | Filesystem-based task tracking | Required for PMO agent |
| 10. **Add specialist agents** | One at a time, with memory monitoring after each | Memory headroom |

---

## Summary of Action Items

| # | Item | Priority | Effort |
|---|------|----------|--------|
| 1 | Update all model IDs to `anthropic/claude-opus-4-6` | High | 5 min |
| 2 | Reduce to 2-agent initial deployment (CEO + CTO) | High | Config change |
| 3 | Remove swap from prerequisites entirely | High | Config change |
| 4 | Set `maxConcurrent: 2` | High | 1 min |
| 5 | Write CEO orchestration discipline into AVATARS.md | High | 30 min |
| 6 | Define CEO and CTO role scopes (Hustler/Hipster/Hacker) in IDENTITY.md | High | 30 min |
| 7 | Add rollback procedure to plan | Medium | 5 min |
| 8 | Design Context Pyramid MVP (filesystem-based) | Medium | 2–4 hours |
| 9 | Design Kanban MVP (filesystem-based) | Medium | 2–4 hours |
| 10 | Design hashtag routing service concept | Low | 1–2 hours |
| 11 | Document cost impact with dual-roundtrip reality | Low | 10 min |

---

## Verdict

**The plan is ready for implementation with the corrections above.** The architecture is sound, the OpenClaw documentation supports all proposed features, and the 2-agent incremental approach eliminates the memory density risk that originally required swap.

The two new feature concepts — **Context Pyramid** and **Project Management (Kanban)** — are the architectural foundation needed before scaling beyond 2 agents. They solve the session persistence problem that makes multi-agent orchestration fragile, and they transform K7 from a multi-headed agent into a **coordinated executive team with persistent institutional memory**.

---

*Report generated from OpenClaw v2026.2.9 documentation, GitHub release notes, and Context7 documentation retrieval.*
