# ISP Compatibility Research Prompt

**Purpose:** Deep research for Perplexity to understand ISP landscape for VPN server hosting
**Created:** December 24, 2024

---

## Context

Building a VPN router setup service for digital nomads who need to route their internet traffic through their home residential IP while traveling abroad. The setup requires:

1. A GL.iNet Flint 2 router at home running as a WireGuard VPN server
2. Port forwarding on the customer's home network to route UDP port 51820 to the Flint 2
3. A travel router (GL.iNet Beryl AX) that connects back to the home server

**The critical technical requirement is port forwarding UDP 51820 from the public internet to an internal device.**

---

## Research Questions

### 1. US ISP Market Share & Equipment Types

For each of the top 15 US residential ISPs by subscriber count:
- What modem/gateway equipment do they typically provide?
- Do they use standalone modems or modem/router combos?
- Can customers use their own equipment, or is ISP equipment required?
- What is their admin interface for managing port forwarding (web portal, mobile app, or both)?

### 2. CGNAT (Carrier-Grade NAT) Status

Which ISPs use CGNAT that would BLOCK port forwarding entirely?
- T-Mobile Home Internet - CGNAT status?
- Verizon 5G Home Internet - CGNAT status?
- Starlink - CGNAT status and workarounds?
- Fixed wireless providers (common in rural areas)
- Any traditional cable/fiber ISPs using CGNAT?

For ISPs with CGNAT, are there options to get a public IP (paid add-on, business tier, etc.)?

### 3. Port Forwarding Accessibility by ISP

Categorize ISPs into:
- **Easy:** Customer can self-configure port forwarding via web interface or app
- **Medium:** Requires calling support or using specific app with limitations
- **Hard:** Locked down, requires business tier or special request
- **Impossible:** CGNAT with no public IP option

### 4. Double NAT Scenarios

Many customers have:
- ISP modem/gateway → their own mesh router (Google Nest, Eero, Orbi, TP-Link Deco, etc.)

For this double NAT scenario:
- Which mesh systems support port forwarding?
- Which require bridge mode on the ISP gateway?
- How do you put common ISP gateways into bridge mode (Xfinity xFi, AT&T BGW320, Verizon G3100)?

### 5. ISP-Specific Port Forwarding Guides

For the top 5 ISPs (Xfinity/Comcast, AT&T, Spectrum, Verizon Fios, Cox):
- Step-by-step process to add a port forwarding rule
- Where is the setting located (app name, web URL, menu path)?
- Any known limitations or gotchas?
- Do they block common ports or have firewall restrictions?

### 6. Dynamic IP Considerations

- Which ISPs provide static IPs vs dynamic IPs by default?
- How frequently do dynamic IPs change for major ISPs?
- Do any ISPs block or interfere with DDNS services?

### 7. Fiber vs Cable vs DSL vs Fixed Wireless

Compare these connection types for VPN server hosting:
- Typical upload speeds (critical for VPN performance)
- Port forwarding complexity
- IP assignment (static vs dynamic vs CGNAT)
- Reliability for always-on server

### 8. Compatibility Matrix

Create a summary matrix showing:
| ISP | Connection Type | CGNAT? | Port Forward Method | Difficulty (1-5) | Notes |

With the top 20 US ISPs ranked by how suitable they are for hosting a home VPN server.

### 9. Pre-Qualification Questions

What questions should I ask potential customers to determine if their ISP/setup is compatible BEFORE they purchase?

### 10. Workarounds for Problematic Setups

For customers with CGNAT or locked-down ISPs:
- Tailscale/ZeroTier as alternatives?
- Cloudflare Tunnel options?
- VPS relay solutions?
- Do these preserve the residential IP appearance that's critical for the use case?

---

## Expected Output

Comprehensive report enabling:
1. Pre-qualification of customers before purchase
2. ISP-specific setup guides for support team
3. Identification of "impossible" setups to avoid
4. Workaround strategies for edge cases
