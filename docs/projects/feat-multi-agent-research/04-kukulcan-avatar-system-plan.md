# 04 — Kukulcán Avatar System — Implementation Plan

*Sources: OpenClaw v2026.2.9 docs, K7 production config, multi-agent research (docs 01–03)*

---

## Problem Statement

Kukulcán (K7) currently operates as a single-role agent — "Founder Executive Assistant." To be effective as CPO of Frutero LLC, K7 needs to operate across multiple executive functions (CTO, CFO, PMO, BD) with **domain-specific depth** while maintaining **unified strategic awareness**.

A single agent with one session context can't hold deep technical architecture knowledge AND financial models AND partnership pipelines simultaneously without context degradation.

## Proposed Solution: Avatar System

Multiple "avatars" of the same Kukulcán identity, each with a dedicated executive role, orchestrated by a CEO avatar that maintains the strategic overview.

### Key Principle: Context Pyramid

```
        ┌─────────┐
        │   CEO   │  ← Broad, shallow: strategic summaries
        │ (main)  │     from all specialist avatars
        └────┬────┘
     ┌───────┼───────┬──────────┐
     ▼       ▼       ▼          ▼
  ┌─────┐ ┌─────┐ ┌─────┐ ┌──────┐
  │ CTO │ │ CFO │ │ PMO │ │  BD  │  ← Deep, narrow: domain-
  └─────┘ └─────┘ └─────┘ └──────┘    specific persistent context
```

The CEO never needs to know *how* a database migration works — only that the CTO decided to migrate and what the strategic implications are.

---

## Architecture: Hybrid Orchestrator-Specialist

```
User (Telegram/Discord) → CEO (main agent, default)
                              │ detects #cto / #cfo / #pmo / #bd
                              ├─→ sessions_spawn(agentId: "cto", task: "...")
                              ├─→ sessions_spawn(agentId: "cfo", task: "...")
                              ├─→ sessions_spawn(agentId: "pmo", task: "...")
                              └─→ sessions_spawn(agentId: "bd", task: "...")
                                     ↑ announces results back to CEO
```

### Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Routing model** | CEO receives all messages | Hashtag switching requires content parsing, which OpenClaw routing can't do (it's channel/peer-based). CEO workspace instructions handle delegation. |
| **Agent isolation** | `agents.list` (true multi-agent) | Sessions persist across gateway restarts. Sub-agents alone would lose context on restart. |
| **Delegation mechanism** | `sessions_spawn` with `agentId` | Spawns specialist in background, announces results when complete. Non-blocking. |
| **Context pyramid** | Structured handoffs + `sessions_history` | CEO reads specialist session summaries, extracts strategic implications, discards implementation details. |
| **Identity sharing** | Symlinked SOUL.md | Same Kukulcán voice and persona. Only IDENTITY.md and AGENTS.md differ per role. |
| **Sandboxing** | Off (no Docker) | 3.7 GB RAM is too constrained for Docker containers. Logical isolation via separate workspaces is sufficient. |
| **Model allocation** | Opus for CEO+CTO, Sonnet for CFO+PMO+BD | Technical reasoning requires Opus depth. Financial, program, and BD work is pattern-based — Sonnet handles it well at lower cost. |

### What Each Avatar Gets (Isolated)

| Component | Isolation |
|-----------|-----------|
| Workspace | Separate directory (`~/.openclaw/workspace-<role>/`) |
| Sessions | Separate store (`~/.openclaw/agents/<role>/sessions/`) |
| Auth profiles | Copied per agent (shared key, independent cooldown state) |
| IDENTITY.md | Role-specific focus and scope |
| AGENTS.md | Role-specific operating instructions |
| MEMORY.md | Domain-specific long-term memory |

### What Avatars Share

| Resource | Sharing Model |
|----------|---------------|
| SOUL.md | Symlinked from main workspace (one identity) |
| API key | Same Anthropic key (copied to each agent's auth-profiles) |
| Node.js process | Single gateway process |
| Channel connections | Same Telegram bot, same Discord bot |

---

## Avatar Roster

| Avatar | Agent ID | Model | Trigger | Scope |
|--------|----------|-------|---------|-------|
| **CEO** | `main` | Opus 4.5 | Default (all messages) | Strategic orchestration, high-level decisions, context pyramid |
| **CTO** | `cto` | Opus 4.5 | `#cto` | Technical architecture, code, infrastructure, security |
| **CFO** | `cfo` | Sonnet 4.5 | `#cfo` | Financial planning, unit economics, pricing, cost optimization |
| **PMO** | `pmo` | Sonnet 4.5 | `#pmo` | Roadmap, delivery, sprint coordination, team velocity |
| **BD** | `bd` | Sonnet 4.5 | `#bd` | Partnerships, market research, competitive intelligence, customer acquisition |

---

## Implementation Steps

### Step 1: Prerequisites (~10 min)

| Task | Command | Why |
|------|---------|-----|
| Add 4 GB swap | `sudo fallocate -l 4G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile` | Multi-agent on 3.7 GB RAM needs swap. Outstanding from Feb 7 incident. |
| Persist swap | Add to `/etc/fstab`: `/swapfile swap swap defaults 0 0` | Survive reboots |
| Backup config | `cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.pre-avatars` | Rollback safety |

### Step 2: Create directories and copy auth (~5 min)

```bash
# Create specialist workspaces
mkdir -p ~/.openclaw/{workspace-cto,workspace-cfo,workspace-pmo,workspace-bd}

# Create specialist agent directories (state + sessions)
mkdir -p ~/.openclaw/agents/{cto,cfo,pmo,bd}/{agent,sessions}

# Copy auth profiles (shared key, independent cooldown tracking)
for agent in cto cfo pmo bd; do
  cp ~/.openclaw/agents/main/agent/auth-profiles.json \
     ~/.openclaw/agents/$agent/agent/auth-profiles.json
done

# Symlink SOUL.md to all specialist workspaces
for ws in workspace-cto workspace-cfo workspace-pmo workspace-bd; do
  ln -s ~/.openclaw/workspace/SOUL.md ~/.openclaw/$ws/SOUL.md
done
```

### Step 3: Update `openclaw.json` (~10 min)

Add `agents.list` array with all 5 agents:

```jsonc
{
  "agents": {
    "defaults": { /* keep existing */ },
    "list": [
      {
        "id": "main",
        "default": true,
        "workspace": "/home/kukulcan/.openclaw/workspace",
        "subagents": {
          "maxConcurrent": 8,
          "allowAgents": ["cto", "cfo", "pmo", "bd"]
        }
      },
      {
        "id": "cto",
        "workspace": "/home/kukulcan/.openclaw/workspace-cto",
        "agentDir": "/home/kukulcan/.openclaw/agents/cto/agent",
        "model": {
          "primary": "anthropic/claude-opus-4-5",
          "fallbacks": ["anthropic/claude-sonnet-4-5"]
        }
      },
      {
        "id": "cfo",
        "workspace": "/home/kukulcan/.openclaw/workspace-cfo",
        "agentDir": "/home/kukulcan/.openclaw/agents/cfo/agent",
        "model": "anthropic/claude-sonnet-4-5"
      },
      {
        "id": "pmo",
        "workspace": "/home/kukulcan/.openclaw/workspace-pmo",
        "agentDir": "/home/kukulcan/.openclaw/agents/pmo/agent",
        "model": "anthropic/claude-sonnet-4-5"
      },
      {
        "id": "bd",
        "workspace": "/home/kukulcan/.openclaw/workspace-bd",
        "agentDir": "/home/kukulcan/.openclaw/agents/bd/agent",
        "model": "anthropic/claude-sonnet-4-5"
      }
    ]
  }
}
```

**No bindings changes needed** — CEO (`main`) is default and receives all messages.

### Step 4: Create specialist workspace files (~30 min)

Each specialist workspace gets 3 new files (SOUL.md is symlinked):

**IDENTITY.md** — Role-specific identity within Kukulcán persona
**AGENTS.md** — Operating instructions, handoff protocol, session lifecycle
**MEMORY.md** — Domain-specific long-term memory (starts minimal)

#### Template: Specialist AGENTS.md

```markdown
# AGENTS.md — [Role] Avatar Operating Instructions

## Session Start
1. Read spawn context from CEO
2. Read MEMORY.md for domain state
3. Read relevant project files as needed

## During Session
- Maintain [domain] precision
- Document key decisions
- Consider [domain-specific priorities]

## Session End — ALWAYS provide handoff:

## Handoff to CEO

**Task:** [what CEO requested]
**Outcome:** [what was delivered]
**Key Decisions:**
- [Decision with rationale]

**Context for CEO:** [strategic implications only]
**Follow-up:** [pending items]
**CEO Action Required:** [yes/no]

## Communication
Same Kukulcán voice. [Role]-specific depth added.
```

#### Role-Specific Focus per IDENTITY.md

| Avatar | Technical Focus | Key Responsibilities |
|--------|----------------|---------------------|
| CTO | Architecture, code, infra, DevOps | System design, code quality, technical feasibility, build vs buy |
| CFO | Financial models, unit economics | Pricing strategy, margin analysis, cost optimization, revenue modeling |
| PMO | Roadmaps, delivery metrics | Sprint planning, milestone tracking, team coordination, timeline management |
| BD | Market, partnerships, customers | Partnership pipeline, competitive analysis, customer acquisition, market research |

### Step 5: Create CEO `AVATARS.md` (~15 min)

New file at `~/.openclaw/workspace/AVATARS.md` that teaches the CEO:

1. **Avatar roster** — who does what, which model, which triggers
2. **Delegation protocol** — detect hashtags → `sessions_spawn(agentId, task)` → wait for announce
3. **When to delegate vs handle directly** — simple questions stay with CEO, domain-deep work goes to specialists
4. **Context pyramid maintenance** — after specialist completes, extract strategic implications, update CEO memory
5. **Handoff template** — what CEO expects back from specialists

#### Delegation Flow (CEO Perspective)

```
1. User sends: "#cto review the godinez.ai authentication flow"
2. CEO detects #cto hashtag
3. CEO calls: sessions_spawn({
     agentId: "cto",
     task: "Review godinez.ai authentication flow. [user context]",
     label: "godinez-auth-review",
     cleanup: "keep"
   })
4. CEO responds: "delegating to our cto avatar — reviewing with full technical context"
5. CTO works in isolated session, announces result
6. CEO synthesizes for user, updates own memory with strategic implications
```

### Step 6: Test and validate (~15 min)

```bash
# 1. Validate JSON
cat ~/.openclaw/openclaw.json | jq empty

# 2. Restart gateway
systemctl --user restart openclaw-gateway.service

# 3. Check startup
journalctl --user -u openclaw-gateway.service --since "1 min ago" --no-pager

# 4. Verify agents
openclaw agents list

# 5. Test delegation (send via Telegram):
#    "hello" → CEO responds
#    "#cto what is the godinez.ai tech stack?" → CEO delegates to CTO

# 6. Check memory
free -h
```

#### Success Criteria

- [ ] `openclaw agents list` shows 5 agents
- [ ] CEO responds normally to regular messages
- [ ] `#cto` message triggers delegation via `sessions_spawn`
- [ ] CTO response includes technical depth + structured handoff
- [ ] Gateway restart recovers all agents cleanly
- [ ] Memory < 3 GB with 2 concurrent specialists active

#### Failure Criteria (stop and reassess)

- Memory exceeds 3.5 GB → density too high, reduce to fewer specialists
- Config validation fails → unknown keys, need to check schema
- Specialists can't spawn → `allowAgents` not recognized by this version
- Cross-session contamination → isolation broken

---

## Files Summary

| File | Action | Purpose |
|------|--------|---------|
| `~/.openclaw/openclaw.json` | Edit | Add `agents.list` with 5 agents |
| `~/.openclaw/workspace/AVATARS.md` | Create | CEO delegation protocol |
| `~/.openclaw/workspace-cto/SOUL.md` | Symlink | Shared Kukulcán identity |
| `~/.openclaw/workspace-cto/IDENTITY.md` | Create | CTO role focus |
| `~/.openclaw/workspace-cto/AGENTS.md` | Create | CTO operating instructions |
| `~/.openclaw/workspace-cto/MEMORY.md` | Create | CTO domain memory |
| `~/.openclaw/workspace-cfo/*` | Create (×3) + Symlink (×1) | CFO workspace |
| `~/.openclaw/workspace-pmo/*` | Create (×3) + Symlink (×1) | PMO workspace |
| `~/.openclaw/workspace-bd/*` | Create (×3) + Symlink (×1) | BD workspace |

**Total: 17 new files** (1 AVATARS.md + 4 symlinks + 12 role files)

---

## Cost Impact

| Scenario | LLM Cost Impact |
|----------|----------------|
| CEO only (current) | Baseline — all Opus |
| CEO + 1 Sonnet specialist | +~20% per delegated task (Sonnet is 5× cheaper than Opus) |
| CEO + 1 Opus specialist (CTO) | +~100% per delegated task (both Opus) |

Infrastructure cost: **$0 additional** — same EC2 instance, same gateway process.

Net effect: **specialist work that would have been done by CEO Opus is now partially offloaded to Sonnet**, potentially *reducing* total LLM cost for CFO/PMO/BD tasks.

---

## Future Enhancements

| Enhancement | Effort | Value |
|-------------|--------|-------|
| Telegram groups per avatar (direct specialist access) | 30 min | Bypass CEO for deep specialist work |
| Agent-to-agent messaging (specialist-to-specialist) | 15 min config | CTO asks CFO for cost estimate directly |
| Automated pyramid sync (CEO cron reads specialist sessions) | 1 hour | CEO awareness without manual review |
| Skills per avatar (e.g., finance-modeling skill for CFO) | Variable | Domain-specific tool access |
| Godinez.AI productization (Agent Troops feature) | 2-3 weeks | Offer avatar system to customers |

---

## References

- [01 — OpenClaw Multi-Agent Capabilities](01-openclaw-multi-agent-capabilities.md)
- [02 — Architecture Impact Analysis](02-architecture-impact-analysis.md)
- [03 — Implementation Roadmap](03-implementation-roadmap.md)
- [OpenClaw Multi-Agent Routing](https://docs.openclaw.ai/concepts/multi-agent)
- [OpenClaw Sub-Agents](https://docs.openclaw.ai/tools/subagents)
- [OpenClaw Session Tools](https://docs.openclaw.ai/concepts/session-tool)
- [Feb 7 Incident Postmortem](../../../KUKULCAN-INCIDENT-POSTMORTEM-2026-02-07.md)

---

## Estimated Total Time: ~90 minutes

| Phase | Time |
|-------|------|
| Prerequisites (swap + backup) | 10 min |
| Directories + auth | 5 min |
| openclaw.json config | 10 min |
| Specialist workspace files | 30 min |
| CEO AVATARS.md | 15 min |
| Testing + validation | 15 min |
| **Buffer** | **5 min** |

---

*one serpent, many heads, unified purpose.*
