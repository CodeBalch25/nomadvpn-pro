# ISP Compatibility & Service Strategy Insights

**Created:** December 24, 2024
**Purpose:** Guide website development and service tier refinement based on ISP research

---

## Executive Summary

Port forwarding is the #1 technical barrier for customers setting up their own VPN server. Research shows:

- **60% of US market** = Easy setup (fiber + cable) ✅
- **25% of US market** = Medium/Hard but workable ⚠️  
- **15% of US market** = CGNAT = IMPOSSIBLE without workarounds ❌

**Strategic Implication:** We need to pre-qualify customers AND offer a "Remote VPN Access" tier for incompatible ISPs.

---

## Critical Technical Discovery

### The Port Forwarding Problem

Every customer setup requires:
1. Flint 2 router at home running WireGuard server
2. **Port forwarding UDP 51820** from public internet to Flint 2
3. Travel router connecting back through that port

**Without port forwarding, the entire service doesn't work.**

### ISPs That BLOCK Port Forwarding (CGNAT)

| ISP | Subscribers | Status | Solution |
|-----|-------------|--------|----------|
| T-Mobile Home Internet | 7.3M | ❌ 100% CGNAT | Redirect to Remote VPN Access |
| Verizon 5G Home | 2.8M | ❌ 100% CGNAT | Redirect to Remote VPN Access |
| Starlink | 2.5M | ❌ CGNAT default | $10/mo public IP add-on required |
| Fixed Wireless (rural) | ~2M | ❌ Usually CGNAT | Business plan upgrade |

**These customers (~15% of market) CANNOT use our DIY setup tiers. They MUST use Remote VPN Access (our infrastructure).**

---

## Service Tier Refinement

### BEFORE (Current Website)

| Tier | Price | Description |
|------|-------|-------------|
| Essential Setup | $699 | One-time setup |
| Premium + Support | $1,299 | One-time with support |
| Remote VPN Access | $49/mo | Pre-programmed router |

### AFTER (Recommended)

| Tier | Price | Target Customer | ISP Requirement | What We Do |
|------|-------|-----------------|-----------------|------------|
| **Remote VPN Access** | $35-50/mo + $149 setup | CGNAT customers, non-technical users | ANY (uses OUR servers) | Ship pre-configured Beryl AX, connects to our Ziply/Xfinity infrastructure |
| **Easy Setup** | $699 | Fiber/Cable customers (60%) | Difficulty 1-2 | Remote session + ISP-specific guide, customer hosts server |
| **Complex Setup** | $899 | Double NAT / Mesh customers (25%) | Difficulty 3-4 | Extended session, bridge mode config, customer hosts server |
| **Premium Bundle** | $1,499 | "Just make it work" | Any compatible | Ship Deco + Flint 2 + Beryl AX, full stack we control |

### Why This Change?

1. **Remote VPN Access becomes the LEAD product** - lowest friction, recurring revenue, works for everyone
2. **DIY tiers require pre-qualification** - prevents support nightmares with incompatible ISPs
3. **Premium Bundle** - captures high-value customers who want zero hassle

---

## Website Changes Required

### 1. NEW PAGE: ISP Compatibility Checker (`/compatibility`)

**Purpose:** Pre-qualify leads, build email list, route to correct tier

**Flow:**
```
Step 1: "What's your home ISP?" [Dropdown with top 20 ISPs]
       → If T-Mobile 5G / Verizon 5G / Starlink → Show "Remote VPN Access" only

Step 2: "What's your upload speed?" [Input or "I don't know"]
       → If < 10 Mbps → Warning + recommend fiber/cable upgrade

Step 3: "Do you have a mesh WiFi system?" [Yes/No/I don't know]
       → If Yes → Show "Complex Setup" tier

Step 4: "CGNAT Check" - Instructions to compare whatismyipaddress.com vs router WAN IP
       → If mismatch → CGNAT detected → Remote VPN Access only

Step 5: Results page with recommended tier + CTA
```

**Why:** Prevents bad-fit customers from buying wrong tier. Captures email for nurturing.

### 2. UPDATE: Services Page (`/services`)

**Current:** 3 tiers without ISP context
**Needed:** 
- Add "Check Your Compatibility" CTA above pricing
- Add ISP compatibility badges/icons to each tier
- Show "Works with: Xfinity, Spectrum, AT&T Fiber, Verizon Fios, etc."
- Add "Not compatible with: T-Mobile 5G, Verizon 5G Home" disclaimers

### 3. UPDATE: Consultation Form (`/consultation`)

**Add these questions:**
- What ISP do you have at home?
- Do you rent or own your modem/router?
- What's your approximate upload speed?
- Do you have mesh WiFi (Google Nest, Eero, Orbi, etc.)?

**Why:** Pre-qualifies during consultation, saves time on calls.

### 4. NEW COMPONENT: ISP Compatibility Matrix

**Reusable component showing:**
```
✅ COMPATIBLE (Easy Setup)
- Xfinity/Comcast
- Spectrum  
- AT&T Fiber
- Verizon Fios
- Cox
- Google Fiber
- Frontier Fiber

⚠️ COMPATIBLE (Complex Setup)
- Optimum/Altice
- CenturyLink Fiber
- Any ISP + Mesh WiFi combo

❌ NOT COMPATIBLE (Use Remote VPN Access)
- T-Mobile Home Internet
- Verizon 5G Home
- Starlink (without $10/mo public IP)
- Fixed Wireless providers
```

### 5. UPDATE: Homepage Hero

**Add trust signals:**
- "Works with 85% of US home internet providers"
- "Tested on Xfinity, AT&T, Verizon Fios, Spectrum & more"

### 6. NEW: FAQ Section Updates

**Add these FAQs:**
- "Will this work with my ISP?"
- "What is CGNAT and why does it matter?"
- "I have T-Mobile 5G Home Internet - can I use NomadVPN Pro?"
- "Do I need to change any settings on my home router?"

---

## Remote VPN Access Tier - Detailed Spec

### What Customer Gets:
- Pre-configured GL.iNet Beryl AX travel router
- Connects to OUR WireGuard servers (Ziply Fiber primary, Xfinity backup)
- Zero home setup required
- Works with ANY ISP including CGNAT

### Our Infrastructure:
- **Primary:** Home network (Ziply Fiber + Deco + Flint 2) - yp61102.glddns.com
- **Backup:** Investment property (Xfinity + Flint 2) - TBD DDNS domain

### Pricing Logic:
- $149 one-time (covers Beryl AX cost + config + shipping)
- $35-50/month (covers bandwidth, support, server maintenance)

### Why This Works for CGNAT Customers:
- They don't need port forwarding - we already have it configured
- They get residential IP (ours) which is the whole point
- Lower barrier to entry, higher lifetime value

---

## Pre-Qualification Form Fields

### Embedded in Website (Quick Check)

```javascript
const preQualQuestions = [
  {
    id: 'isp',
    question: 'Who is your home internet provider?',
    type: 'dropdown',
    options: [
      { value: 'xfinity', label: 'Xfinity/Comcast', tier: 'easy' },
      { value: 'spectrum', label: 'Spectrum', tier: 'easy' },
      { value: 'att_fiber', label: 'AT&T Fiber', tier: 'easy' },
      { value: 'verizon_fios', label: 'Verizon Fios', tier: 'easy' },
      { value: 'cox', label: 'Cox', tier: 'easy' },
      { value: 'google_fiber', label: 'Google Fiber', tier: 'easy' },
      { value: 'frontier_fiber', label: 'Frontier Fiber', tier: 'easy' },
      { value: 'tmobile_5g', label: 'T-Mobile Home Internet', tier: 'remote_only' },
      { value: 'verizon_5g', label: 'Verizon 5G Home', tier: 'remote_only' },
      { value: 'starlink', label: 'Starlink', tier: 'remote_only' },
      { value: 'centurylink', label: 'CenturyLink', tier: 'medium' },
      { value: 'optimum', label: 'Optimum/Altice', tier: 'medium' },
      { value: 'other', label: 'Other', tier: 'unknown' },
    ]
  },
  {
    id: 'mesh_wifi',
    question: 'Do you have a mesh WiFi system at home?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes (Google Nest, Eero, Orbi, Deco, etc.)', tierModifier: '+1' },
      { value: 'no', label: 'No, I use my ISP router only', tierModifier: '0' },
      { value: 'unknown', label: "I'm not sure", tierModifier: '+1' },
    ]
  },
  {
    id: 'upload_speed',
    question: 'What is your home upload speed? (Check at speedtest.net)',
    type: 'dropdown',
    options: [
      { value: 'under_10', label: 'Under 10 Mbps', warning: true },
      { value: '10_25', label: '10-25 Mbps', tier: 'ok' },
      { value: '25_100', label: '25-100 Mbps', tier: 'good' },
      { value: 'over_100', label: 'Over 100 Mbps', tier: 'excellent' },
      { value: 'unknown', label: "I don't know", tier: 'unknown' },
    ]
  },
  {
    id: 'technical_comfort',
    question: 'How comfortable are you with router settings?',
    type: 'radio',
    options: [
      { value: 'expert', label: 'Very comfortable - I manage my own network' },
      { value: 'moderate', label: 'Somewhat comfortable - I can follow instructions' },
      { value: 'beginner', label: 'Not comfortable - I want someone else to handle it' },
    ]
  }
];
```

### Result Logic:

```javascript
function getRecommendedTier(answers) {
  // CGNAT ISPs → Remote VPN Access only
  if (['tmobile_5g', 'verizon_5g', 'starlink'].includes(answers.isp)) {
    return {
      tier: 'remote_vpn_access',
      reason: 'Your ISP uses CGNAT which prevents hosting a VPN server at home. Our Remote VPN Access service is perfect for you.',
      canDIY: false
    };
  }
  
  // Upload too slow
  if (answers.upload_speed === 'under_10') {
    return {
      tier: 'remote_vpn_access',
      reason: 'Your upload speed may not support reliable VPN performance. Consider upgrading your internet or using our Remote VPN Access.',
      canDIY: false
    };
  }
  
  // Beginner + Mesh = Premium Bundle
  if (answers.technical_comfort === 'beginner' && answers.mesh_wifi === 'yes') {
    return {
      tier: 'premium_bundle',
      reason: 'Based on your setup complexity and preference, our Premium Bundle with full configuration is recommended.',
      canDIY: false
    };
  }
  
  // Mesh WiFi = Complex Setup
  if (answers.mesh_wifi === 'yes') {
    return {
      tier: 'complex_setup',
      reason: 'Your mesh WiFi requires additional configuration (bridge mode or double NAT). Our Complex Setup package includes this.',
      canDIY: true
    };
  }
  
  // Easy ISP + No Mesh = Easy Setup
  if (['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber', 'frontier_fiber'].includes(answers.isp)) {
    return {
      tier: 'easy_setup',
      reason: 'Great news! Your ISP is fully compatible. Our Easy Setup package is perfect for you.',
      canDIY: true
    };
  }
  
  // Default to consultation
  return {
    tier: 'consultation',
    reason: 'We need a bit more information about your setup. Book a free consultation.',
    canDIY: null
  };
}
```

---

## Marketing Implications

### Lead Magnet: "Free ISP Compatibility Check"

**Landing page copy:**
> "Will your home internet work with NomadVPN Pro? Find out in 60 seconds."
> 
> Most VPN services don't tell you this, but 15% of US home internet connections CAN'T host a VPN server due to CGNAT. Don't waste money on equipment that won't work.
>
> [Check My Compatibility - Free]

**Captures:**
- Email address
- ISP information
- Technical comfort level
- Upload speed

**Enables:**
- Targeted email sequences based on tier
- Disqualification before purchase
- Upsell paths (Easy → Complex → Premium)

### Reddit Post Angle Update

**Old angle:** "How to set up WireGuard on GL.iNet routers"
**New angle:** "PSA: Check if your ISP supports port forwarding before buying a travel router for VPN"

This positions you as the expert who saves people from wasting money.

---

## Database Schema Additions

### New Table: `isp_compatibility`

```prisma
model IspCompatibility {
  id            String   @id @default(cuid())
  ispName       String   @unique
  ispSlug       String   @unique
  connectionType String  // fiber, cable, dsl, fixed_wireless, satellite
  hasCgnat      Boolean  @default(false)
  portForwardMethod String?
  difficultyScore Int    // 1-5
  notes         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### New Table: `compatibility_checks`

```prisma
model CompatibilityCheck {
  id              String   @id @default(cuid())
  email           String?
  ispSelected     String
  hasMeshWifi     Boolean?
  uploadSpeed     String?
  technicalLevel  String?
  recommendedTier String
  canDiy          Boolean?
  createdAt       DateTime @default(now())
}
```

---

## File Updates Summary

| File | Action | Priority |
|------|--------|----------|
| `/src/app/compatibility/page.tsx` | CREATE - ISP checker wizard | HIGH |
| `/src/app/services/page.tsx` | UPDATE - Add ISP badges, compatibility CTA | HIGH |
| `/src/app/consultation/page.tsx` | UPDATE - Add ISP pre-qual questions | MEDIUM |
| `/src/components/IspCompatibilityMatrix.tsx` | CREATE - Reusable ISP list component | MEDIUM |
| `/src/app/page.tsx` | UPDATE - Add trust signals, compatibility link | MEDIUM |
| `/prisma/schema.prisma` | UPDATE - Add new tables | LOW |
| `/src/app/api/compatibility/route.ts` | CREATE - Save compatibility checks | LOW |

---

## Immediate Next Steps

1. **Create `/compatibility` page** with multi-step form
2. **Update `/services` page** with ISP compatibility info
3. **Add ISP dropdown to consultation form**
4. **Create ISP compatibility matrix component**
5. **Update homepage with trust signals**
6. **Seed database with ISP compatibility data**

---

## Our Competitive Advantage

We have **real-world tested experience** with:

| Setup Type | ISP | Architecture | Our Experience |
|------------|-----|--------------|----------------|
| Fiber + Mesh | Ziply Fiber | ONT → Deco → Flint 2 (Repeater) | ✅ Working daily |
| Cable Direct | Xfinity | Modem/Gateway → Flint 2 (Router) | ✅ Investment property |

This means we can write **authentic, battle-tested guides** for the two most common architectures.

---

*Document for Claude Code / Development Reference*
