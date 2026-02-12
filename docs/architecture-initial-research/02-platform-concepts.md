# 02 — Platform Concepts

*Sources: burrito-gg CLAUDE.md, burrito-gg README.md, ARCHITECTURE.md §2–3*

---

## Terminology

| Term | Meaning |
|------|---------|
| **Burrito** | A VPS instance running one OpenClaw agent. The atomic unit of deployment. |
| **Filling** | The agent's configuration and identity: SOUL.md, MEMORY.md, API keys, bot tokens, model chain preferences. |
| **Tortilla** | The OpenClaw runtime layer — Node.js, pnpm, systemd service, gateway process. Identical across all Burritos. |
| **Order** | A deployment request. Specifies the Filling; the platform provides the Tortilla. |
| **Wrap** | The provisioning process: taking a Filling, wrapping it in a Tortilla, producing a ready Burrito. |
| **Unwrap** | Teardown: stopping the agent, archiving session data, terminating the instance. |

---

## System Stack

```
Godinez.AI (product layer)
    │
    ▼
Burrito.gg (infrastructure layer / control plane)
    │
    ▼
AWS EC2 (compute)
    │
    ▼
OpenClaw (agent runtime)
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| **Godinez.AI** | User-facing platform. Collects agent config (soul, channels, preferences). Sends Orders to Burrito.gg. |
| **Burrito.gg API** | Control plane. Receives Orders, provisions EC2 instances, injects config, monitors health. |
| **AWS EC2** | Compute. Each Burrito is one EC2 instance. Cloud-init bootstraps the Tortilla. |
| **OpenClaw** | Agent runtime. Manages LLM calls, channels (Telegram/Discord), sessions, tools. |
| **AWS Secrets Manager** | Credential store. API keys and bot tokens — never baked into AMIs or user data. |

---

## One-Instance-Per-Agent Isolation Model

Every agent gets its own EC2 instance. No shared state between instances.

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Burrito A       │  │  Burrito B       │  │  Burrito C       │
│  EC2 i-aaa       │  │  EC2 i-bbb       │  │  EC2 i-ccc       │
│  SG: sg-aaa      │  │  SG: sg-bbb      │  │  SG: sg-ccc      │
│  Keys: own set   │  │  Keys: own set   │  │  Keys: own set   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         └────────────────────┴────────────────────┘
                         No shared state
```

**Why one instance per agent?** Simplest isolation model. Each agent has its own compute, memory, disk, credentials, network rules, and session data. No cross-agent data leakage is possible at the infrastructure level.

---

## Lessons Learned from K7 (Kukulcan Reference Implementation)

The first Burrito is the Kukulcan server — an `t3.small` instance running OpenClaw with Opus/Sonnet/Haiku on Telegram. Operating K7 in production since early 2026 established four mandatory rules:

### The 4 Mandatory Rules

1. **Dual API keys are mandatory** — A single credential across all model fallbacks is a single point of failure. When the key enters cooldown, every model tier fails simultaneously. (Root cause of the [Feb 7 incident](../../KUKULCAN-INCIDENT-POSTMORTEM-2026-02-07.md).)

2. **4 GB swap is mandatory** — Running without swap on a 2–4 GB instance with a process that peaks at 2.8 GB RSS is reckless. The OOM killer strikes without warning.

3. **Session rotation matters** — Sessions over 2 MB / 50K tokens degrade tool-call quality. The agent produces malformed calls, orphaned messages, and eventually locks up.

4. **Process availability ≠ cognitive availability** — The agent process can be running (systemd says "active") while the LLM backend is unreachable. Monitoring must check both.
