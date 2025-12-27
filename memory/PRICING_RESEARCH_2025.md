# NomadVPN Pro - Pricing Research & Recommendations (December 2025)

## Executive Summary

**Key Decision:** Keep $35/month pricing. Do NOT add a weekly tier. Add Stripe Customer Portal for easy cancellations.

**Rationale:** Only 10% of workations are 1 week or less. The monthly subscription already covers the dominant use case (1-4 weeks = 68% of market). Weekly subscriptions have 3x higher churn and add operational complexity without proportional revenue.

---

## Research Findings

### 1. Digital Nomad Stay Duration (2025 Data)

| Metric | Value | Trend |
|--------|-------|-------|
| Average stay per location | 6.4 weeks | Up from 5.7 weeks (2024) |
| Average per city | 2 months | Stable |
| Locations visited/year | 6.2 | Down from 7.2 (2023) |
| Average per country | 6 months | Stable |

**Duration Preferences:**
- 66% prefer 3-6 months per location
- 80% prefer 3-9 months
- Trend is toward "slow travel" (48% plan to "slomad")

**Key Insight:** Full-time digital nomads are NOT 1-week travelers. They stay 1-3 months minimum. Monthly subscription is perfect fit.

---

### 2. Workation Duration (Remote Workers, 2024-2025)

| Duration | Percentage |
|----------|------------|
| 1 week or less | **10%** |
| 1-2 weeks | **36%** |
| 3-4 weeks | **32%** |
| 1+ months | 22% |

**Critical Finding:** 68% of workations are 1-4 weeks. Only 10% are 1 week or less.

**Implication:** A monthly subscription perfectly covers 90% of the workation market.

---

### 3. Business Traveler Duration

| Duration | Percentage |
|----------|------------|
| Less than 1 week | 65-70% |
| 1-2 weeks | 20-25% |
| 2-4 weeks | 8-12% |
| 1+ months | 3-5% |

**Average business trip:** 3.8 days (3 days domestic, 5-6 days international)

**However:** These are traditional business travelers, NOT our target market. Our target is remote workers doing extended workations, not executives flying to meetings.

---

### 4. VPN Industry Pricing (2025)

| Provider | Monthly | Annual | 2-Year |
|----------|---------|--------|--------|
| ExpressVPN | $12.99 | $6.67/mo | $3.49/mo |
| NordVPN | $12.99 | $4.99/mo | $2.99/mo |
| Surfshark | $15.45 | $3.39/mo | $1.99/mo |

**Key Observations:**
- NO major VPN offers weekly plans
- Minimum commitment is monthly (with 30-day guarantee)
- Heavy discounts for long-term (50-87% off)
- Industry has determined weekly is not worth offering

---

### 5. Subscription Pricing Ratios (2025 Benchmarks)

| Ratio | Industry Standard |
|-------|-------------------|
| Weekly to Monthly | 40-60% (weekly = $4-6 if monthly = $10) |
| Monthly to Annual | 50-77% discount for annual |
| Breakeven point | 5-8 days = monthly becomes better than daily |

**Weekly Subscription Economics:**
- Weekly churn is **3x higher** than monthly (4% vs 15% retention)
- Annual subscribers are **2.4x more profitable** than monthly
- Weekly represents 47% of in-app revenue but with higher churn

---

## Market Segmentation Analysis

### Our Target Market: Remote Workers on Workations

Based on the data, here's how the market breaks down:

```
TOTAL REMOTE WORKER TRAVEL MARKET
├── 10% - Ultra-short (≤1 week) ← NOT worth a dedicated tier
├── 36% - Short (1-2 weeks) ← Covered by monthly subscription
├── 32% - Medium (3-4 weeks) ← Covered by monthly subscription
└── 22% - Extended (1+ month) ← Covered by monthly subscription
```

**Conclusion:** 90% of the market is served by a monthly subscription. The 10% ultra-short segment would require:
- New product tier
- Different pricing
- Higher support burden
- 3x higher churn
- Minimal incremental revenue

---

## Pricing Recommendations

### RECOMMENDATION 1: Keep Current Pricing
**Status: RECOMMENDED**

| Product | Price | Rationale |
|---------|-------|-----------|
| Remote VPN Access | $35/month + $149 setup | Covers 90% of use cases |

**Why This Works:**
- 68% of workations are 1-4 weeks (covered by $35/mo)
- Digital nomads stay 6+ weeks (multi-month subscribers)
- Setup fee covers hardware costs
- Simple to manage

### RECOMMENDATION 2: Add Stripe Customer Portal
**Status: REQUIRED**

Allow subscribers to:
- View/update payment method
- Cancel subscription (with optional reason)
- View billing history
- Download invoices

**Implementation:** Enable Stripe Customer Portal (built-in feature, minimal code)

### RECOMMENDATION 3: Do NOT Add Weekly Tier
**Status: REJECTED**

**Why Not Weekly?**
- Only 10% of market needs <1 week
- Weekly churn is 3x higher
- Operational complexity for minimal revenue
- No major VPN competitor offers weekly
- Those who need 1 week can just pay $35 and cancel

**Math:**
- 100 customers × $35/mo = $3,500/mo
- Same 100 customers on weekly ($15/week) × 2 weeks avg = $3,000/mo + 3x churn
- Net result: less revenue, more churn, more support

### RECOMMENDATION 4: Consider Annual Discount (Future)
**Status: OPTIONAL**

If demand grows, offer annual at 20-30% discount:
- Current: $35/mo = $420/year
- Annual: $299/year ($24.92/mo) = 29% savings
- Reduces churn by 51%
- Increases LTV by 2.4x

**Hold off until:** 50+ active monthly subscribers

---

## Competitor Analysis

### Why Commercial VPNs Don't Work for Our Customers

| Service | Monthly | Issue |
|---------|---------|-------|
| NordVPN | $12.99 | Datacenter IPs, easily detected |
| ExpressVPN | $12.99 | Datacenter IPs, easily detected |
| Surfshark | $15.45 | Datacenter IPs, easily detected |

**Our Advantage:** Residential IP through home network. Undetectable.

### Comparable Services (Router-based)

| Service | Price | Notes |
|---------|-------|-------|
| Travelwifi Rental | $76-120/week | Rental only, no VPN |
| Portable Hotspot | $8-13/day | Data only, no home IP |
| NomadVPN Pro | $35/mo + $149 | Residential IP, own the hardware |

**Our Value Proposition:** Customer owns the hardware. Residential IP. Works forever after setup.

---

## Implementation Checklist

### Immediate (This Session)
- [x] Document pricing research in memory
- [ ] Enable Stripe Customer Portal
- [ ] Test subscription cancellation flow

### Short-term (Next Week)
- [ ] Add "Cancel Subscription" link to customer email confirmations
- [ ] Create FAQ: "How do I cancel my subscription?"
- [ ] Monitor first real transactions

### Medium-term (When Demand Grows)
- [ ] Evaluate annual subscription tier
- [ ] Consider "pause subscription" feature for seasonal travelers
- [ ] Build customer dashboard for self-service

---

## Data Sources

1. **Nomad List** - Digital nomad statistics 2025
2. **MBO Partners** - State of Independence Report 2025
3. **Statista** - Workation length preferences 2024
4. **FlexJobs** - Remote work travel statistics 2024
5. **Owl Labs** - State of Hybrid Work 2024
6. **Adapty** - State of In-App Subscriptions 2025
7. **TravelPerk** - Bleisure Travel Statistics 2025
8. **GBTA** - Business Travel Index 2024

---

## Key Metrics to Track

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Monthly churn rate | <10% | Subscription health |
| Average subscription length | >3 months | LTV calculation |
| Cancellation reasons | Track | Product improvement |
| Upgrade rate (monthly → annual) | >20% | Revenue stability |

---

*Research Completed: December 26, 2024*
*Author: Claude Code (for Timothy Balch)*
*Next Review: When 50+ active subscribers*

