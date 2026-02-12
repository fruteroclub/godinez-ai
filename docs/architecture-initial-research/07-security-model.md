# 07 — Security Model

*Sources: ARCHITECTURE.md §4.5–4.6, RUNBOOK.md §3*

---

## Principles

1. **No inbound access** — Agents connect outbound only. No SSH in production, no exposed ports.
2. **Credential isolation** — Each Burrito can only access its own secrets.
3. **Least privilege** — IAM roles scoped to exactly what the instance needs.
4. **Defense in depth** — Multiple layers: network, IAM, OS, application.

---

## Remote Access: SSM over SSH

| Concern | Solution |
|---------|----------|
| Production access | AWS SSM Session Manager — no SSH keys to manage |
| Audit trail | SSM logs all sessions to CloudWatch |
| SSH (setup only) | Available during initial AMI builds; disabled in production |

SSM eliminates the need for inbound port 22. No SSH keys to rotate, no bastion hosts to maintain.

---

## Secrets Manager Path Isolation

Every Burrito's credentials are namespaced by instance ID:

```
burrito/<instance-id>/anthropic-primary
burrito/<instance-id>/anthropic-backup
burrito/<instance-id>/telegram-token
burrito/<instance-id>/agent-config
burrito/<instance-id>/identity-bundle
burrito/<instance-id>/skills
```

Secrets are injected at boot via cloud-init and never stored on disk in plaintext after injection into OpenClaw's config structures.

---

## Per-Instance IAM Roles

Each Burrito gets an instance profile with a scoped IAM role:

```json
{
  "Effect": "Allow",
  "Action": [
    "secretsmanager:GetSecretValue"
  ],
  "Resource": [
    "arn:aws:secretsmanager:us-east-1:*:secret:burrito/<instance-id>/*"
  ]
}
```

The instance can only read **its own** secrets. No cross-Burrito access possible via IAM.

---

## Network Security

| Layer | Configuration |
|-------|--------------|
| Security group | **No inbound rules.** Egress only: HTTPS to Anthropic API, Telegram API, Discord API. |
| Per-instance SG | Each Burrito has its own security group (no shared SG across agents). |
| VPC | Public subnet (agents need outbound internet). No NAT Gateway needed — instances have public IPs for outbound. |

The agent initiates all connections. There is nothing to attack from the outside — no open ports, no listening services reachable from the internet.

---

## OS Hardening (Baked into Tortilla AMI)

| Hardening | Implementation |
|-----------|---------------|
| **Swap** | 4 GB swap file, pre-baked in AMI, mandatory |
| **Firewall** | UFW: deny incoming, allow outgoing, allow SSH (setup only) |
| **SSH** | Password auth disabled, key-only authentication |
| **Updates** | Unattended security upgrades enabled |
| **User isolation** | Dedicated `agent` user, non-root, lingering enabled |

---

## Encryption at Rest

- **EBS volumes** — Encrypted by default (AWS-managed keys)
- **Secrets Manager** — Encrypted at rest with AWS KMS
- **Session archives (S3)** — Server-side encryption (SSE-S3)

---

## What's Isolated Per Burrito

| Resource | Isolation Level |
|----------|----------------|
| Compute | Separate EC2 instance |
| Memory | Separate process, separate OS |
| Storage | Separate EBS volume |
| Credentials | Separate Secrets Manager paths |
| Network | Separate security group |
| Sessions | Separate session files on separate disk |
| Bot tokens | Each agent has its own bot identity |
