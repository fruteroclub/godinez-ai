# 04 — Provisioning Pipeline

*Sources: ARCHITECTURE.md §4.2, §6.1, §6.3, §6.4*

---

## Instance Lifecycle States

```
Order received
    │
    ▼
┌─────────────────┐
│   PROVISIONING   │  EC2 RunInstances + cloud-init
│   (~2 minutes)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CONFIGURING    │  Inject Filling via Secrets Manager
│   (~1 minute)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   HEALTH CHECK   │  Poll gateway /status endpoint
│   (~30 seconds)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     RUNNING      │  Agent live, accepting messages
│                  │
└────────┬────────┘
         │  (on teardown request)
         ▼
┌─────────────────┐
│   UNWRAPPING     │  Archive sessions, stop service
│   (~30 seconds)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   TERMINATED     │  EC2 instance terminated
└─────────────────┘
```

Total provisioning time: **~3.5 minutes** from Order to RUNNING.

---

## Cloud-Init User Data Flow (5 Phases)

The Tortilla AMI contains the pre-installed runtime. Cloud-init handles instance-specific configuration via a bootstrap script:

### Phase 1 — Inject OpenClaw Config

Fetch `agent-config` from Secrets Manager → overwrite `~/.openclaw/openclaw.json` with agent-specific model chain, channels, and gateway settings.

### Phase 2 — Inject Credentials

Fetch API keys from Secrets Manager → inject into `auth-profiles.json` via `openclaw auth set`:
- `anthropic:primary` — primary API key
- `anthropic:backup` — independent backup key (mandatory per K7 learnings)

### Phase 3 — Inject Agent Identity

Fetch `identity-bundle` from Secrets Manager (base64-encoded tar.gz) → extract to `~/.openclaw/workspace/`:
- SOUL.md — agent personality and behavioral guidelines
- MEMORY.md — long-term memory
- IDENTITY.md — structured metadata
- Custom skills (if `skills.custom: true` in Order)

### Phase 4 — Install Registry Skills

If the Order specifies registry skills, install each via `openclaw skill install`:
```json
{
  "skills": {
    "registry": ["convex", "monad-development"],
    "custom": true
  }
}
```

Skills that require npm dependencies are auto-installed by OpenClaw's skill loader on first use.

### Phase 5 — Start the Agent

Start the systemd user service → signal readiness to the Burrito.gg control plane:
```bash
systemctl --user start openclaw-gateway.service
curl -X POST "https://api.burrito.gg/internal/ready/${INSTANCE_ID}"
```

---

## Secrets Manager Path Convention

Each Burrito's secrets are namespaced by instance ID:

```
burrito/<instance-id>/anthropic-primary    # Primary Anthropic API key
burrito/<instance-id>/anthropic-backup     # Backup Anthropic API key
burrito/<instance-id>/telegram-token       # Telegram bot token
burrito/<instance-id>/agent-config         # openclaw.json content
burrito/<instance-id>/identity-bundle      # Base64 tar.gz of workspace files
burrito/<instance-id>/skills              # JSON array of registry skill names
```

The instance's IAM role restricts access to only its own path:
```json
{
  "Resource": "arn:aws:secretsmanager:us-east-1:*:secret:burrito/<instance-id>/*"
}
```

---

## Skill Provisioning

| Type | Source | Installed By |
|------|--------|-------------|
| **Registry skill** | OpenClaw skill registry | `openclaw skill install <name>` during Phase 4 |
| **Custom skill** | Bundled in identity-bundle tarball | Extracted from archive during Phase 3 |

Examples:
- Registry: `convex`, `monad-development`
- Custom: `cracked-dev` (Frutero-internal)

---

## Health Check Polling Flow

After cloud-init completes, the Burrito.gg API polls for health:

```
Burrito.gg API
    │
    │  Poll every 10s for up to 5 minutes
    │
    ├──▶ GET http://<instance-ip>:18789/status (via SSM port forward)
    │    │
    │    ├── 200 + gateway: "running" + channel: "connected"
    │    │   └── ✓ Mark Burrito as RUNNING
    │    │
    │    ├── 200 + gateway: "running" + channel: "disconnected"
    │    │   └── ⚠ Retry (channel may still be connecting)
    │    │
    │    └── Connection refused / timeout
    │        └── ⚠ Retry (instance still booting)
    │
    │  After 5 minutes with no healthy response:
    │
    └── ✗ Mark Burrito as FAILED, notify operator
```

---

## Step Functions State Machine Design

The provisioning pipeline is orchestrated by AWS Step Functions:

1. **CreateSecrets** — Store Filling in Secrets Manager under the instance ID namespace
2. **LaunchInstance** — EC2 RunInstances with Tortilla AMI + cloud-init user data
3. **WaitForBoot** — Poll instance status checks (EC2-level)
4. **WaitForHealth** — Poll gateway `/status` endpoint (application-level)
5. **MarkRunning** — Update DynamoDB status, notify customer
6. **HandleFailure** — On timeout: terminate instance, clean up secrets, alert operator
