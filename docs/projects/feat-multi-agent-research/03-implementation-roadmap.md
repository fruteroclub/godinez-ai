# 03 — Implementation Roadmap

*Sources: architecture impact analysis, K7 production experience, OpenClaw v2026.2.9 capabilities*

---

## Go / No-Go Assessment

### Should Godinez.AI implement Agent Troops?

**Recommendation: Yes, but phased.**

| Factor | Assessment |
|--------|-----------|
| Cost impact | 50–80% infrastructure savings at scale — directly supports Priority 1 (Costos) |
| Technical feasibility | OpenClaw supports it natively — no runtime patches needed |
| Effort | Phase 1 (K7 validation) is ~2 hours. Full productization is ~2–3 weeks. |
| Risk | Manageable with density limits and swap. Failure domain is the main concern. |
| Product value | Enables new tiers (Troop, Swarm) and multi-channel agents for SMBs |

**The 2-hour question:** Phase 0 (below) is a hands-on validation on the K7 server. If it works, proceed to Phase 1. If it reveals blockers, stop with zero wasted infra investment.

---

## Phase 0: K7 Validation (2 hours)

**Goal:** Prove multi-agent works on the existing K7 production server with zero risk.

### Prerequisites (must be done first)

These are outstanding items from the Feb 7 incident that are prerequisites regardless of multi-agent:

| Item | Time | Status |
|------|------|--------|
| Add 4 GB swap to K7 | 5 min | Outstanding |
| Add secondary Anthropic API key | 5 min | Outstanding |
| Update OpenClaw config version 2026.2.2-3 → 2026.2.9 | 10 min | Outstanding |
| Rotate bloated session | 5 min | Outstanding |

### Validation Steps

| Step | Action | Time |
|------|--------|------|
| 1 | Complete prerequisites above | 25 min |
| 2 | Create second workspace: `mkdir -p ~/.openclaw/workspace-test` | 1 min |
| 3 | Create second agent dir: `mkdir -p ~/.openclaw/agents/test/agent` | 1 min |
| 4 | Copy auth: `cp ~/.openclaw/agents/main/agent/auth-profiles.json ~/.openclaw/agents/test/agent/` | 1 min |
| 5 | Add `agents.list` and `bindings` to openclaw.json (route Discord → test agent) | 10 min |
| 6 | Write a minimal AGENTS.md for the test workspace | 5 min |
| 7 | Restart gateway: `systemctl --user restart openclaw-gateway.service` | 1 min |
| 8 | Verify: `openclaw agents list --bindings` | 1 min |
| 9 | Send test messages on both Telegram (→ main) and Discord (→ test) | 10 min |
| 10 | Monitor memory: `ps aux --sort=-rss \| head -5` and check journal | 5 min |
| 11 | Verify auth isolation: trigger rate limit on test agent, confirm main unaffected | 15 min |
| 12 | Clean up or keep test agent | 5 min |

**Total: ~80 minutes** (including prerequisites).

### Success Criteria

- [ ] Both agents respond independently on their respective channels
- [ ] Sessions are isolated (test agent has no access to main agent's history)
- [ ] Auth is isolated (test agent cooldown does not affect main agent)
- [ ] Memory usage stays under 2.5 GB RSS with both agents active
- [ ] Gateway restart recovers both agents cleanly

### Failure Criteria (stop and reassess)

- Memory exceeds 3 GB RSS with just 2 agents → density limit is 1 on c7i-flex.large
- Gateway crashes during agent addition → hot-add is not reliable
- Session cross-contamination → isolation model is broken
- Cannot route Discord separately from Telegram → routing engine is insufficient

---

## Phase 1: Production Hardening (1 week)

**Goal:** Make multi-agent production-ready on K7 with monitoring and operational procedures.

| Task | Description | Effort |
|------|-------------|--------|
| Per-agent health checks | Script that checks each agent's last response time, session size, auth state | 2 hours |
| Density monitoring | CloudWatch custom metric: agents-per-instance, RSS-per-agent | 2 hours |
| Runbook updates | Add multi-agent procedures to Burrito.gg runbook | 2 hours |
| Session rotation per agent | Cron job or OpenClaw config to rotate sessions independently | 1 hour |
| Alerting | Alert if any single agent enters cooldown or session > 2 MB | 1 hour |
| Memory benchmarking | Load test with 2, 3, 4 agents under realistic traffic patterns | 3 hours |
| Document agent density limits | Based on benchmarking, publish density table per instance type | 1 hour |

---

## Phase 2: Control Plane Support (2–3 weeks)

**Goal:** Enable Burrito.gg API to provision agents onto shared instances.

| Task | Description | Effort |
|------|-------------|--------|
| Instance registry | Track which agents are on which instances (DynamoDB or Convex) | 3 days |
| Bin-packing logic | Select instance with available capacity for new agent placement | 2 days |
| Hot-add API | Burrito.gg endpoint: `POST /troops/{instanceId}/agents` → inject agent config | 3 days |
| Hot-remove API | Burrito.gg endpoint: `DELETE /troops/{instanceId}/agents/{agentId}` → remove agent | 2 days |
| Agent migration | Move agent from one instance to another (workspace sync + config move) | 3 days |
| Capacity-based scaling | Auto-launch new instances when existing ones reach density limit | 2 days |
| Integration tests | End-to-end: create troop, add agents, verify routing, remove agents, teardown | 2 days |

### New API Endpoints

```
POST   /v1/troops                          # Create a new troop instance
GET    /v1/troops                          # List all troop instances
GET    /v1/troops/{instanceId}             # Get troop details + agent list
POST   /v1/troops/{instanceId}/agents      # Add agent to troop
DELETE /v1/troops/{instanceId}/agents/{id}  # Remove agent from troop
POST   /v1/troops/{instanceId}/agents/{id}/migrate  # Move agent to another troop
GET    /v1/troops/{instanceId}/health       # Per-agent health status
```

---

## Phase 3: Product Tier Integration (1–2 weeks)

**Goal:** Expose Agent Troops as a Godinez.AI product offering.

| Task | Description | Effort |
|------|-------------|--------|
| Pricing model | Define Troop tier pricing based on validated cost model | Product decision |
| Godinez.AI dashboard | Show troop membership, per-agent status, channel routing | 3 days |
| Onboarding flow | Customer selects Solo vs Troop during agent setup | 2 days |
| Upgrade/downgrade | Move agent between Solo instance and Troop instance | 2 days |
| Documentation | Customer-facing docs for Troop features and limitations | 1 day |

---

## Timeline Summary

```
Week 0 (now)     Phase 0: K7 Validation                    2 hours
                  ↓ go/no-go decision
Weeks 1–2        Phase 1: Production Hardening              1 week
Weeks 2–4        Phase 2: Control Plane Support             2–3 weeks
Weeks 4–6        Phase 3: Product Tier Integration          1–2 weeks
```

**Total to production-ready Troops: ~5–6 weeks** from today, assuming Phase 0 validates successfully.

**Total to validate the concept: 2 hours** (Phase 0).

---

## Decision Matrix

| If Phase 0 shows... | Then... |
|---------------------|---------|
| 2 agents fit comfortably on c7i-flex.large | Proceed to Phase 1. Target 3:1 density. |
| 2 agents fit but tight (>3 GB RSS) | Proceed cautiously. Consider c7i-flex.xlarge for Troops. |
| 2 agents cause instability | Stop. Multi-agent not viable on current instance tier. Re-evaluate on larger instances or wait for OpenClaw optimizations. |
| Routing doesn't work as documented | File OpenClaw issue. Evaluate workarounds or wait for fix. |

---

## Dependencies

| Dependency | Owner | Status |
|-----------|-------|--------|
| Secondary Anthropic API key | Scarf / K7 | Outstanding (CRITICAL — Feb 7 item) |
| 4 GB swap on K7 | Scarf / K7 | Outstanding |
| OpenClaw update to 2026.2.9 | K7 | Outstanding |
| Burrito.gg API scaffold | Scarf | Not started |
| Convex schema for instance registry | Scarf | Not started |
| Godinez.AI pricing decision for Troop tier | Mel / K7 | Not started |
