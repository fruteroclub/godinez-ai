# 07 — Multi-Agent Avatar System — Implementation Plan

*Date: 2026-02-12 | Status: Research Phase*
*Sources: docs 01–06, OpenClaw v2026.2.9, tick-md assessment*

---

## Context

We need a repeatable process for deploying multi-agent avatar systems on OpenClaw instances. The first deployment is Kukulcán (K7) with 2 avatars (CEO + CTO), but this plan is **agent-agnostic** — it should serve as a template for future agent deployments.

This is a **research-phase feature**. Phases 1 and 2 run in parallel to generate independent learnings. Phase 3 synthesizes both into a UI. The integration order (infra-first vs skill-first) will itself be a learning that refines the process.

## Scope

- **1 OpenClaw instance** → N avatars (capped at 2 for first deployment)
- **Same agent identity**, different role scopes per avatar
- **tick-md fork** as project management skill (standalone project)
- **Troop UI** designed from operational learnings (Phase 3, always last)
- **Phases 1 and 2 are independent and parallel**

---

## Phase 1: Agent Infrastructure

**Goal:** Configure an OpenClaw instance for multi-avatar support.

**Input:** A running single-agent OpenClaw instance.
**Output:** N avatars running with isolated workspaces, validated delegation, documented findings.

**Can run in parallel with Phase 2.**

### Tickets

| ID | Title | Description | Priority |
|----|-------|-------------|----------|
| **AI-1** | Backup and document current state | Backup config, document existing setup, create rollback procedure | P0 |
| **AI-2** | Define avatar roster | Document avatar roles, model assignments, role scopes (e.g., Hustler/Hipster/Hacker mix), delegation rules | P0 |
| **AI-3** | Create avatar workspaces | Per-avatar directories, auth profile copies, shared identity symlinks, following OpenClaw `agents.list` conventions | P0 |
| **AI-4** | Write avatar identity files | Per-avatar: IDENTITY.md (role scope), AGENTS.md (operating instructions, handoff protocol), MEMORY.md (initial domain context) | P0 |
| **AI-5** | Write orchestrator delegation protocol | Orchestrator avatar gets AVATARS.md: delegation rules, resource awareness, loop prevention, communication discipline | P0 |
| **AI-6** | Update OpenClaw config | `agents.list` in `openclaw.json`, model assignments, `maxConcurrent`, `allowAgents` | P0 |
| **AI-7** | Validate deployment | Restart gateway, verify agents list, test delegation, check memory baseline, test rollback | P0 |
| **AI-8** | Monitor and document | Run under real load for 24-48h. Record: memory footprint, delegation latency, session behavior, edge cases, failure modes | P1 |

### Decision Gates

| If... | Then... |
|-------|---------|
| Avatars stable, memory within instance capacity | Mark Phase 1 complete |
| Memory pressure | Upgrade instance tier before continuing |
| Delegation or isolation fails | Debug, file upstream issue if needed, document blocker |

### Deliverables

- Working multi-avatar OpenClaw instance
- Rollback procedure (tested)
- Phase 1 findings document (memory, performance, operational learnings)

---

## Phase 2: Project Management Skill (tick-md)

**Goal:** Fork tick-md, validate it as a multi-agent task coordination system, prepare it for installation on any OpenClaw instance.

**Input:** tick-md upstream repo.
**Output:** Validated fork, ready to install as an OpenClaw skill, documented findings.

**Can run in parallel with Phase 1.**

### Tickets

| ID | Title | Description | Priority |
|----|-------|-------------|----------|
| **PM-1** | Fork tick-md | Fork upstream repo, clone locally, audit dependencies, validate build with Bun | P0 |
| **PM-2** | CLI validation | `tick init`, create tasks with dependencies, test full lifecycle (`add/claim/done/list/graph`), verify Git commit trail | P0 |
| **PM-3** | MCP server validation | Run `tick-mcp-server`, test all 13 MCP tools, check for conflicts with other MCP servers (e.g., Convex) | P0 |
| **PM-4** | ClawHub skill validation | Install skill, verify it loads in an OpenClaw agent context, test agent-driven task operations | P0 |
| **PM-5** | Multi-agent coordination test | Test with 2+ agents: agent A creates task → agent B claims → agent B completes → verify audit trail, restart persistence | P1 |
| **PM-6** | Assess fork modifications | What needs customizing? Agent identity tracking, skill instructions for avatar patterns, multi-project support, handoff integration | P1 |
| **PM-7** | Context persistence exploration | Explore how task completion feeds persistent context beyond tick-md: handoff summaries, decision records, strategic synthesis | P2 |
| **PM-8** | Document learnings | Record: what works out of the box, what needs forking, what's missing, operational friction points | P1 |

### Decision Gates

| If... | Then... |
|-------|---------|
| tick-md works end-to-end with multi-agent | Mark Phase 2 complete, plan integration |
| MCP conflicts with existing servers | Fall back to CLI-only integration (exec tool) |
| ClawHub skill doesn't load | Manual skill installation + direct MCP config |
| Core functionality fails | Do not adopt — design minimal custom solution using learnings |

### Deliverables

- Validated tick-md fork (standalone repo)
- Installation procedure for any OpenClaw instance
- Phase 2 findings document (capabilities, gaps, friction, modification needs)

---

## Integration: Phase 1 + Phase 2

After both phases complete independently, integrate:

| ID | Title | Description | Priority |
|----|-------|-------------|----------|
| **INT-1** | Install tick-md skill on multi-avatar instance | MCP config for each avatar, `TICK_AGENT_ID` per agent, initialize project boards | P0 |
| **INT-2** | End-to-end validation | Orchestrator creates task → specialist claims via MCP → specialist completes → orchestrator sees result → persists across restart | P0 |
| **INT-3** | Document integration process | Record: installation order preference, configuration dependencies, operational workflow | P1 |

**Key learning:** Running Phases 1 and 2 in parallel reveals whether infra-first or skill-first is the better deployment order. INT-3 captures this for future deployments.

---

## Phase 3: Troop UI

**Goal:** Design and build a web interface based on operational learnings from Phases 1, 2, and integration.

**Input:** Findings documents from Phases 1 and 2, real operational data.
**Output:** Web dashboard for troop management in the godinez-ai project.

**Always last. Scope defined by learnings, not assumptions.**

### Tickets (Proposed — Refined After Phases 1+2)

| ID | Title | Description | Priority |
|----|-------|-------------|----------|
| **UI-1** | Define requirements from operational learnings | What does the operator need to see? What questions do they ask? What's CLI-only management missing? | P0 |
| **UI-2** | Design data bridge | How does instance state flow to the web app? Sync mechanism, latency requirements, data shape | P0 |
| **UI-3** | Convex schema for troop data | Tables based on actual data shapes from Phases 1+2 | P0 |
| **UI-4** | Troop dashboard MVP | `/troop` route in godinez-ai, scope determined by UI-1 | P1 |
| **UI-5** | Interaction model | Read-only vs bidirectional? Based on operational needs | P1 |
| **UI-6** | Agent visualization design | Color coding, status indicators, role representation | P2 |

### Deliverables

- `/troop` page in godinez-ai (Next.js + Convex + Tailwind)
- Convex schema and functions for troop data
- Phase 3 findings document

---

## Phase Sequencing

```
Phase 1: Agent Infrastructure    ████████████░░░░░░░░
Phase 2: Project Management      ████████████░░░░░░░░
                                 (parallel)
Integration                      ░░░░░░░░░░░░████░░░░
Phase 3: Troop UI                ░░░░░░░░░░░░░░░░████
```

Each phase produces a findings document. Phase 3 scope is shaped by all prior findings.

---

## Template Usage

For future agent deployments, this plan repeats as:

1. **Phase 1** with new avatar roster and instance details
2. **Phase 2** skipped if tick-md fork is already validated (just install)
3. **Integration** with instance-specific configuration
4. **Phase 3** if the deployment needs a UI (not all will)

---

## What This Plan Defers

- Additional avatars beyond initial cap (requires memory validation first)
- Context Pyramid full implementation (explored in PM-7, scoped separately)
- Hashtag routing service (orchestrator handles routing via workspace instructions)
- Swap memory (removed — incremental deployment, instance upgrade if needed)
- Multi-instance coordination (single instance per deployment for now)
- Production auth for UI (password gate sufficient for internal use)

---

## First Deployment: K7 (Kukulcán)

For reference, the first deployment uses these parameters:

| Parameter | Value |
|-----------|-------|
| Instance | K7 (c7i-flex.large, 3.7 GB RAM) |
| Agent identity | Kukulcán |
| Avatar count | 2 (CEO + CTO) |
| CEO role | Hustler 50%, Hipster 30%, Hacker 20% |
| CTO role | Hacker 50%, Hipster 30%, Hustler 20% |
| Model | `anthropic/claude-opus-4-6` (both) |
| tick-md fork | TBD (fruteroclub org) |
| Troop UI | godinez-ai `/troop` route |
| Memory gate | RSS < 2.5 GB for 2 avatars |
| Fallback | Upgrade to c7i-flex.xlarge (~$30/mo more) |

---

## References

- [01 — OpenClaw Multi-Agent Capabilities](01-openclaw-multi-agent-capabilities.md)
- [02 — Architecture Impact Analysis](02-architecture-impact-analysis.md)
- [03 — Implementation Roadmap](03-implementation-roadmap.md)
- [04 — Kukulcán Avatar System Plan](04-kukulcan-avatar-system-plan.md)
- [05 — Plan Review Report](05-plan-review-report.md)
- [06 — TICK.md Initial Assessment](06-tick-md-initial-assessment.md)
