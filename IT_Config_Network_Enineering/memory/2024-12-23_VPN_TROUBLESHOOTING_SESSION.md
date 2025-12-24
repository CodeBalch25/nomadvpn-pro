# VPN Troubleshooting Session - December 23, 2024

## Issue Summary
WireGuard VPN connections from travel routers (Beryl AX, Slate AX) to home Flint 2 server stopped working after config changes.

---

## Network Topology Discovered

```
Internet (Public IP: 50.54.154.234)
    │
    ▼
TP-Link Deco Mesh ("Set Theory Squad")
Network: 192.168.68.x
    │
    ├── Flint 2 (GL-MT6000) - WireGuard SERVER
    │   Deco IP: 192.168.68.54
    │   LAN IP: 192.168.8.1
    │   DDNS: yp61102.glddns.com
    │   WireGuard Port: 51820
    │
    └── Other devices...

Travel Routers (on cellular/external networks):
    ├── Slate AX (GL-AXT1800) - 192.168.9.1 (when local)
    │   Profile: Prime Analytics (10.1.0.3/24)
    │
    └── Beryl AX (GL-MT3000) - 192.168.8.1 (when local)
        Profile: Secure Channel For Work (10.1.0.2/24)
```

---

## Root Causes Identified

### 1. DDNS Was Disabled
- **Finding:** DDNS toggle on Flint 2 was OFF
- **Impact:** Domain `yp61102.glddns.com` returned "Non-existent domain"
- **Fix:** Enabled DDNS in Applications → Dynamic DNS → Toggle ON → Apply

### 2. Travel Router Configs Had Wrong/Old IP
- **Finding:** Slate AX "Prime Analytics" config had endpoint `71.237.228.32:51820`
- **Problem:** This was the OLD public IP, current IP is `50.54.154.234`
- **Fix:** Deleted old configs, created new with DDNS domain endpoint

### 3. Mismatched Client Configuration
- **Finding:** User-created "Travel_mode" config had:
  - Wrong client IP: 10.1.0.4/24 (server only has 10.1.0.2 and 10.1.0.3)
  - Different private key than server expected
- **Impact:** Server rejected connection (REKEY-GIVEUP errors)
- **Fix:** Export correct config from Flint 2 server with matching keys

### 4. Missing Port Forwarding on Deco
- **Finding:** Port 51820 UDP was NOT forwarded from Deco to Flint 2
- **Impact:** External connections couldn't reach WireGuard server
- **Fix:** Added port forwarding rule on Deco:
  - Service: Custom "Flint 2 Port Forwarding"
  - Internal IP: 192.168.68.54
  - Internal Port: 51820
  - External Port: 51820
  - Protocol: UDP

---

## Working Configuration

### Flint 2 WireGuard Server Settings
- **Tunnel Address:** 10.1.0.1/24
- **Listen Port:** 51820
- **DDNS Domain:** yp61102.glddns.com

### Client Profiles on Server
| Profile Name | Client IP | For Router |
|--------------|-----------|------------|
| Secure Channel For Work | 10.1.0.2/24 | Beryl AX |
| Prime Analytics | 10.1.0.3/24 | Slate AX |

### Working Slate AX Config (Prime_Analytics_File_Deco.conf)
```ini
[Interface]
Address = 10.1.0.3/24
PrivateKey = 0LpZebg7PQpZ8zWy+orupYHpTdyJN6OYo3uDOK4SJ3o=
DNS = 64.6.64.6,10.1.0.1
MTU = 1420

[Peer]
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = yp61102.glddns.com:51820
PersistentKeepalive = 25
PublicKey = nPr1FmmCR831pncdto6QYDNaP4pGGeXOF9UG40XnQQM=
```

---

## Key Lessons Learned

### 1. Always Use DDNS Domain, Not IP
- Export configs from Flint 2 with DDNS domain in "Address" field
- Change from IP to `yp61102.glddns.com` before clicking Export
- Prevents breakage when ISP changes public IP

### 2. Port Forwarding is Required When Behind Another Router
- Flint 2 behind Deco requires port forward on Deco
- Must forward: UDP 51820 → Flint 2's IP on Deco network (192.168.68.54)

### 3. Client IP Must Match Server Profile
- Server assigns specific IPs to each profile
- Client config MUST use the IP assigned by server
- Using wrong IP = connection rejected

### 4. After ANY Server Config Change
1. Re-generate client profiles on Flint 2
2. Re-export with DDNS domain
3. Delete old profile on travel router
4. Import fresh profile

### 5. Hairpin NAT Limitation
- Can't test VPN from inside home network to home's public IP
- Most routers (including Deco) don't support hairpin NAT
- Must test from external network (cellular, coffee shop, etc.)

---

## Diagnostic Commands

```bash
# Check DDNS resolution
nslookup yp61102.glddns.com 8.8.8.8

# SSH to Flint 2 for diagnostics
ssh root@192.168.8.1

# Check WireGuard status on router
wg show

# View WireGuard logs
logread | grep -i wireguard
```

---

## Files Created/Updated

- `configs/travel_routers/Prime_Analytics_File_Deco.conf` - Working Slate AX config
- `configs/travel_routers/beryl_ax_wireguard_client.conf` - Beryl AX reference config
- `docs/WIREGUARD_TROUBLESHOOTING.md` - General troubleshooting checklist

---

## TODO / Follow-up

- [ ] Verify Beryl AX config uses DDNS domain (may need same fix)
- [ ] Document Deco port forwarding in setup guide
- [ ] Consider setting up monitoring/alerts for DDNS status
- [ ] Backup working configs to cloud storage

---

## Session Metadata
- **Date:** December 23, 2024
- **Duration:** ~2 hours
- **Outcome:** SUCCESS - VPN connection restored
- **Routers Involved:** Flint 2 (server), Slate AX (client), TP-Link Deco (upstream)
