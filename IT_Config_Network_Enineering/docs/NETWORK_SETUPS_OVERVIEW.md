# NomadVPN Pro - Network Setups Documentation

## Business Model Overview

NomadVPN Pro offers two VPN endpoints for redundancy and flexibility:

| Endpoint | Location | ISP | Status |
|----------|----------|-----|--------|
| Primary | Home | Ziply Fiber | Active |
| Secondary | Investment Property | Xfinity | Active |

Travelers can connect to either network, providing backup if one goes down.

---

## Setup 1: Ziply Fiber + Deco Mesh (Home Network)

### Architecture
```
[Ziply Fiber ONT]
       |
       v
[TP-Link Deco Mesh: 192.168.68.1] <-- Main router, handles DHCP
       |
       v
[Flint 2 (GL-MT6000): 192.168.68.63] <-- WireGuard Server (Repeater mode)
       |
       v
[Home LAN: 192.168.8.x]
```

### Key Details
- **Flint 2 Mode:** Repeater (connects to Deco WiFi)
- **Flint 2 LAN IP:** 192.168.8.1
- **Flint 2 Deco IP:** 192.168.68.63
- **WireGuard Port:** 51820 (UDP)
- **DDNS:** yp61102.glddns.com

### Port Forwarding Required (on Deco)
| External Port | Internal IP | Internal Port | Protocol |
|---------------|-------------|---------------|----------|
| 51820 | 192.168.68.63 | 51820 | UDP |

### Why This Setup?
- Deco provides whole-home mesh WiFi coverage
- Flint 2 sits behind Deco as a dedicated VPN server
- Port forwarding routes WireGuard traffic through Deco to Flint 2
- DDNS handles dynamic IP changes from Ziply

### Configuration Steps
See: `WIREGUARD_TRAINING_GUIDE.md` for detailed steps

---

## Setup 2: Xfinity + Direct Modem Connection (Investment Property)

### Architecture
```
[Xfinity Cable Modem/Gateway]
       |
       v
[Flint 2 (GL-MT6000)] <-- WireGuard Server (Router mode)
       |
       v
[Property LAN]
```

### Key Details
- **Flint 2 Mode:** Router (direct connection to modem)
- **Flint 2 WAN IP:** Assigned by Xfinity (or static)
- **WireGuard Port:** 51820 (UDP)
- **DDNS:** TBD (separate domain for this location)
- **Management:** Xfinity app for port forwarding/firewall

### Port Forwarding Required (via Xfinity App)
| External Port | Internal IP | Internal Port | Protocol |
|---------------|-------------|---------------|----------|
| 51820 | Flint 2 WAN IP | 51820 | UDP |

### Why This Setup?
- Simpler architecture (no double NAT)
- Flint 2 connects directly to Xfinity modem
- Xfinity app controls port forwarding
- Separate network = redundancy for travelers

### Configuration Steps
**TODO:** Add Xfinity app steps when provided

---

## Travel Router Client Setup

Travel routers (Beryl AX, Slate AX) can connect to EITHER endpoint:

### Option A: Connect to Ziply/Home Network
- Endpoint: `yp61102.glddns.com:51820`
- Use configs from: `configs/travel_routers/`

### Option B: Connect to Xfinity/Investment Property
- Endpoint: `TBD_DDNS_DOMAIN:51820`
- Use configs from: `configs/xfinity_property/` (to be created)

### Switching Between Networks
1. Go to VPN > WireGuard Client on travel router
2. Disable current config
3. Enable alternate config
4. Verify connection

---

## Troubleshooting Quick Reference

### Can't connect to VPN?
1. Check travel router has internet (without VPN)
2. Verify DDNS is resolving: `ping yp61102.glddns.com`
3. Check port forwarding is correct on upstream router
4. Verify WireGuard server is running on Flint 2

### Connected but no internet?
1. Check IP Masquerading is ON (Flint 2 > VPN > WireGuard Server > Options)
2. Verify Flint 2 has internet connectivity
3. Try lowering MTU to 1280 on client config

### Connection drops frequently?
1. Lower MTU to 1280
2. Ensure PersistentKeepalive = 25
3. On mobile hotspot: keep phone plugged in

---

*Last Updated: December 24, 2024*
