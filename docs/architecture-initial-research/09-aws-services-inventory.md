# 09 — AWS Services Inventory

*Sources: ARCHITECTURE.md §3–4, §6–7*

---

## Complete Service List

| Service | Role | Justification |
|---------|------|---------------|
| **EC2** | Compute | One instance per agent. Simplest isolation, full OS control for systemd services. |
| **EBS (gp3)** | Block storage | 20 GB per instance for sessions, workspace, logs. gp3 is cheapest and sufficient. |
| **AMI (custom)** | Base image | Tortilla AMI — pre-baked runtime avoids per-boot install time. |
| **Secrets Manager** | Credential store | Per-instance secrets namespaced by instance ID. Rotatable, auditable. |
| **IAM** | Access control | Per-instance roles scoped to own Secrets Manager paths only. |
| **SSM (Session Manager)** | Remote access | No SSH in production. Audit trail, no key management. |
| **CloudWatch** | Metrics + alarms | Instance-level metrics (CPU, memory, disk) + custom alarms. |
| **DynamoDB** | State store | Burrito status, metadata, lifecycle tracking. Serverless, pay-per-request. |
| **Step Functions** | Orchestration | Provisioning pipeline state machine (create → configure → health check → running). |
| **Lambda** | Glue logic | Health check poller, cloud-init signal handler, cleanup tasks. |
| **S3** | Archive storage | Session archives on teardown. Long-term, cheap storage. |
| **VPC** | Networking | Public subnets for outbound internet. Security groups per instance. |

---

## Architecture Decisions

### Lambda vs. Fargate for Control Plane

**Chosen: Lambda**

| Factor | Lambda | Fargate |
|--------|--------|---------|
| Cost at low volume | ~$0 (free tier) | ~$15/mo minimum |
| Cold start | Acceptable (control plane, not data plane) | None |
| Operational complexity | Lower | Higher (task definitions, networking) |
| Scaling | Automatic | Requires config |

The control plane handles infrequent operations (provisioning, health checks, teardowns). Lambda's pay-per-invocation model is ideal. Fargate makes sense only if the control plane needs long-running processes.

### DynamoDB vs. RDS for State

**Chosen: DynamoDB**

| Factor | DynamoDB | RDS (Postgres) |
|--------|----------|----------------|
| Cost at low volume | ~$0 (on-demand) | ~$15/mo minimum |
| Operational overhead | Zero | Backups, patching, sizing |
| Schema flexibility | High | Rigid |
| Query complexity needed | Low (key-value lookups) | Overkill |

Burrito state is simple key-value data (ID → status, metadata). No joins, no complex queries. DynamoDB's on-demand pricing means zero cost when idle.

### CDK as IaC Tool

**Chosen: AWS CDK (TypeScript)**

- Same language as the rest of the stack (OpenClaw is Node.js/TypeScript)
- Programmatic constructs over declarative templates
- L2 constructs simplify IAM, networking boilerplate
- Better testing story than CloudFormation/Terraform for this scale

### Public Subnets (No NAT Gateway)

**Chosen: Public subnets with public IPs**

| Factor | Public Subnet | Private + NAT |
|--------|---------------|---------------|
| Cost | $0 | ~$32/mo per NAT Gateway |
| Complexity | Simple | VPC routing, NAT config |
| Security risk | Mitigated by SG (no inbound rules) | Slightly more isolated |

Agents only need outbound internet access. Security groups with no inbound rules provide equivalent protection to private subnets for this use case. NAT Gateway costs ($32/mo) would add significant overhead per region — more than the cost of a t3.small instance.

### Single Region (us-east-1)

**Chosen: Single region, Phase 1**

- Lowest latency to Anthropic API (Anthropic's primary endpoints)
- Largest EC2 instance availability (rarely capacity issues)
- Simplest operational model (no cross-region replication, no Route 53 routing)
- Multi-region deferred to Phase 3+ when customer demand requires it
