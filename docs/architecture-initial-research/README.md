# Architecture Initial Research

This directory captures the initial architecture research phase for the Godinez.AI agent platform. These documents record the decisions, trade-offs, cost models, and infrastructure design that informed the Burrito.gg platform architecture.

**Context:** Godinez.AI is the product layer (landing page, waitlist, customer portal). Burrito.gg is the infrastructure layer that provisions and manages autonomous AI agents. OpenClaw is the agent runtime.

**Time period:** January–February 2026

---

## Documents

| # | Document | Description |
|---|----------|-------------|
| 01 | [Strategy and Requirements](01-strategy-and-requirements.md) | North star, pricing tiers, margin targets, architecture priorities |
| 02 | [Platform Concepts](02-platform-concepts.md) | Burrito/Filling/Tortilla terminology, system stack, isolation model |
| 03 | [Tortilla AMI Spec](03-tortilla-ami-spec.md) | AMI layering, instance tiers, EBS/swap/security group specs |
| 04 | [Provisioning Pipeline](04-provisioning-pipeline.md) | Instance lifecycle, cloud-init flow, secrets, health checks |
| 05 | [API Surface](05-api-surface.md) | REST endpoints, request/response schemas, authentication |
| 06 | [Monitoring and Observability](06-monitoring-and-observability.md) | CloudWatch metrics, agent health signals, alerting, dashboards |
| 07 | [Security Model](07-security-model.md) | SSM, Secrets Manager, IAM, network isolation, OS hardening |
| 08 | [Cost Model](08-cost-model.md) | Per-agent costs, LLM estimates, margin analysis, fleet projections |
| 09 | [AWS Services Inventory](09-aws-services-inventory.md) | Complete AWS service list with justifications and architecture decisions |
| 10 | [Implementation Phases](10-implementation-phases.md) | 5-phase rollout plan and future considerations |

---

## Source Material

These documents were consolidated from:
- `burrito-gg/docs/ARCHITECTURE.md` — Platform architecture spec
- `burrito-gg/docs/RUNBOOK.md` — Manual provisioning guide
- `burrito-gg/CLAUDE.md` and `README.md` — Project context
- `godinez-strategy-launch.md` — Launch strategy and pricing
- `frutero-strategy-q1-2026.md` — Q1 2026 strategic plan
- Kukulcan (K7) production server — reference implementation and incident learnings
