# 08 — Cost Model

*Sources: ARCHITECTURE.md §9, godinez-strategy-launch.md*

---

## Per-Burrito Infrastructure Costs (Monthly, On-Demand, us-east-1)

| Resource | Intern (`t3.small`) | Standard (`c7i-flex.large`) | Notes |
|----------|--------------------|-----------------------------|-------|
| EC2 instance | ~$15.33 | ~$26.35 | On-demand pricing |
| EBS (20 GB gp3) | ~$1.60 | ~$1.60 | |
| Data transfer | ~$1.00 | ~$1.00 | Minimal — text-only agent traffic |
| Secrets Manager | ~$0.50 | ~$0.50 | 5 secrets x $0.10/secret |
| CloudWatch | ~$0.50 | ~$0.50 | Basic metrics + 1 alarm |
| **Infrastructure subtotal** | **~$18.93** | **~$29.95** | |

> The `c7i-flex.large` is cheaper than `t3.medium` ($26.35 vs $30.66/mo) while providing sustained compute with no CPU credit throttling.

---

## LLM API Cost Estimates (Variable)

The dominant cost. Highly variable based on usage pattern:

| Usage Level | Messages/Day | Estimated Monthly | Model Mix |
|-------------|-------------|-------------------|-----------|
| Light | ~50 | ~$30–50 | Mostly Sonnet/Haiku |
| Medium | ~200 | ~$100–300 | Mix Opus + Sonnet |
| Heavy | 500+ | ~$500–1,000+ | Heavy Opus |

---

## Total Cost Per Agent

| Tier | Instance | Infrastructure | LLM (est.) | Total |
|------|----------|---------------|-------------|-------|
| Intern (light) | `t3.small` | ~$19 | ~$40 | **~$59/mo** |
| Standard (medium) | `c7i-flex.large` | ~$30 | ~$150 | **~$180/mo** |
| Standard (heavy) | `c7i-flex.large` | ~$30 | ~$500+ | **~$530+/mo** |

---

## Cost Optimization Opportunities

| Opportunity | Estimated Savings | Trade-off |
|-------------|-------------------|-----------|
| Compute Savings Plans (1yr) | ~30% on EC2 | Upfront commitment |
| Right-sizing (start Intern → promote) | Variable | Monitoring required |
| Model routing (Haiku for simple queries) | Significant on LLM | Routing logic complexity |
| Session rotation (smaller sessions) | Fewer input tokens/request | Session continuity |
| Skill-aware routing (Sonnet for code) | 5x cheaper than Opus for code | Quality trade-off |

**Not recommended:** Spot instances — interruption risk is unacceptable for always-on agents.

---

## Margin Analysis Against Godinez Pricing Tiers

From the strategy doc, all tiers must maintain **75%+ margins**.

| Godinez Tier | Our Cost (est.) | Min Viable Price | Target Margin |
|-------------|----------------|------------------|---------------|
| 🌱 Becario (Intern) | ~$59 | ~$66 (at 90%) | 90% |
| ⚡ Asistente (Assistant) | ~$180 | ~$207 (at 87%) | 87% |
| 🚀 Agente (Agent) | ~$530 | ~$690 (at 77%) | 77% |

Working backwards from the margin targets:
- **Becario** at 90% margin → price must be ~10x cost → ~$590/mo or cost must be ~$59
- **Asistente** at 87% margin → price must be ~7.7x cost → ~$1,385/mo or cost must be ~$23
- **Agente** at 77% margin → price must be ~4.3x cost → ~$2,280/mo or cost must be ~$123

The exact pricing-to-margin relationship depends on the final price points set by the product team. Infrastructure costs are well within margin targets; LLM costs are the variable that needs careful management.

---

## Fleet Cost Projections (Infrastructure Only)

| Fleet Size | Intern Cost | Standard Cost | Mixed (50/50) |
|------------|-------------|---------------|----------------|
| 1 agent | $19 | $30 | $25 |
| 5 agents | $95 | $150 | $123 |
| 10 agents | $189 | $300 | $245 |
| 25 agents | $473 | $749 | $611 |
| 50 agents | $947 | $1,498 | $1,222 |
| 100 agents | $1,893 | $2,995 | $2,444 |

These are infrastructure-only costs. LLM API costs scale independently with usage, not fleet size.
