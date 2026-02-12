# 06 — TICK.md Initial Assessment

*Date: 2026-02-12 | Status: Initial Assessment — Pending Deeper Dive*
*Repository: [Purple-Horizons/tick-md](https://github.com/Purple-Horizons/tick-md)*

---

## What Is TICK.md?

TICK.md is a Git-backed Markdown task coordination system for multi-agent environments. Instead of a database, it stores tasks in structured `TICK.md` files — YAML frontmatter for machine-parseable metadata, Markdown for human-readable context, Git commits for audit trail.

**Three distribution channels:**
- **CLI** (`tick-md` v1.2.0) — command-line task management
- **MCP Server** (`tick-mcp-server` v1.1.0) — AI agent integration via Model Context Protocol
- **ClawHub Skill** (`tick-coordination`) — OpenClaw-native integration

---

## Project Vitals

| Attribute | Value | Assessment |
|-----------|-------|------------|
| **Created** | Feb 8, 2026 | 4 days old — very early |
| **Commits** | 61 | Active development velocity |
| **Stars** | 6 | Pre-traction |
| **Forks** | 0 | No community derivatives yet |
| **License** | MIT | No licensing risk |
| **Language** | TypeScript | Aligns with our stack |
| **Node.js** | ≥18 (skill), ≥22 recommended (OpenClaw) | Compatible |
| **Maintainer** | Purple Horizons | Unknown org — needs vetting |
| **npm packages** | `tick-md`, `tick-mcp-server` | Published, installable |
| **Architecture** | Monorepo (npm workspaces): `cli/`, `mcp/`, `clawhub-skill/` | Clean separation |

### Early Project Risk Checklist

| Risk | Status | Mitigation |
|------|--------|------------|
| API surface may change | Likely — v1.x semver but no stability guarantee | Pin versions, wrap in thin adapter |
| Maintainer could abandon | Unknown — no org track record | MIT license means we can fork |
| Bugs in production | Likely — limited testing exposure | Our deployment validates under real load |
| Missing features we need | Probable — 4-day-old project | Contribute upstream or fork |
| Security vulnerabilities | Unaudited | Review dependencies before installing on K7 |
| Breaking changes | Possible in minor versions | Lock `package.json` to exact versions |

---

## Architecture & How It Works

### TICK.md File Format

Each project gets a single `TICK.md` file with YAML frontmatter:

```yaml
---
project: project-name
title: Project Title
schema_version: "1.0"
created: 2026-02-12T00:00:00Z
updated: 2026-02-12T00:00:00Z
default_workflow: [backlog, todo, in_progress, review, done]
id_prefix: TASK
next_id: 1
---
```

### Task Structure

```yaml
id: TASK-001
status: todo              # backlog | todo | in_progress | review | done | blocked
priority: high            # low | medium | high | urgent
assigned_to: null
claimed_by: "@cto"
created_by: "@ceo"
created_at: 2026-02-12T10:00:00Z
updated_at: 2026-02-12T10:00:00Z
tags: [infrastructure, multi-agent]
history:
  - ts: 2026-02-12T10:00:00Z
    who: "@ceo"
    action: created
    from: null
    to: todo
```

### Agents Table

TICK.md includes an agents registry:

| Agent | Type | Role | Status | Trust Level |
|-------|------|------|--------|-------------|
| @ceo | bot | orchestrator | active | high |
| @cto | bot | specialist | active | high |

### Dependency System

```bash
tick add "Deploy to production" --priority high       # TASK-001
tick add "Run tests" --blocks TASK-001                # TASK-002
tick add "Update docs" --blocks TASK-001              # TASK-003

# When blockers complete, TASK-001 automatically unblocks
tick done TASK-002 @cto
tick done TASK-003 @cto
# TASK-001 → status changes from blocked to ready
```

### Git Integration

Every `tick` operation creates a Git commit. The full task lifecycle is version-controlled:

```
commit a1b2c3d: "TASK-001: created by @ceo [priority: high]"
commit d4e5f6a: "TASK-002: claimed by @cto"
commit f7a8b9c: "TASK-002: completed by @cto → unblocked TASK-001"
```

---

## Integration Channels

### 1. CLI (`tick-md`)

```bash
bun add -g tick-md       # Install globally (or npm)
tick init                # Initialize TICK.md in project
tick add "Task title" --priority high --tags infra
tick claim TASK-001 @cto
tick done TASK-001 @cto
tick list --status in_progress --claimed-by @cto
tick graph               # ASCII/Mermaid dependency visualization
tick watch               # Real-time monitoring
tick sync                # Git commit + push
```

### 2. MCP Server (`tick-mcp-server`)

```bash
bun add -g tick-mcp-server
```

OpenClaw MCP configuration:

```json
{
  "mcpServers": {
    "tick": {
      "command": "tick-mcp",
      "args": []
    }
  }
}
```

This gives agents MCP tool access to tick operations — task creation, claiming, completion, listing, and dependency management through natural tool calls.

### 3. ClawHub Skill (`tick-coordination`)

```bash
clawhub install tick-coordination
```

Alternatively, manual installation:

```bash
cp -r clawhub-skill/ ~/.openclaw/skills/tick-coordination/
```

The skill includes:
- `SKILL.md` — instructions loaded into agent context
- `skill.json` — metadata and dependency declarations
- `mcp-reference.md` — complete MCP tool documentation
- `INSTALL.md` — setup instructions

**Skill dependencies:** Requires both `tick-md` CLI and `tick-mcp-server` to be installed.

---

## Alignment with K7 Avatar System

### What TICK.md Covers

| K7 Need | TICK.md Feature | Coverage |
|---------|----------------|----------|
| **Kanban board** | Task states, priorities, assignees, filtering | Full replacement for our Kanban MVP |
| **Multi-agent task ownership** | `claimed_by` field, agent registry | Direct support |
| **Dependency management** | `--blocks` with auto-unblocking | Better than what we designed |
| **Audit trail** | Git commit per operation | Better than what we designed |
| **CEO central board** | `tick list` with filters across all tasks | Supported via CLI/MCP |
| **Agent sub-boards** | `tick list --claimed-by @cto` | Supported via filtering |
| **Restart persistence** | Filesystem + Git — survives everything | Solves Risk 3 from review report |

### What TICK.md Does NOT Cover

| K7 Need | Gap | Implication |
|---------|-----|-------------|
| **Context Pyramid — strategic synthesis** | TICK.md tracks *tasks*, not *decisions* | Still need pyramid `strategic-summary.md` or similar |
| **Context Pyramid — domain memory** | No concept of "what did we decide about X" | Handoff persistence remains a separate concern |
| **Hashtag routing** | Not a routing tool | Separate feature, unrelated |
| **Cross-instance sync** | Git-based — needs push/pull coordination | Not a problem for single-instance K7 now |
| **Visual dashboard** | CLI/terminal only | Would need Next.js + Convex bridge for web view |

### How It Complements Our Architecture

```
┌──────────────────────────────────────────────────┐
│                 CONTEXT PYRAMID                   │
│  Strategic synthesis, decisions, domain memory    │
│  (Markdown files — our design)                    │
├──────────────────────────────────────────────────┤
│                   TICK.md                         │
│  Task coordination, status, dependencies,         │
│  agent assignment, audit trail                    │
│  (Git-backed — replaces our Kanban MVP)           │
├──────────────────────────────────────────────────┤
│               OPENCLAW GATEWAY                    │
│  Agent routing, sessions, workspace isolation     │
└──────────────────────────────────────────────────┘
```

TICK.md sits between the strategic layer (Context Pyramid) and the runtime layer (OpenClaw). It answers "what is being worked on" while the pyramid answers "what has been decided."

---

## Deeper Dive Plan

### Phase 1: Local Validation (~30 min)

| Step | Action | What We Learn |
|------|--------|---------------|
| 1 | `bun add -g tick-md tick-mcp-server` | Does it install cleanly with Bun? |
| 2 | `tick init` in a test directory | What does the generated TICK.md look like? |
| 3 | Create 5–10 tasks with dependencies | Is the CLI ergonomic? Performance? |
| 4 | `tick list`, `tick graph` | Are queries useful for our use case? |
| 5 | Inspect Git log after operations | Is the commit format clean and useful? |
| 6 | `tick watch` in a terminal | Does real-time monitoring work? |

### Phase 2: MCP Server Validation (~30 min)

| Step | Action | What We Learn |
|------|--------|---------------|
| 1 | Add `tick-mcp` to MCP config alongside Convex | Do multiple MCP servers coexist? |
| 2 | Test MCP tool calls from Claude Code | Are tool names clear? Parameters intuitive? |
| 3 | Create + claim + complete a task via MCP | Full lifecycle through agent tooling |
| 4 | Check for tool naming conflicts with Convex MCP | Any `mcp__tick__*` vs `mcp__convex__*` collisions? |

### Phase 3: OpenClaw Integration Test (~45 min)

| Step | Action | What We Learn |
|------|--------|---------------|
| 1 | Install ClawHub skill on K7 test workspace | Does `clawhub install` work on our OpenClaw version? |
| 2 | Verify skill loads in agent context | Does the agent see TICK.md instructions? |
| 3 | CEO creates task, CTO claims and completes | Multi-agent coordination through OpenClaw sessions |
| 4 | Gateway restart → verify TICK.md survives | Persistence validation |
| 5 | Memory footprint with MCP server running | Does tick-mcp add measurable memory overhead? |

### Phase 4: Fit Assessment (~15 min)

| Question | Expected Answer |
|----------|----------------|
| Does TICK.md replace our Kanban MVP entirely? | Likely yes — with better features |
| Does it integrate with our 2-agent deployment? | Needs validation |
| Can we extend it for Context Pyramid integration? | Assess — task completion → pyramid write? |
| Is the project stable enough to depend on? | Assess — after running it |
| Should we contribute upstream or fork? | Depends on alignment with maintainer |

---

## Dependency Audit (Pre-Installation)

Before installing on K7, verify:

| Check | Command | What to Look For |
|-------|---------|-----------------|
| npm audit | `npm audit --registry https://registry.npmjs.org tick-md` | No critical vulnerabilities |
| Dependency tree | `npm view tick-md dependencies` | No unexpected transitive deps |
| Package size | `npm view tick-md dist.unpackedSize` | Reasonable footprint |
| Node compatibility | `node --version` on K7 vs skill requirement (≥18) | K7 runs Node 22+ |
| Bun compatibility | Test all CLI commands under Bun runtime | Bun ≠ Node edge cases |

---

## Decision Framework

After the deeper dive, evaluate against:

| Criterion | Weight | Threshold |
|-----------|--------|-----------|
| **Installs and runs cleanly** | Must-have | CLI + MCP both functional |
| **Multi-agent task lifecycle works** | Must-have | Create → claim → complete across 2 agents |
| **Survives gateway restart** | Must-have | Git persistence validated |
| **MCP coexists with Convex MCP** | Must-have | No tool conflicts |
| **Memory overhead acceptable** | Must-have | < 100 MB additional RSS |
| **CLI ergonomics** | Nice-to-have | Intuitive commands, good output |
| **Dependency graph visualization** | Nice-to-have | Useful for CEO oversight |
| **ClawHub skill loads properly** | Nice-to-have | Fallback: manual skill installation |
| **Maintainer responsive** | Nice-to-have | Issues answered within 48h |

### Go / No-Go Outcomes

| Result | Action |
|--------|--------|
| All must-haves pass | Adopt TICK.md, retire Kanban MVP design, integrate with Context Pyramid |
| Must-haves pass but ClawHub fails | Adopt with manual MCP integration (skip ClawHub) |
| MCP conflicts with Convex | Use CLI-only integration (agents call `tick` via exec tool) |
| Core functionality fails | Do not adopt — build our Kanban MVP as designed |
| Promising but too unstable | Fork, stabilize, adopt our fork |

---

## Open Questions for Maintainers

If the deeper dive validates the tool, consider opening these as GitHub issues or discussions:

1. **Roadmap stability** — Is the `skill.json` / TICK.md schema considered stable, or should we expect breaking changes in the next few months?
2. **Multi-file support** — Can agents operate on separate TICK.md files per project, with a parent file for cross-project tracking?
3. **Convex integration interest** — Would the maintainers consider a Convex storage backend as an alternative to filesystem for cloud-native deployments?
4. **OpenClaw version compatibility** — What's the minimum OpenClaw version tested with the ClawHub skill?
5. **Bun runtime** — Has tick-md been tested under Bun, or only Node.js?

---

## References

- [tick-md Repository](https://github.com/Purple-Horizons/tick-md)
- [tick-md npm package](https://www.npmjs.com/package/tick-md)
- [tick-mcp-server npm package](https://www.npmjs.com/package/tick-mcp-server)
- [ClawHub Registry](https://clawhub.ai)
- [05 — Plan Review Report](05-plan-review-report.md) — Risk 3 (session persistence) and Kanban feature
- [04 — Avatar System Plan](04-kukulcan-avatar-system-plan.md) — Multi-agent architecture

---

*Assessment prepared for deeper dive. Do not adopt before completing validation phases above.*
