# 10 — Implementation Phases

*Sources: ARCHITECTURE.md §10, godinez-strategy-launch.md*

---

## Phase 0 — Manual Provisioning (Current)

**Status:** Complete
**Scope:** Validated runbook, reference implementation (K7)

- Manual EC2 provisioning following documented runbook
- K7 (Kukulcan) running as production reference agent
- Lessons learned from production incidents captured
- Architecture documented in ARCHITECTURE.md
- All infrastructure decisions made and justified

**Deliverables:** RUNBOOK.md, ARCHITECTURE.md, K7 running in production

---

## Phase 1 — Tortilla AMI + Basic Automation

**Scope:** Automate the repeatable parts

- Build Tortilla AMI with Packer (all 5 layers)
- CDK stack for VPC, security groups, IAM roles
- Secrets Manager integration for credential injection
- Cloud-init bootstrap script (the 5-phase flow)
- Manual Order submission (CLI or script) → automated provisioning

**Outcome:** New agent deployment goes from 45 minutes to ~5 minutes (human triggers, automation executes).

---

## Phase 2 — API + Control Plane

**Scope:** Burrito.gg API for programmatic management

- REST API (POST/GET/DELETE /burritos, restart, recover)
- DynamoDB state store
- Step Functions provisioning pipeline
- Lambda health check poller
- API key authentication (internal use)

**Outcome:** Agents can be provisioned, monitored, and torn down via API calls.

---

## Phase 3 — Monitoring + Self-Healing

**Scope:** Operational maturity

- CloudWatch dashboards (per-Burrito + fleet)
- Agent-level health signals (6 custom metrics)
- Alerting pipeline (P1/P2/P3 channels)
- Auto-recovery for credential lockouts
- Session rotation automation
- S3 session archival on teardown

**Outcome:** Agents self-heal from common failures. Operators alerted only for novel issues.

---

## Phase 4 — Self-Service Portal

**Scope:** Customer-facing management

- Web UI for agent creation and management
- JWT authentication (Godinez.AI user accounts)
- Usage dashboards and cost visibility
- Session archive downloads
- Channel configuration UI

**Outcome:** Godinez.AI customers can create and manage agents without engineering involvement.

---

## Future Considerations

These are deferred beyond Phase 4, to be revisited based on customer demand:

| Consideration | Driver |
|--------------|--------|
| **Multi-region deployment** | Non-US customers, data residency requirements |
| **Container migration** | Faster provisioning (~30s vs ~3min), better resource utilization |
| **Auto-scaling** | Vertical: upgrade instance type on memory pressure. Horizontal: future. |
| **Agent marketplace** | Pre-built Fillings for common use cases (support agent, community manager, etc.) |
| **Backup and recovery** | Periodic S3 session sync, point-in-time recovery, cross-region replication |
| **Workspace versioning** | Git-backed workspace files for identity rollback |
