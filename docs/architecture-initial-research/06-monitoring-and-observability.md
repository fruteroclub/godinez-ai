# 06 — Monitoring and Observability

*Sources: ARCHITECTURE.md §7, RUNBOOK.md §11*

---

## Instance-Level CloudWatch Metrics

| Metric | Alarm Threshold | Action |
|--------|----------------|--------|
| CPU utilization | >80% sustained 10 min | Alert: possible runaway process |
| Memory utilization | >85% | Alert: consider instance upgrade |
| Disk utilization | >80% | Alert: session cleanup needed |
| Status check failed | Any | Alert: instance health issue |

---

## Agent-Level Custom Health Signals

Polled by the Burrito.gg control plane every 60 seconds:

| Signal | Source | Threshold | Action |
|--------|--------|-----------|--------|
| Gateway status | `/status` endpoint | Non-200 for 3 checks | Alert + auto-restart |
| Last API call age | auth-profiles.json `lastUsed` | >10 min (active hours) | Warning: agent may be stuck |
| Session file size | Filesystem | >3 MB | Warning: rotation recommended |
| Auth profile cooldown | auth-profiles.json | Any `cooldownUntil` present | Alert: credential lockout |
| Malformed tool calls | Application log | 3+ `read tool called without path` in 10 min | Alert: context degradation |
| Process memory | `/proc/<pid>/status` | >2 GB RSS | Warning: memory pressure |

These signals were derived directly from production incidents on the K7 server. The "malformed tool calls" and "auth profile cooldown" signals specifically address the failure modes discovered during the Feb 7 cascading lockout.

---

## Error Signature Reference Table

| Log Pattern | Severity | Action |
|-------------|----------|--------|
| `read tool called without path` (3+ in 10 min) | Warning | Session rotation needed |
| `Removed orphaned user message` | Warning | Session state degrading |
| `typing TTL reached (2m)` | Warning | API call hanging, monitor |
| `embedded run timeout: timeoutMs=600000` | Critical | Timeout cascade starting |
| `All models failed (3)` | Critical | Total lockout — run credential recovery |
| `Provider anthropic is in cooldown` | Critical | All credentials exhausted |

---

## Alerting Channels

| Priority | Channel | Trigger |
|----------|---------|---------|
| **P1** (agent down) | PagerDuty → operator on-call | Gateway non-200 for 3+ checks, all models failed |
| **P2** (degraded) | Slack #burrito-alerts → operator review | Session >3 MB, cooldown detected, memory pressure |
| **P3** (informational) | Dashboard only | Model usage stats, uptime milestones |

---

## Dashboard Specs

### Per-Burrito Dashboard

- Uptime and current status
- Message volume (in/out per hour)
- Model usage breakdown (Opus vs Sonnet vs Haiku)
- Session size over time
- Memory and CPU trends
- Last restart and reason

### Fleet Dashboard

- Total active Burritos
- Burritos by status (running / degraded / down)
- Aggregate API spend
- Cost per Burrito per day
