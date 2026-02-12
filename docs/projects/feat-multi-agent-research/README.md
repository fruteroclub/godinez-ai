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

---

## Source Material

- OpenClaw v2026.2.9 documentation and configuration schema
- [OpenClaw Multi-Agent Routing docs](https://docs.openclaw.ai/concepts/multi-agent)
- [OpenClaw GitHub repository](https://github.com/openclaw/openclaw)
- Kukulcan (K7) production server — reference implementation
- `docs/architecture-initial-research/` — existing platform architecture (Burrito.gg model)
- [Feb 7 incident postmortem](../../../KUKULCAN-INCIDENT-POSTMORTEM-2026-02-07.md) — single-key failure mode
