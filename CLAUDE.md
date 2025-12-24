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

### Services Offered (3 tiers only - NO enterprise)
1. **Essential Setup** - $699 (one-time)
2. **Premium + Support** - $1,299 (one-time)
3. **Remote VPN Access** - $49/mo (subscription) - Pre-programmed router shipped to customer

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

## Session Memory
Session logs are stored in `/memory` folder. Check `memory/SESSION_LOG.md` for detailed history of changes and pending tasks.
