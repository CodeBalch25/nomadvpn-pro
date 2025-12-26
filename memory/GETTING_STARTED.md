# NomadVPN Pro - Getting Started Guide

## Project Overview

**Business:** Pre-configured VPN router setup service for digital nomads and remote workers.

**Target Audience:** Individual remote/hybrid employees who need secure VPN access to their home network while traveling.

**Product:** GL.iNet routers (Flint 2 for home, Beryl AX for travel) pre-configured with WireGuard VPN.

---

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 14 (App Router) | Full-stack React framework |
| Database | PostgreSQL (Neon) | Serverless database |
| ORM | Prisma | Database access and migrations |
| Styling | Tailwind CSS + shadcn/ui | UI components |
| Email | Resend | Transactional emails |
| Payments | Stripe | Payment processing |
| Hosting | Vercel | Deployment and hosting |
| DNS/Domain | Cloudflare | Domain management |
| Version Control | GitHub | Code repository |

---

## External Services & Links

### Vercel (Hosting)
- **URL:** https://vercel.com
- **Dashboard:** https://vercel.com/tim-balchs-projects/nomadvpn-pro
- **Purpose:** Hosts the Next.js application with automatic deployments from GitHub
- **Features Used:**
  - Automatic builds on git push
  - Environment variables management
  - Production deployments
  - Preview deployments for PRs

### Resend (Email)
- **URL:** https://resend.com
- **Dashboard:** https://resend.com/emails
- **Purpose:** Sends transactional emails (contact form responses, consultation confirmations)
- **Configuration:**
  - API key stored in `RESEND_API_KEY` env variable
  - Domain: nomadvpnpro.com (verified)
  - From address: support@nomadvpnpro.com

### Cloudflare (DNS & Domain)
- **URL:** https://cloudflare.com
- **Dashboard:** https://dash.cloudflare.com
- **Domain:** nomadvpnpro.com
- **Purpose:** DNS management, SSL certificates, domain registration
- **DNS Records:**
  - A record pointing to Vercel
  - CNAME for www subdomain
  - MX records for email (if applicable)
  - TXT records for domain verification (Resend, etc.)

### Neon (Database)
- **URL:** https://neon.tech
- **Dashboard:** https://console.neon.tech
- **Purpose:** Serverless PostgreSQL database
- **Configuration:**
  - Connection string in `DATABASE_URL` env variable
  - Prisma ORM for database access
  - Auto-scaling serverless architecture

### Stripe (Payments)
- **URL:** https://stripe.com
- **Dashboard:** https://dashboard.stripe.com
- **Purpose:** Payment processing for service purchases
- **Configuration:**
  - `STRIPE_SECRET_KEY` - Server-side API key
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side key
  - Products/prices configured in Stripe dashboard
  - Checkout sessions for payment flow

### GitHub (Repository)
- **URL:** https://github.com
- **Repository:** https://github.com/CodeBalch25/nomadvpn-pro
- **Purpose:** Source code management and version control
- **Features Used:**
  - Main branch for production
  - Automatic Vercel deployments on push
  - Issue tracking (optional)

---

## Project Structure

```
nomadvpn-pro/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # Services page
│   │   ├── compatibility/      # ISP compatibility wizard
│   │   ├── consultation/       # Consultation booking form
│   │   ├── contact/            # Contact form
│   │   ├── blog/               # Blog pages
│   │   ├── about/              # About page
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   ├── checkout/           # Stripe checkout
│   │   └── api/                # API routes
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── home/               # Homepage sections
│   │   ├── services/           # Service cards and pricing
│   │   └── blog/               # Blog components
│   └── lib/                    # Utility functions
│       ├── db.ts               # Prisma client
│       ├── stripe.ts           # Stripe configuration
│       └── utils.ts            # Helper functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seed data
├── memory/                     # Project documentation
├── public/                     # Static assets
└── IT_Config_Network_Engineering/  # Router configuration docs
```

---

## Database Schema (Prisma)

Key models:
- **Lead** - Contact form submissions
- **Consultation** - Consultation booking requests
- **BlogPost** - Blog content
- **IspCompatibility** - ISP data with CGNAT flags

---

## Environment Variables

Required variables for `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# Email (Resend)
RESEND_API_KEY="re_..."
NOTIFY_EMAIL="timudai@outlook.com"

# Payments (Stripe)
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# App
NEXT_PUBLIC_APP_URL="https://www.nomadvpnpro.com"
```

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Docker (for local database, optional)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeBalch25/nomadvpn-pro.git
   cd nomadvpn-pro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Generate Prisma client**
   ```bash
   pnpm prisma generate
   ```

5. **Push database schema**
   ```bash
   pnpm prisma db push
   ```

6. **Seed the database (optional)**
   ```bash
   pnpm db:seed
   ```

7. **Start development server**
   ```bash
   pnpm dev
   ```

8. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Deployment Process

### Automatic (Recommended)
1. Push to `main` branch on GitHub
2. Vercel automatically builds and deploys
3. Check deployment status at https://vercel.com/tim-balchs-projects/nomadvpn-pro/deployments

### Manual
```bash
vercel --prod
```

---

## Service Tiers

| Tier | Price | Target Customer | ISP Requirement |
|------|-------|-----------------|-----------------|
| Remote VPN Access | $35-50/mo + $149 setup | CGNAT customers | Any ISP |
| Essential Setup | $699 one-time | Standard ISPs | No CGNAT |
| Complex Setup | $899 one-time | Mesh WiFi users | No CGNAT |
| Premium + Support | $1,499 one-time | "Just make it work" | Any compatible |

---

## Key Features

1. **ISP Compatibility Wizard** (`/compatibility`)
   - Multi-step form to determine customer's best service tier
   - Detects CGNAT ISPs and recommends Remote VPN Access
   - Captures leads for follow-up

2. **Consultation Booking** (`/consultation`)
   - Form for scheduling free consultations
   - Collects ISP, travel plans, technical comfort level
   - Auto-reply email to customer

3. **Blog** (`/blog`)
   - SEO-optimized content for organic traffic
   - 7 posts covering travel, VPN setup, ISP compatibility
   - Share functionality for social distribution

4. **Checkout** (`/checkout`)
   - Stripe-powered payment flow
   - Service selection via URL parameter
   - Secure payment processing

---

## Contact Information

- **Website:** https://www.nomadvpnpro.com
- **Email:** support@nomadvpnpro.com
- **Phone:** (213) 321-8300

---

## Hardware Used

### Home Router: GL.iNet Flint 2 (GL-MT6000)
- Wi-Fi 6 dual-band
- 2.5G WAN port
- Up to 900 Mbps WireGuard throughput
- Serves as VPN server endpoint

### Travel Router: GL.iNet Beryl AX (GL-MT3000)
- Compact, portable design
- Wi-Fi 6 support
- ~300 Mbps WireGuard client performance
- USB-C powered

---

## Design Decisions

1. **Next.js App Router** - Chosen for server components, improved performance, and built-in API routes

2. **Tailwind + shadcn/ui** - Fast styling with consistent, accessible components

3. **Neon PostgreSQL** - Serverless database scales to zero, cost-effective for early stage

4. **Resend** - Simple API, great deliverability, easy domain verification

5. **Stripe** - Industry standard for payments, easy checkout integration

6. **Dark Theme** - Professional look that appeals to tech-savvy digital nomads

7. **No Authentication** - Not needed for current MVP; customers don't need accounts

---

## Future Enhancements

- [ ] Customer portal for managing subscriptions
- [ ] Automated router configuration downloads
- [ ] Live chat support integration
- [ ] Affiliate/referral program
- [ ] International expansion (EU servers)

---

*Last Updated: December 26, 2024*
*Author: Timothy Balch*
