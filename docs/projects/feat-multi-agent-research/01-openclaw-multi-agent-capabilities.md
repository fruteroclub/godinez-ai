# 01 — OpenClaw Multi-Agent Capabilities

*Sources: OpenClaw v2026.2.9 docs, GitHub, K7 production config, DeepWiki analysis*

---

## Overview

OpenClaw natively supports running **multiple isolated agents within a single gateway process**. Each agent is a fully independent entity with its own workspace, sessions, auth profiles, identity, and tool permissions — but shares the same Node.js process, gateway port, and channel connections.

This is not a third-party plugin or hack. It's a first-class feature of the OpenClaw runtime.

---

## Core Architecture

```
Inbound Message (Telegram / Discord / WhatsApp)
               │
               ▼
    ┌─────────────────────┐
    │   Routing Engine     │  ← binding rules (most-specific wins)
    │   (single gateway)   │
    └─────┬───────┬────────┘
          │       │
          ▼       ▼
    ┌─────────┐ ┌─────────┐
    │ Agent A │ │ Agent B │
    │ Opus    │ │ Sonnet  │
    │ Full    │ │ Sandbox │
    └─────────┘ └─────────┘
```

### What Each Agent Gets (Isolated)

| Component | Isolation Level | Notes |
|-----------|----------------|-------|
| **Workspace** | Full — separate directory | AGENTS.md, SOUL.md, USER.md, local files |
| **Sessions** | Full — separate session store | `~/.openclaw/agents/<id>/sessions/` |
| **Auth profiles** | Full — separate credentials | Independent API keys, cooldowns, rate limits |
| **Identity** | Full — separate persona | Name, emoji, avatar, mention patterns |
| **Model** | Configurable per agent | Can override primary + fallbacks |
| **Tools** | Configurable per agent | Allow/deny lists, tool groups |
| **Sandbox** | Configurable per agent | Off, Docker-based, or shared |

### What Agents Share (Single Process)

| Resource | Sharing Model | Risk |
|----------|---------------|------|
| Node.js process | Single event loop | OOM in one agent kills all |
| Gateway port | Single HTTP listener | N/A (multiplexed) |
| Channel connections | Shared bot tokens | Bot token rotation affects all agents on that channel |
| System resources | Shared CPU/RAM/disk | Resource contention under load |

---

## Configuration Model

Multi-agent is configured in `openclaw.json` via two keys: `agents.list` and `bindings`.

### Minimal 2-Agent Example

```jsonc
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-5",
        "fallbacks": ["anthropic/claude-sonnet-4-5"]
      },
      "maxConcurrent": 4
    },
    "list": [
      {
        "id": "primary",
        "default": true,
        "workspace": "~/.openclaw/workspace",
        "sandbox": { "mode": "off" }
      },
      {
        "id": "secondary",
        "workspace": "~/.openclaw/workspace-secondary",
        "agentDir": "~/.openclaw/agents/secondary/agent",
        "model": "anthropic/claude-sonnet-4-5",
        "sandbox": { "mode": "off" }
      }
    ]
  },
  "bindings": [
    {
      "agentId": "secondary",
      "match": { "channel": "discord" }
    },
    {
      "agentId": "primary",
      "match": { "channel": "telegram" }
    }
  ]
}
```

### CLI Helpers

```bash
openclaw agents add <id> --workspace <path>   # Add new agent
openclaw agents list --bindings               # List agents with routing
openclaw agents delete <id>                   # Remove agent
```

---

## Routing Engine

Bindings use a **most-specific-wins** strategy (similar to CSS specificity):

| Priority | Match Level | Example |
|----------|-------------|---------|
| 1 (highest) | Peer ID (specific DM or group) | `peer: { kind: "group", id: "-100..." }` |
| 2 | Guild ID (Discord server) | `guildId: "146938..."` |
| 3 | Team ID (Slack workspace) | `teamId: "T0..."` |
| 4 | Account ID (WhatsApp account) | `accountId: "biz"` |
| 5 | Channel (broad) | `channel: "discord"` |
| 6 (lowest) | Default agent | `default: true` on agent |

Within each tier, first matching binding wins.

**Key property:** routing is deterministic and stateless. A message always goes to the same agent given the same sender/channel/group context.

---

## Auth Profile Isolation

This is the most operationally significant feature for Godinez.AI.

Each agent maintains its own auth state at `~/.openclaw/agents/<id>/agent/auth-profiles.json`:

```
Agent A: anthropic:key-1 → healthy
Agent B: anthropic:key-2 → in cooldown (rate-limited)
```

**Impact:** If Agent B hits a rate limit and enters cooldown, Agent A continues operating with its own key. This directly solves the [Feb 7 cascading failure](../../../KUKULCAN-INCIDENT-POSTMORTEM-2026-02-07.md) where a single key's cooldown killed all model tiers.

Auth is **not shared** between agents by default. Credentials must be explicitly copied to each agent's auth-profiles.json, or agents can be configured to share credentials (at the cost of shared cooldown state).

---

## Tool Permissions

Tool access follows a **cascade-down** model — each layer can only further restrict, never grant back:

```
Global policy → Provider policy → Agent policy → Sandbox policy → Sub-agent policy
```

### Tool Groups (Shorthands)

| Group | Expands To |
|-------|-----------|
| `group:fs` | read, write, edit, apply_patch |
| `group:sessions` | sessions_list, sessions_history, sessions_spawn, sessions_send |
| `group:ui` | browser, canvas |
| `group:automation` | cron, gateway |

### Per-Agent Restriction Example

```jsonc
{
  "id": "public-facing",
  "tools": {
    "allow": ["group:fs", "group:sessions"],
    "deny": ["exec", "browser", "gateway"]
  }
}
```

---

## Sandboxing (Optional — Requires Docker)

Sandboxing provides OS-level isolation via Docker containers. Three scope levels:

| Scope | Behavior | Resource Cost |
|-------|----------|---------------|
| `"shared"` | All agents share one Docker container | Low (~50 MB) |
| `"agent"` | Each agent gets its own container | Medium (~50-150 MB per agent) |
| `"session"` | Each session gets its own container | High (per-session overhead) |

**For Godinez.AI on c7i-flex.large (3.7 GB RAM): sandboxing is not recommended.** The memory overhead of Docker containers is significant on constrained instances. Logical isolation (separate workspaces, sessions, auth) is sufficient when the platform operator controls who connects to each agent.

Sandbox mode `"off"` provides zero overhead.

---

## Sub-Agent System (Agent-to-Agent Coordination)

OpenClaw supports spawning **sub-agents** for parallel work within a session:

| Tool | Purpose |
|------|---------|
| `sessions_spawn` | Spawn a background sub-agent |
| `sessions_send` | Message another agent's session |
| `sessions_list` | Discover active sessions |
| `sessions_history` | Fetch transcript from another session |

### Orchestrator Pattern

```
User message → Orchestrator Agent
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
     Researcher   Coder    Writer
     (sub-agent)  (sub)    (sub)
          │         │         │
          └─────────┼─────────┘
                    ▼
            Combined response
```

### Constraints

- Sub-agents **cannot nest** (no sub-sub-agents)
- Sub-agent work is **lost on gateway restart** (best-effort)
- Agent-to-agent messaging is **off by default** — must be explicitly enabled
- Must allowlist which agents can communicate with each other
- Shared gateway process resources — use `maxConcurrent` as safety valve

---

## Config Includes (Large Setups)

For configurations with many agents, OpenClaw supports file includes:

```jsonc
{
  "agents": { "$include": "./agents.json5" },
  "bindings": { "$include": "./bindings.json5" }
}
```

This enables templated provisioning — the control plane can generate per-customer agent configs and merge them into a single gateway.

---

## Version Requirements

| Requirement | Minimum |
|-------------|---------|
| OpenClaw | v2026.2.0+ (multi-agent routing) |
| Node.js | v22+ |
| Docker | Only if using sandbox mode |
| OS | Any Linux (Ubuntu 22.04+ recommended) |

The K7 reference server currently runs OpenClaw 2026.2.2-3 (config) but the installed binary is 2026.2.9. Multi-agent is fully supported on both versions.
