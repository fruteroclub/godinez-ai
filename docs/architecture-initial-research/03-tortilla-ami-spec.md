# 03 — Tortilla AMI Spec

*Sources: ARCHITECTURE.md §6.2, RUNBOOK.md §2–5*

---

## AMI Layering

The Tortilla AMI is built with Packer and contains everything needed to boot into a working agent — only the Filling (agent-specific config) needs injection at boot. Both instance tiers use the same AMI (x86_64).

### Layer 1 — OS Hardening

- Ubuntu 24.04 LTS (x86_64)
- 4 GB swap file (`/swapfile`), enabled in `/etc/fstab`
- UFW: deny incoming, allow outgoing, allow SSH
- SSH: password auth disabled, key-only
- Unattended security upgrades enabled

### Layer 2 — Agent User

- `agent` user created (generic, not agent-specific)
- `loginctl enable-linger agent` for persistent user services
- Home directory: `/home/agent`

> **Why `agent` instead of the agent's name?** A generic username makes the AMI reusable across all agents. The agent's identity lives in workspace files (SOUL.md, IDENTITY.md), not the Unix account.

### Layer 3 — Runtime

- NVM installed under `agent` user
- Node.js v24 LTS (via NVM)
- pnpm (global)
- OpenClaw (global via `pnpm install -g openclaw`)

### Layer 4 — OpenClaw Scaffolding

- `openclaw onboard --non-interactive` creates the directory tree:

```
/home/agent/.openclaw/
├── openclaw.json              # Template — overwritten at boot by Filling
├── agents/main/agent/
│   ├── auth-profiles.json     # Template — injected at boot from Secrets Manager
│   └── sessions/              # Empty — populated at runtime
└── workspace/                 # Skeleton — Filling injected at boot
    ├── MEMORY.md
    ├── SOUL.md
    ├── IDENTITY.md
    ├── memory/
    └── skills/                # Empty — populated at boot if skills specified
```

### Layer 5 — Service Template

- Systemd user service unit at `/home/agent/.config/systemd/user/openclaw-gateway.service`
- Paths templated for the `agent` user
- Service **enabled but not started** (starts after Filling injection at boot)

---

## What's Baked vs. What's Injected

| Baked in AMI (Tortilla) | Injected at Boot (Filling) |
|-------------------------|---------------------------|
| OS + security hardening | Agent identity (SOUL.md, MEMORY.md, IDENTITY.md) |
| Swap file (4 GB) | API credentials (Anthropic keys) |
| Node.js + pnpm + OpenClaw | Bot tokens (Telegram, Discord) |
| Directory structure | openclaw.json (model chain, channels, gateway config) |
| Systemd service unit | Skills (registry + custom) |
| UFW firewall rules | — |

> **Why bake swap into the AMI?** Cloud-init swap creation adds ~10 seconds to boot. Pre-baking means memory-safe from the first second. The 4 GB swap is mandatory for both tiers — even the 4 GB RAM instance needs headroom when the agent peaks at 2.8 GB RSS.

---

## Instance Tiers

| Tier | Instance | vCPUs | RAM | CPU Model | Monthly | Use Case |
|------|----------|-------|-----|-----------|---------|----------|
| **Intern** | `t3.small` | 2 | 2 GB | Burstable (credit-based) | ~$15 | Dev/test, lightweight agents, low traffic |
| **Standard** | `c7i-flex.large` | 2 | 4 GB | Intel Sapphire Rapids (sustained) | ~$26 | Production agents, heavy Opus usage |

> **Why c7i-flex over t3?** `t3` instances use CPU credits — sustained LLM processing can burn through credits and throttle to 20–40% baseline. `c7i-flex.large` provides 2 full vCPUs at sustained speed, newer silicon, and is cheaper than `t3.medium` (~$26/mo vs ~$31/mo on-demand).

---

## Instance Specification

| Resource | Intern (`t3.small`) | Standard (`c7i-flex.large`) | Notes |
|----------|--------------------|-----------------------------|-------|
| AMI | Tortilla AMI | Tortilla AMI | Same AMI, both x86_64 |
| EBS | 20 GB gp3 | 20 GB gp3 | Sessions, workspace, logs. ~$1.60/mo |
| Swap | 4 GB swap file | 4 GB swap file | Pre-baked in AMI. Mandatory. |
| Security group | Per-instance | Per-instance | Egress only (HTTPS). No SSH in production. |

---

## AMI Versioning

AMIs are versioned following OpenClaw releases:

```
tortilla-v{openclaw-version}-{build}
```

Example: `tortilla-v2026.2.6-1`

Rebuilt when:
- OpenClaw releases a new version
- Node.js LTS updates
- Ubuntu security patches require AMI refresh
- Infrastructure changes (swap size, directory structure, etc.)
