# NomadVPN Pro - Project Instructions

## Project Overview
VPN router setup business website targeting digital nomads and remote workers who need secure, reliable VPN access through their home network while traveling.

**Business Model:** Help individual employees (not companies) set up WireGuard VPN using GL.iNet routers (Flint 2 for home, Beryl AX for travel). Customers receive pre-configured routers - just plug in and go.

**Target Audience:** Individual remote/hybrid employees, freelancers, consultants who travel and need consistent network access.

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL 16 (Docker)
- **ORM:** Prisma
- **Styling:** Tailwind CSS + shadcn/ui
- **Email:** Resend (test mode until domain verified)
- **Payments:** Stripe (configured but not fully implemented)

---

## Key Business Rules

### Services Offered (4 tiers - prioritize Remote VPN Access)

| Tier | Price | Target | ISP Requirement |
|------|-------|--------|-----------------|
| **Remote VPN Access** | $35-50/mo + $149 setup | CGNAT customers, non-technical | ANY (uses OUR servers) |
| **Easy Setup** | $699 | Fiber/Cable customers (60%) | Difficulty 1-2 |
| **Complex Setup** | $899 | Double NAT / Mesh customers (25%) | Difficulty 3-4 |
| **Premium Bundle** | $1,499 | "Just make it work" | Any compatible |

### CRITICAL: ISP Compatibility

**~15% of US customers CANNOT host their own VPN server due to CGNAT:**
- ❌ T-Mobile Home Internet (100% CGNAT)
- ❌ Verizon 5G Home (100% CGNAT)
- ❌ Starlink (CGNAT default, $10/mo public IP option)
- ❌ Fixed Wireless providers

**These customers MUST use Remote VPN Access tier (our infrastructure).**

**Compatible ISPs (Easy Setup):**
- ✅ Xfinity/Comcast
- ✅ Spectrum
- ✅ AT&T Fiber
- ✅ Verizon Fios
- ✅ Cox
- ✅ Google Fiber
- ✅ Frontier Fiber

**Compatible with extra work (Complex Setup):**
- ⚠️ Any ISP + Mesh WiFi combo (double NAT)
- ⚠️ Optimum/Altice
- ⚠️ CenturyLink

### Employment Types (individuals only - NO businesses)
- Employee (Remote / Hybrid)
- Freelance / Self-Employed
- Consultant / Contractor
- Other

### Messaging Guidelines
- Focus on "secure remote work access" NOT "hiding from employers"
- Don't say "looks like home internet" - say "secure VPN through your home network"
- Emphasize: pre-configured routers, reliable connectivity, work from anywhere
- Reference enterprise company experience (Nike, AT&T, Comcast) for credibility
- NEW: "Works with 85% of US home internet providers"
- NEW: "Tested on Xfinity, AT&T, Verizon Fios, Spectrum & more"

---

## Website Development Priorities

### HIGH PRIORITY - New Pages/Features

1. **`/compatibility` - ISP Compatibility Checker**
   - Multi-step wizard form
   - Questions: ISP, mesh WiFi, upload speed, technical comfort
   - Auto-recommends correct tier based on answers
   - Captures email for lead nurturing
   - See `memory/ISP_STRATEGY_INSIGHTS.md` for full spec

2. **Update `/services` - Add ISP Context**
   - Add "Check Your Compatibility" CTA above pricing
   - Show compatible ISP logos/badges per tier
   - Add "Not compatible with T-Mobile 5G, Verizon 5G" disclaimers
   - Reorder tiers: Remote VPN Access first (recurring revenue)

3. **Update `/consultation` - Add Pre-Qual Questions**
   - Add ISP dropdown field
   - Add mesh WiFi yes/no field
   - Add upload speed field

### MEDIUM PRIORITY

4. **Create `IspCompatibilityMatrix` Component**
   - Reusable component showing compatible vs incompatible ISPs
   - Use on /services, /compatibility, /faq pages

5. **Update Homepage**
   - Add trust signals: "Works with 85% of US internet providers"
   - Add "Check Compatibility" CTA in hero section
   - Add ISP logo strip (Xfinity, Spectrum, AT&T, Verizon Fios, etc.)

6. **Update FAQ Page**
   - "Will this work with my ISP?"
   - "What is CGNAT and why does it matter?"
   - "I have T-Mobile 5G Home Internet - can I use NomadVPN Pro?"
   - "Do I need to change any settings on my home router?"

### LOW PRIORITY

7. **Database Schema Updates**
   - Add `IspCompatibility` table (ISP data)
   - Add `CompatibilityCheck` table (user submissions)

---

## Our Infrastructure (Remote VPN Access Tier)

Customers on Remote VPN Access connect to OUR servers:

| Endpoint | Location | ISP | DDNS | Status |
|----------|----------|-----|------|--------|
| Primary | Home | Ziply Fiber | yp61102.glddns.com | ✅ Active |
| Backup | Investment Property | Xfinity | TBD | 🔧 Setup pending |

This gives us redundancy and allows us to serve CGNAT customers.

---

## Contact Information
- **Email:** timudai@outlook.com (temporary until business email)
- **Phone:** (213) 321-8300
- **Website:** nomadvpn.pro

---

## Current Email Flow
1. **Contact Form** → Saves to DB → Auto-reply to customer + Notification to owner
2. **Consultation Form** → Saves to DB → Auto-reply to customer + Notification to owner

Emails use Resend test sender (`onboarding@resend.dev`) until domain is verified.

---

## Environment Variables Required
```
DATABASE_URL=postgresql://nomadvpn:nomadvpn_secret_2024@localhost:5432/nomadvpn_pro
RESEND_API_KEY=re_xxxxx
NOTIFY_EMAIL=timudai@outlook.com
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## Running the Project
```bash
# Start database
docker-compose up -d

# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Start dev server
pnpm dev
```

---

## Admin Access
- Dashboard: `/admin`
- Leads: `/admin/leads`
- Consultations: `/admin/consultations`
- Prisma Studio: `npx prisma studio` (runs on port 5555)

---

## Key Documentation Files

| File | Purpose |
|------|---------|
| `memory/SESSION_LOG.md` | Project history and pending tasks |
| `memory/ISP_STRATEGY_INSIGHTS.md` | **NEW** Full ISP compatibility strategy, form specs, tier logic |
| `memory/ISP_RESEARCH_RESULTS.md` | **NEW** Raw research data on all US ISPs |
| `memory/MARKET_RESEARCH.md` | Demand validation (9.0/10 score) |
| `memory/MARKETING_PLAYBOOK.md` | Reddit/YouTube marketing strategy |
| `IT_Config_Network_Enineering/` | Router configs, network setup docs |

---

## Pre-Qualification Logic (for /compatibility page)

```javascript
// CGNAT ISPs → Remote VPN Access only
if (['tmobile_5g', 'verizon_5g', 'starlink'].includes(isp)) {
  return 'remote_vpn_access'; // Cannot DIY
}

// Mesh WiFi → Complex Setup
if (hasMeshWifi === true) {
  return 'complex_setup';
}

// Easy ISPs → Easy Setup
if (['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber'].includes(isp)) {
  return 'easy_setup';
}

// Unknown → Consultation
return 'consultation';
```

See `memory/ISP_STRATEGY_INSIGHTS.md` for complete implementation spec.
