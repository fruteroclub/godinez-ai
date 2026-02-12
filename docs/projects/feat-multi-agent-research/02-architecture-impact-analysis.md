# 02 — Architecture Impact Analysis

*Sources: docs/architecture-initial-research/02-platform-concepts.md, 08-cost-model.md, K7 incident postmortem*

---

## Current Model: One Instance Per Agent (Burrito)

Today, every Godinez agent gets its own EC2 instance:

```
Customer A → Burrito A (c7i-flex.large) → 1 OpenClaw gateway → 1 agent
Customer B → Burrito B (c7i-flex.large) → 1 OpenClaw gateway → 1 agent
Customer C → Burrito C (t3.small)       → 1 OpenClaw gateway → 1 agent
```

**Infrastructure cost per agent:** $19–30/mo (before LLM costs).

This model was chosen for maximum isolation: no shared state, no cross-agent leakage, simple failure domains. It's correct for the alpha phase with <25 agents.

---

## Proposed Model: Agent Troops (Multi-Agent Per Instance)

OpenClaw multi-agent enables a new deployment topology:

```
Customer A ─┐
Customer B ──┼→ Troop Instance (c7i-flex.large) → 1 OpenClaw gateway → N agents
Customer C ─┘
```

Multiple agents share one EC2 instance, one Node.js process, and one gateway port. Each agent maintains full logical isolation (workspace, sessions, auth, tools).

---

## Cost Impact

### Infrastructure Savings

| Agents per Instance | Instance Cost | Per-Agent Infra Cost | Savings vs 1:1 |
|--------------------:|-------------:|-----------------------:|:--------------:|
| 1 (current) | $30/mo | $30/mo | — |
| 2 | $30/mo | $15/mo | 50% |
| 3 | $30/mo | $10/mo | 67% |
| 5 | $30/mo | $6/mo | 80% |

### Fleet Projections (Infrastructure Only)

| Fleet Size | Current (1:1) | Troops (3:1) | Troops (5:1) | Savings |
|-----------:|--------------:|-------------:|-------------:|--------:|
| 10 agents | $300/mo | $120/mo | $60/mo | $180–240 |
| 25 agents | $750/mo | $270/mo | $150/mo | $480–600 |
| 50 agents | $1,500/mo | $510/mo | $300/mo | $990–1,200 |
| 100 agents | $3,000/mo | $1,020/mo | $600/mo | $1,980–2,400 |

> At 50+ agents, Troops saves $1,000–1,200/mo in infrastructure alone.

### LLM Costs (Unchanged)

LLM API costs are per-token and scale with usage, not deployment topology. Multi-agent does not affect LLM costs.

### Secrets Manager Impact

With 1:1, each instance needs its own secrets (~$0.50/agent/mo). With Troops, secrets can be injected once per instance and shared via agent-level auth profiles — savings are marginal (~$0.30/agent/mo) but simplify operations.

---

## Isolation Trade-offs

| Property | 1:1 (Current) | Troops (Multi-Agent) | Risk Level |
|----------|:-:|:-:|:-:|
| Workspace isolation | OS-level | Directory-level | Low |
| Session isolation | OS-level | Application-level | Low |
| Auth isolation | OS-level | Config-level | **Low** (separate keys) |
| Memory isolation | Full (separate VM) | Shared process | **Medium** |
| CPU isolation | Full (separate VM) | Shared event loop | **Medium** |
| Failure domain | One agent | All agents on instance | **High** |
| Credential leakage risk | Impossible | Filesystem access | **Medium** |

### The Critical Trade-off: Failure Domain

In the 1:1 model, if Agent A's process crashes, only Agent A is affected. In Troops, if the shared Node.js process crashes (OOM, unhandled exception), **all agents on that instance go down simultaneously**.

This is the same class of failure as the Feb 7 incident — one failure cascading to affect all agents.

**Mitigations:**

1. **Mandatory swap** — 4 GB swap prevents OOM kills (already an outstanding item)
2. **Agent density limits** — Cap agents per instance based on RAM (see below)
3. **Session rotation** — Prevent session bloat that contributed to Feb 7
4. **Watchdog restarts** — systemd `Restart=always` recovers the process in seconds
5. **Health monitoring per agent** — Detect individual agent degradation even when the process is up

### Recommended Density Limits

| Instance Type | RAM | Max Agents | Rationale |
|---------------|----:|----------:|-----------|
| `t3.small` | 2 GB | 2 | Minimal headroom, credit throttling risk |
| `c7i-flex.large` | 3.7 GB | 3–4 | ~800 MB per agent + gateway overhead |
| `c7i-flex.xlarge` | 8 GB | 8–10 | Comfortable headroom |

These are conservative estimates. OpenClaw's per-agent memory footprint is primarily session data (JSON in memory). Agents with small sessions and Haiku/Sonnet models use significantly less than Opus-heavy agents.

---

## Provisioning Impact

### Current Provisioning Flow (1:1)

```
Order received → Launch EC2 → cloud-init → Install OpenClaw → Inject config → Start gateway
```

Each agent = one provisioning event. Simple but slow (~3–5 minutes per agent).

### Troops Provisioning Flow

Two new operations needed:

```
1. Instance provisioning (unchanged):
   Launch EC2 → cloud-init → Install OpenClaw → Start gateway (empty)

2. Agent injection (new — hot-add):
   API call → Write agent config → Write workspace → Reload gateway → Agent live
```

**Key architectural change:** The Burrito.gg control plane must support **hot-adding agents** to a running instance without restarting the gateway or affecting existing agents.

OpenClaw supports this via:
- Config reload: `openclaw agents add <id> --workspace <path>` (or edit config + SIGHUP)
- Runtime API: Gateway exposes an HTTP management endpoint for agent lifecycle

### New Control Plane Responsibilities

| Responsibility | 1:1 | Troops |
|----------------|-----|--------|
| Instance selection | N/A (always new) | **Bin-packing: select instance with capacity** |
| Agent placement | N/A | **Track which agents are on which instances** |
| Agent migration | N/A | **Move agent from one instance to another** |
| Capacity monitoring | Per-instance health | **Per-agent + per-instance health** |
| Teardown | Terminate instance | **Remove agent config, optionally terminate if empty** |

---

## Impact on Priority Stack

From [01-strategy-and-requirements](../architecture-initial-research/01-strategy-and-requirements.md):

| Priority | Impact | Assessment |
|----------|--------|------------|
| 1. **Costos** | Major improvement — 50–80% infra savings | Strong positive |
| 2. **Seguridad** | Moderate risk — agents share filesystem | Manageable with sandbox `mode: "off"` + OS permissions |
| 3. **Privacidad** | Low risk — logical isolation via workspaces | Acceptable for alpha |
| 4. **Disponibilidad** | Increased blast radius — shared failure domain | Mitigated by swap + watchdog + density limits |
| 5. **Confiabilidad** | Neutral — same OpenClaw runtime | No change |
| 6. **Desempeño** | Slight risk — shared CPU/RAM under contention | Density limits prevent degradation |

**Net assessment: Positive.** Cost savings (Priority 1) are substantial. Risks to Security (P2) and Availability (P4) are manageable with straightforward mitigations.

---

## New Product Possibilities

### Agent Troops as a Product Tier

Multi-agent enables a new pricing structure:

| Tier | Model | Value Proposition |
|------|-------|-------------------|
| **Solo** | 1:1 (current) | Maximum isolation, dedicated resources |
| **Troop** | N:1 (multi-agent) | Lower cost, shared instance, logical isolation |
| **Swarm** | N:1 + sub-agents | Agent coordination, orchestrator patterns |

### Concrete Use Cases for Latin American SMBs

1. **WhatsApp + Instagram agents on one instance** — Same business, different channels, one bill
2. **Multi-language agents** — Spanish agent + English agent, routed by customer language
3. **Role-based agents** — Sales agent (friendly, proactive) + Support agent (technical, careful) on different channels
4. **Shift-based routing** — Route to different agent personas based on time of day (via binding rules)
5. **Manager + Assistant** — Orchestrator agent delegates to specialist sub-agents for research, writing, scheduling

---

## Risks and Open Questions

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Shared process OOM kills all agents | High | Swap, density limits, session rotation |
| Config error takes down all agents | Medium | Config validation, staged rollout |
| One noisy agent starves others | Medium | `maxConcurrent` per agent, model-tier routing |
| Credential access across agents | Low | Separate auth-profiles.json per agent, OS file permissions |
| Monitoring complexity | Low | Per-agent health checks (cognitive + process) |

### Open Questions

1. **Does OpenClaw support hot-reload of agent config without gateway restart?** (Likely yes via SIGHUP or management API — needs testing)
2. **What happens to in-flight sessions when a new agent is added?** (Expected: no impact — needs verification)
3. **Can agents on the same instance share a bot token but maintain separate sessions?** (Yes — routing handles this. But one bot token = one Telegram bot identity.)
4. **What's the actual memory footprint per agent under realistic load?** (Needs benchmarking on c7i-flex.large with 2–4 agents)
5. **How does session compaction behave per-agent vs per-gateway?** (Config says `compaction.mode: "safeguard"` — is this per-agent or global?)
