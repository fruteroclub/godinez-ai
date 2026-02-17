# Agent Troops — Multi-Agent Support Research

This directory contains the research and technical exploration for the **Agent Troops** feature: enabling multiple AI agents to run within a single OpenClaw gateway instance.

**Feature context:** Godinez.AI currently provisions one EC2 instance per agent (the Burrito model). OpenClaw natively supports running multiple isolated agents in a single gateway process. Agent Troops explores whether and how to leverage this capability to reduce infrastructure costs, enable agent coordination, and offer new product tiers.

**Time period:** February 2026

---

## Documents

| # | Document | Description |
|---|----------|-------------|
| 01 | [OpenClaw Multi-Agent Capabilities](01-openclaw-multi-agent-capabilities.md) | What OpenClaw supports natively: routing, isolation, sandboxing, sub-agents |
| 02 | [Architecture Impact Analysis](02-architecture-impact-analysis.md) | How multi-agent changes the Burrito model: cost, isolation, provisioning |
| 03 | [Implementation Roadmap](03-implementation-roadmap.md) | Phased rollout plan, effort estimates, prerequisites, and go/no-go criteria |
| 04 | [Kukulcán Avatar System Plan](04-kukulcan-avatar-system-plan.md) | Concrete implementation plan for K7 multi-avatar orchestrator-specialist setup |
| 05 | [Plan Review Report](05-plan-review-report.md) | Technical review of doc 04: corrections, risks, swap memory analysis, Context Pyramid and Kanban concepts |
| 06 | [TICK.md Initial Assessment](06-tick-md-initial-assessment.md) | Evaluation of [tick-md](https://github.com/Purple-Horizons/tick-md) for multi-agent task coordination |
| 07 | [Multi-Agent Implementation Plan](07-multi-agent-implementation-plan.md) | Agent-agnostic, phased implementation plan: Agent Infra + tick-md Skill (parallel) → Troop UI |

---

## Source Material

- OpenClaw v2026.2.9 documentation and configuration schema
- [OpenClaw Multi-Agent Routing docs](https://docs.openclaw.ai/concepts/multi-agent)
- [OpenClaw GitHub repository](https://github.com/openclaw/openclaw)
- Kukulcan (K7) production server — reference implementation
- `docs/architecture-initial-research/` — existing platform architecture (Burrito.gg model)
- [Feb 7 incident postmortem](../../../KUKULCAN-INCIDENT-POSTMORTEM-2026-02-07.md) — single-key failure mode
