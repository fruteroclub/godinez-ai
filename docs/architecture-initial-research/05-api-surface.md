# 05 — API Surface

*Source: ARCHITECTURE.md §5*

---

## Overview

REST API for the Burrito.gg control plane. All endpoints are authenticated via JWT or API key (TBD — see Authentication section below).

---

## `POST /burritos` — Create a New Burrito

```json
// Request
{
  "name": "my-agent",
  "soul": "You are a helpful assistant for Acme Corp...",
  "identity": {
    "displayName": "Acme Bot",
    "role": "Customer Support"
  },
  "channels": {
    "telegram": {
      "botToken": "secret:telegram-token"
    }
  },
  "model": {
    "primary": "opus",
    "fallbacks": ["sonnet", "haiku"]
  },
  "credentials": {
    "anthropicPrimary": "secret:anthropic-key-1",
    "anthropicBackup": "secret:anthropic-key-2"
  },
  "tier": "standard",
  "skills": {
    "registry": ["convex"],
    "custom": true
  }
}

// Response: 201 Created
{
  "id": "burrito_abc123",
  "status": "provisioning",
  "createdAt": "2026-02-08T15:00:00Z",
  "estimatedReady": "2026-02-08T15:03:00Z"
}
```

---

## `GET /burritos/:id` — Get Burrito Status

```json
// Response
{
  "id": "burrito_abc123",
  "status": "running",
  "name": "my-agent",
  "instanceId": "i-0abc123def456",
  "tier": "standard",
  "instanceType": "c7i-flex.large",
  "region": "us-east-1",
  "health": {
    "gateway": "healthy",
    "channels": {
      "telegram": "connected"
    },
    "lastApiCall": "2026-02-08T15:10:00Z",
    "sessionSize": "1.2 MB",
    "memoryUsage": "512 MB"
  },
  "createdAt": "2026-02-08T15:00:00Z",
  "uptime": "10m"
}
```

---

## `DELETE /burritos/:id` — Teardown a Burrito

```json
// Request
{
  "archiveSessions": true
}

// Response: 200 OK
{
  "id": "burrito_abc123",
  "status": "unwrapping",
  "sessionArchive": "s3://burrito-archives/burrito_abc123/sessions.tar.gz"
}
```

---

## `POST /burritos/:id/restart` — Restart Agent

```json
// Request
{
  "reason": "manual",
  "rotateSession": false
}

// Response: 200 OK
{
  "id": "burrito_abc123",
  "status": "restarting",
  "previousUptime": "2d 3h"
}
```

---

## `POST /burritos/:id/recover` — Credential Recovery

Clears cooldown state and restarts — the automated version of the manual rescue procedure from the K7 incident.

```json
// Response: 200 OK
{
  "id": "burrito_abc123",
  "status": "recovering",
  "clearedProfiles": ["anthropic:primary"],
  "action": "cooldown_reset + restart"
}
```

---

## Authentication Approach

**Decision pending.** Two options under consideration:

| Approach | Pros | Cons |
|----------|------|------|
| **JWT (via Godinez.AI)** | Standard, stateless, integrates with web portal | Token refresh complexity |
| **API Key** | Simpler, good for service-to-service | Key management, rotation |

For Phase 0 (internal use only), API key authentication is sufficient. JWT can be added when the self-service portal is built.

---

## Status Values

Returned in the `status` field across all endpoints:

| Status | Meaning |
|--------|---------|
| `provisioning` | EC2 instance launching, cloud-init running |
| `configuring` | Filling being injected |
| `health_check` | Waiting for gateway to report healthy |
| `running` | Agent live, accepting messages |
| `restarting` | Service restart in progress |
| `recovering` | Credential recovery in progress |
| `unwrapping` | Teardown: archiving sessions, stopping service |
| `terminated` | Instance terminated, sessions archived |
| `failed` | Provisioning or health check failed |
