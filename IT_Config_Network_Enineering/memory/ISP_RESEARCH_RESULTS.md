# Comprehensive US ISP Analysis: VPN Router Port Forwarding Compatibility

**Source:** Perplexity Deep Research
**Date:** December 24, 2024
**Purpose:** Pre-qualification and setup guidance for NomadVPN Pro customers

---

## Executive Summary

- **60% of US market** = Easy/Compatible (fiber + cable) ✅
- **25% of US market** = Medium/Hard but workable ⚠️
- **15% of US market** = CGNAT Impossible (T-Mobile 5G, Verizon 5G, Starlink default) ❌

**Your service works for 3/4 of the US market.**

---

## 1. US ISP Market Share & Equipment Types (Top 15)

| Rank | ISP | Subscribers (M) | Equipment Type | Own Equipment? | Admin Interface |
|------|-----|-----------------|----------------|----------------|-----------------|
| 1 | Xfinity/Comcast | 32 | xFi Gateway (modem/router combo) | Yes (DOCSIS cable modems) | Xfinity App + xFi.com portal |
| 2 | Spectrum | 22 | SAX1V1K (WiFi 6 gateway) | Yes (DOCSIS modems) | My Spectrum App only |
| 3 | AT&T Fiber | 16 | BGW320-500/505 (ONT + gateway) | Yes (with IP Passthrough) | Web UI 192.168.1.254 |
| 4 | T-Mobile Home Internet | 7.3 | Nokia 5G21 Gateway | No | Nokia app (limited) |
| 5 | Verizon Fios | 7 | G3100/CR1000A (ONT + router) | Yes | My Fios App + myfiosgateway.com |
| 6 | Cox | 5 | Panoramic Gateway (XB7/XB8) | Yes (DOCSIS modems) | Panoramic Wifi App |
| 7 | Optimum/Altice | 4.5 | ADC-5100P/ARC-XCI55V1 | Yes | Optimum App + 192.168.0.1 |
| 8 | CenturyLink/Lumen | 4 | C3000Z/C4000LG/Zyxel | Yes (with caveats) | Web UI 192.168.0.1 |
| 9 | Frontier | 3.5 | Arris NVG468MQ (Fiber) | Yes (Fiber ONT) | Web UI 192.168.254.254 |
| 10 | Verizon 5G Home | 2.8 | Nokia/CR1000A 5G Gateway | No | Nokia app (limited) |
| 11 | Starlink | 2.5 | Gen 3 Router | Yes ($10/mo public IP) | Starlink app + web UI |
| 12 | WOW! | 1.2 | Arris TG862G | Limited | Panoramic App (hit-or-miss) |
| 13 | EarthLink | 1.1 | Reseller (varies) | Varies by underlying ISP | Varies |
| 14 | Windstream | 1.0 | Nokia/Alcatel ONTs | Yes (business plans) | Web UI varies |
| 15 | Brightspeed | 0.7 | Nokia ONT + Calix GigaSpire | Yes | Web UI |

---

## 2. CGNAT Status (Port Forwarding Killers)

### CGNAT ISPs (Impossible without workarounds):

| ISP | CGNAT Status | Public IP Option | Cost |
|-----|--------------|------------------|------|
| T-Mobile Home Internet | Yes (100% CGNAT) | No consumer option | N/A |
| Verizon 5G Home | Yes (100% CGNAT) | No consumer option | N/A |
| Starlink | Yes (default) | Yes ($10/mo add-on) | $10/mo |
| Fixed Wireless (rural) | Usually Yes | Business plans only | $20-50/mo extra |

### No CGNAT (Port forwarding possible):

- All cable ISPs (Xfinity, Spectrum, Cox, Optimum)
- All fiber ISPs (AT&T Fiber, Verizon Fios, Frontier Fiber, Google Fiber)
- CenturyLink DSL (sometimes, varies by region)

---

## 3. Port Forwarding Accessibility Categories

| Category | ISPs | % of Market |
|----------|------|-------------|
| **Easy (1-2)** | Verizon Fios, AT&T Fiber, Xfinity, Spectrum, Google Fiber | 60% |
| **Medium (3)** | Cox, Optimum, CenturyLink Fiber, Frontier Fiber | 25% |
| **Hard (4)** | WOW!, CenturyLink DSL, Windstream DSL | 10% |
| **Impossible (5)** | T-Mobile 5G, Verizon 5G, Starlink (default) | 15% |

---

## 4. Double NAT Scenarios (ISP Gateway → Customer Mesh)

### Common ISP Gateways + Bridge Mode:

| ISP | Gateway | Bridge Mode Available? | Bridge Mode Process |
|-----|---------|------------------------|---------------------|
| Xfinity | xFi | Yes | xFi App → Advanced → Bridge Mode |
| AT&T | BGW320 | Yes (IP Passthrough) | Firewall → IP Passthrough → Passthrough DHCP |
| Verizon | G3100 | Yes | Advanced → LAN → IP Passthrough |
| Spectrum | SAX1V1K | No (app-based only) | Use DMZ to mesh router |
| Cox | Panoramic XB8 | Yes | Panoramic App → Advanced → Bridge Mode |

### Mesh Systems Port Forwarding Support:

| Mesh System | Port Forwarding? | Notes |
|-------------|------------------|-------|
| Google Nest Wifi | Yes | Google Home app |
| Eero | Yes | Eero app |
| Netgear Orbi | Yes | Web UI orbilogin.com |
| TP-Link Deco | Limited | App only, no ranges |
| Asus AiMesh | Yes | Full web UI support |

---

## 5. Top 5 ISP Port Forwarding Guides

### Xfinity/Comcast (xFi Gateway) - Difficulty: 2/5 ✅

1. Xfinity App → WiFi → View WiFi Equipment → Advanced Settings → Port Forwarding
2. Tap "Add Port Forward"
3. Select device → Add ports 51820 UDP → Apply

**Gotchas:** xFi Advanced Security blocks some ports, IPv6 disabled by default
**Test:** https://canyouseeme.org → Port 51820

### Spectrum (SAX1V1K) - Difficulty: 2/5 ✅

1. My Spectrum App → Services → Router → Advanced Settings → Port Forwarding
2. "Add Port Assignment" → Name: "WireGuard" → Internal/External Port: 51820 → UDP → Done

**Gotchas:** App-only (no web UI), must reserve static IP first

### AT&T Fiber (BGW320-500) - Difficulty: 2/5 ✅

1. Browser → 192.168.1.254 → Device Access Code (sticker)
2. Firewall → NAT/Gaming → Custom Services → Add: WireGuard, UDP 51820, Flint 2 IP → Save

**Gotchas:** Use IP Passthrough for own router

### Verizon Fios (G3100) - Difficulty: 2/5 ✅

1. My Fios App → Network → Advanced → Port Forwarding OR myfiosgateway.com
2. Firewall → Port Forwarding → Add Rule → UDP 51820 → Flint 2 IP → Apply

**Gotchas:** IPv6 can interfere, disable if issues

### Cox (Panoramic XB8) - Difficulty: 3/5 ⚠️

1. Panoramic Wifi App → WiFi → View Equipment → Advanced → Port Forwarding
2. Add: WireGuard UDP 51820 → Flint 2 IP → Save

**Gotchas:** Cloud-managed, sometimes unreliable

---

## 6. Dynamic IP Analysis

| ISP | Static IP Default? | IP Change Frequency | DDNS Support |
|-----|-------------------|---------------------|--------------|
| Cable (Xfinity, Spectrum, Cox) | No | 1-7 days | Yes |
| AT&T Fiber | No | Rare (weeks-months) | Yes |
| Verizon Fios | No | Rare | Yes |
| CenturyLink DSL | No | 1-30 days | Yes |
| T-Mobile 5G/Starlink | CGNAT | N/A | No |

**DDNS Solutions:** No-IP, DuckDNS, Cloudflare DDNS (all work with dynamic IPs)

---

## 7. Connection Type Comparison

| Type | Upload Speed | Port Forwarding | IP Type | Always-On Reliability |
|------|--------------|-----------------|---------|----------------------|
| Fiber | 250-1000 Mbps | ✅ Easy | Public | 99.99% |
| Cable | 10-50 Mbps | ✅ Medium | Public | 99.9% |
| DSL | 1-20 Mbps | ⚠️ Hard | Public/CGNAT | 99% |
| Fixed Wireless 5G | 20-100 Mbps | ❌ CGNAT | CGNAT | 95-98% |
| Starlink | 10-40 Mbps | ❌ CGNAT ($10/mo) | CGNAT | 95% |

**VPN Performance Threshold:** 20+ Mbps upload minimum for smooth remote work.

---

## 8. ISP Compatibility Matrix (Ranked by VPN Server Suitability)

| Rank | ISP | Connection Type | CGNAT? | Port Forward Method | Difficulty |
|------|-----|-----------------|--------|---------------------|------------|
| 1 | Metronet | Fiber | No | Web UI | 1/5 |
| 2 | Google Fiber | Fiber | No | Web UI | 1/5 |
| 3 | EPB Fiber | Fiber | No | Web UI | 1/5 |
| 4 | Verizon Fios | Fiber/DSL | No | My Fios App + Gateway | 2/5 |
| 5 | Brightspeed | Fiber | No | Web UI | 2/5 |
| 6 | AT&T Fiber | Fiber/DSL | No (Fiber) | BGW320 Web UI | 2/5 |
| 7 | Xfinity/Comcast | Cable | No | Xfinity App + xFi | 2/5 |
| 8 | Spectrum | Cable | No | My Spectrum App | 2/5 |
| 9 | Charter (Spectrum) | Cable | No | My Spectrum App | 2/5 |
| 10 | Frontier | Fiber/DSL | No (Fiber) | Arris Router Web UI | 2/5 |
| 11 | Cox | Cable | No | Panoramic App | 3/5 |
| 12 | Optimum/Altice | Cable/Fiber | No | Optimum App + Web UI | 3/5 |
| 13 | Windstream | DSL/Fiber | No | Web UI | 3/5 |
| 14 | Bresnan | Cable | No | Web Portal | 3/5 |
| 15 | WOW! | Cable | No | Panoramic App (hit-or-miss) | 4/5 |
| 16 | CenturyLink/Lumen | DSL/Fiber | Sometimes (DSL) | C3000Z Web UI | 4/5 |
| 17 | EarthLink | Reseller | Varies | Varies by underlying ISP | 4/5 |
| 18 | T-Mobile Home Internet | Fixed Wireless 5G | **Yes** | ❌ Impossible (CGNAT) | 5/5 |
| 19 | Verizon 5G Home | Fixed Wireless 5G | **Yes** | ❌ Impossible (CGNAT) | 5/5 |
| 20 | Starlink | Satellite | **Yes** | ❌ Impossible (CGNAT default, $10/mo option) | 5/5 |

**Summary:** 65% of US market (fiber + cable) fully compatible. 15% CGNAT impossible. 20% problematic but workable.

---

## 9. Pre-Qualification Questions

Screen customers BEFORE purchase:

1. **What ISP do you use?** (Quick compatibility check)
2. **Do you rent or own your modem/router?** (Bridge mode feasibility)
3. **What's your upload speed?** (Test at speedtest.net)
4. **Do you have mesh WiFi (Eero, Nest, etc.)?** (Double NAT complexity)
5. **Can you access your router admin page?** (192.168.1.1, 10.0.0.1)
6. **What's your WAN IP?** (whatismyipaddress.com vs router WAN IP = CGNAT check)
7. **Do you have static IP or business plan?** (Already solved)

### Red Flags (Quote Higher or Refund):

- T-Mobile/Verizon 5G Home
- Starlink (without $10/mo public IP)
- "I don't know my ISP equipment"
- Upload < 10 Mbps

---

## 10. Workarounds for Impossible Setups

### CGNAT Alternatives (Residential IP Critical):

| Solution | Residential IP? | Cost | Complexity | Notes |
|----------|----------------|------|------------|-------|
| Tailscale/ZeroTier | ❌ No | Free-$20/mo | Easy | Mesh VPN, data center IPs detectable |
| Cloudflare Tunnel | ❌ No | Free | Medium | Reverse tunnel, Cloudflare IPs blocked |
| VPS Relay | ❌ No | $5-20/mo | Hard | Linode/DigitalOcean → residential IP needed |
| Starlink Public IP | ✅ Yes | $10/mo | Easy | Only Starlink users |
| Business Static IP | ✅ Yes | $15-50/mo | Medium | ISP upgrade |

**Best Workaround:** Upgrade to business plan (Xfinity Business, AT&T Business Fiber) = public static IP + port forwarding enabled.

---

## Key Business Implications

1. **60% of customers can proceed immediately** (fiber/cable)
2. **15% need workarounds** (business upgrade)
3. **25% incompatible** (refund or redirect to Remote VPN Access tier)

### Recommendations:

- Pre-qualify aggressively during sales calls
- Offer "ISP Compatibility Check - Free" as lead magnet
- Fiber customers = dream clients (Metronet, Google Fiber, Verizon Fios)
- Cable = good (Xfinity, Spectrum)
- 5G/Satellite = walk away OR sell Remote VPN Access tier (YOUR infrastructure)

**Position as "ISP-compatible VPN router setup" with clear compatibility matrix on website.**

---

## Quick Reference: CGNAT Check

**How to detect CGNAT:**

1. Go to whatismyipaddress.com - note the IP
2. Log into router admin - check WAN IP
3. If they DON'T match = CGNAT = no port forwarding possible

**CGNAT IP Ranges (100.64.x.x - 100.127.x.x):** If router WAN IP starts with 100.64-100.127, customer has CGNAT.

---

*Research compiled from Perplexity Deep Research, December 2024*
