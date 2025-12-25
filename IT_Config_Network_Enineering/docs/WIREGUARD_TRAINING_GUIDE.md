# WireGuard VPN Setup Training Guide

## Purpose of This Document
This guide explains not just WHAT was configured, but WHY each setting matters. Understanding the reasoning helps you troubleshoot issues and make informed changes in the future.

---

## Network Architecture Overview

```
INTERNET
    |
    v
[ISP Modem] ---> [Deco Mesh Router: 192.168.68.1]
                        |
                        v
              [Flint 2: 192.168.68.63] <--- WireGuard Server
                        |
                        v
                   [Home LAN]


REMOTE LOCATION (Hotel/Airbnb/etc.)
    |
    v
[Hotel WiFi/Hotspot] ---> [Travel Router: Beryl AX or Slate AX]
                                |
                                v
                          [WireGuard Client]
                                |
                                v
                    (Encrypted tunnel to Flint 2)
```

**WHY this architecture?**
- Your ISP router (Deco) handles internet from ISP
- Flint 2 sits behind Deco and runs the WireGuard server
- Travel routers connect TO Flint 2, creating a secure tunnel
- All traffic from travel router goes through your home network

---

## WireGuard Server Configuration

### Tunnel Address: 10.1.0.1/24

**WHAT:** The VPN server's internal IP address on the virtual tunnel network.

**WHY 10.1.0.1?**
- This is a private IP range (10.x.x.x) reserved for internal networks
- The /24 means 256 addresses available (10.1.0.1 to 10.1.0.254)
- Server gets .1, clients get .2, .3, .4, etc.
- Using 10.1.0.x avoids conflicts with:
  - Home LAN (192.168.8.x)
  - Deco network (192.168.68.x)
  - Hotel networks (usually 192.168.x.x or 10.0.x.x)

**WHY /24?**
- Allows up to 254 VPN clients (more than enough for home use)
- Standard subnet size, easy to remember and troubleshoot

### Listen Port: 51820

**WHAT:** The UDP port WireGuard listens on for incoming connections.

**WHY 51820?**
- This is WireGuard's default port (industry standard)
- UDP (not TCP) because WireGuard is designed for UDP
- Must be forwarded on Deco router for external access

**WHY UDP instead of TCP?**
- WireGuard uses UDP because it's faster (no connection overhead)
- TCP-over-TCP causes performance issues (TCP meltdown)
- UDP handles packet loss better for VPN traffic

---

## Server Options Explained

### IP Masquerading: ON

**WHAT:** NAT (Network Address Translation) for VPN traffic.

**WHY ON?**
- When traffic comes through the VPN tunnel, it has the client's VPN IP (10.1.0.2)
- Home network devices don't know how to route back to 10.1.0.x
- IP Masquerading translates 10.1.0.2 -> 192.168.8.1 (Flint's LAN IP)
- Now responses can find their way back through the tunnel

**WHAT HAPPENS IF OFF?**
- VPN connects, but no internet works
- Ping to server works, but nothing beyond
- This was the issue we saw earlier!

### Allow Remote Access LAN Subnet: ON

**WHAT:** Allows VPN clients to access devices on your home LAN.

**WHY ON?**
- You want to access home devices (NAS, printers, cameras) from travel
- Without this, you can only access the internet, not home LAN
- Enables accessing 192.168.8.x devices from travel router

**WHEN TO TURN OFF?**
- If you ONLY want internet access, not LAN access
- Slightly more secure (limits what VPN clients can reach)
- For NomadVPN business, usually want this ON

---

## DDNS (Dynamic DNS) Configuration

### Domain: yp61102.glddns.com

**WHAT:** A domain name that always points to your current public IP.

**WHY DDNS IS CRITICAL:**
Your ISP gives you a "dynamic" IP that can change:
- After router reboots
- After power outages
- Periodically by ISP policy

**THE PROBLEM WITHOUT DDNS:**
1. You set up VPN with IP 50.54.154.234
2. IP changes to 72.12.33.89
3. Travel router tries to connect to old IP
4. Connection fails - you're stranded!

**THE SOLUTION WITH DDNS:**
1. DDNS service monitors your public IP
2. When IP changes, DDNS updates the domain record
3. yp61102.glddns.com always resolves to current IP
4. Travel router connects to domain, always works!

**WHY GL.iNet's DDNS (glddns.com)?**
- Free, built into GL.iNet routers
- Automatic updates (no manual configuration)
- Works reliably for WireGuard

---

## Client Profiles

### Profile: Secure Channel For Work (10.1.0.2)
- **Target:** Beryl AX (GL-MT3000)
- **Purpose:** Primary travel router for work

### Profile: Prime Analytics (10.1.0.3)
- **Target:** Slate AX (GL-AXT1800)
- **Purpose:** Secondary/backup travel router

**WHY TWO PROFILES?**
- Each device needs unique IP to avoid conflicts
- Can connect both simultaneously if needed
- Different routers for different trips/purposes

**WHY DIFFERENT IPs (10.1.0.2 vs 10.1.0.3)?**
- WireGuard requires unique IPs per client
- Server tracks which public key = which internal IP
- Prevents IP conflicts on the tunnel network

---

## Port Forwarding on Deco

### Current Rule Needed:
| External Port | Internal IP | Internal Port | Protocol |
|---------------|-------------|---------------|----------|
| 51820 | 192.168.68.63 | 51820 | UDP |

**WHY PORT FORWARDING IS REQUIRED:**

1. **The Problem:**
   - Flint 2 is behind Deco (double NAT)
   - External traffic reaches Deco, not Flint 2
   - Travel router tries to connect, Deco blocks it

2. **The Solution:**
   - Tell Deco: "When traffic arrives on port 51820, send it to Flint 2"
   - Now WireGuard connections reach the server

**WHY 192.168.68.63?**
- This is Flint 2's IP on the Deco network
- Changed after factory reset (was 192.168.68.54)
- Must update port forwarding rule when IP changes!

---

## Client Configuration Explained

```ini
[Interface]
Address = 10.1.0.2/24           # Client's VPN IP
PrivateKey = <secret>           # Client's private key (never share!)
DNS = 10.1.0.1,64.6.64.6        # DNS servers to use
MTU = 1420                      # Maximum packet size

[Peer]
AllowedIPs = 0.0.0.0/0,::/0     # Route ALL traffic through VPN
Endpoint = yp61102.glddns.com:51820  # Server address (DDNS!)
PersistentKeepalive = 25        # Keep connection alive
PublicKey = <server-public>     # Server's public key
```

### Key Settings Explained:

**Address = 10.1.0.2/24**
- Client's IP inside the VPN tunnel
- Must match what server expects for this profile

**DNS = 10.1.0.1,64.6.64.6**
- Primary: Flint 2 (handles local DNS)
- Secondary: External DNS (fallback)
- WHY? Prevents DNS leaks, uses home network's DNS

**MTU = 1420**
- Maximum Transmission Unit (packet size)
- WHY 1420? WireGuard overhead requires smaller packets
- If issues on cellular/hotel: try 1280 for better compatibility

**AllowedIPs = 0.0.0.0/0**
- "Send ALL traffic through VPN"
- 0.0.0.0/0 = every IPv4 address
- ::/0 = every IPv6 address
- This is "full tunnel" mode

**Endpoint = yp61102.glddns.com:51820**
- WHERE to connect (DDNS domain + port)
- WHY domain not IP? Survives IP changes!

**PersistentKeepalive = 25**
- Send a packet every 25 seconds
- WHY? Keeps NAT mappings alive
- Prevents connection drops on mobile/hotel networks

---

## Troubleshooting Guide

### Issue: VPN connects but no internet

**Check these in order:**
1. IP Masquerading enabled? (VPN > WireGuard Server > Options)
2. Port forwarding correct IP? (Deco settings)
3. Flint 2 has internet? (Test from Flint 2 admin panel)

### Issue: VPN won't connect at all

**Check these:**
1. DDNS enabled? (Applications > Dynamic DNS)
2. Port forwarding rule exists? (Deco admin)
3. Correct port? (51820 UDP)
4. Travel router has internet? (Without VPN first)

### Issue: Connection drops frequently

**Try these:**
1. Lower MTU to 1280 (on client config)
2. Check PersistentKeepalive is 25
3. On mobile hotspot: keep phone plugged in, disable Low Power Mode

### Issue: Can't access home LAN devices

**Check:**
1. "Allow Remote Access LAN Subnet" is ON
2. Device is on correct subnet (192.168.8.x)
3. Device firewall allows connections

---

## Quick Reference Card

| Setting | Value | Why |
|---------|-------|-----|
| Server Tunnel | 10.1.0.1/24 | Private range, avoids conflicts |
| Port | 51820 UDP | WireGuard default |
| IP Masquerading | ON | Required for internet to work |
| Remote LAN Access | ON | Access home devices |
| DDNS | yp61102.glddns.com | Survives IP changes |
| Deco Port Forward | 192.168.68.63:51820 | Routes to Flint 2 |
| Client MTU | 1420 (or 1280) | WireGuard overhead |
| Keepalive | 25 seconds | Prevents drops |

---

## Important Reminders

1. **Always export configs with DDNS domain, not IP**
2. **After factory reset, reconfigure everything**
3. **Update Deco port forwarding if Flint 2's IP changes**
4. **Test VPN before traveling!**

---

*Created: December 24, 2024*
*For: NomadVPN Pro - IT Configuration*
