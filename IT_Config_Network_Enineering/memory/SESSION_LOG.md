# IT Config Network Engineering - Running Session Log

## Active Session: December 23, 2024

---

### 19:05 - Starting Flint 2 Firmware Update
**Goal:** Update Flint 2 to latest firmware to prevent conflicts with travel routers
**Current Version:** v4.8.3
**Available Version:** v4.8.2 (noted in upgrade reminder earlier - need to verify)

**Pre-Update Checklist:**
- [x] VPN currently working with Slate AX
- [ ] Backup current settings
- [ ] Document current WireGuard server config
- [ ] Perform upgrade
- [ ] Verify WireGuard server still running after upgrade
- [ ] Test travel router connections

---

### Network Inventory

| Device | Model | IP (LAN) | IP (Deco Network) | Role | Firmware |
|--------|-------|----------|-------------------|------|----------|
| Flint 2 | GL-MT6000 | 192.168.12.1 | 192.168.68.54 | WireGuard Server | Updated |
| Slate AX | GL-AXT1800 | 192.168.9.1 | - | Travel Router | v4.7.0 |
| Beryl AX | GL-MT3000 | 192.168.8.1 | - | Travel Router | TBD |
| Deco Mesh | TP-Link | 192.168.68.1 | - | Main Router | - |

---

### WireGuard Server Config (Pre-Update Snapshot)
```
Tunnel Address: 10.1.0.1/24
Listen Port: 51820
DDNS: yp61102.glddns.com

Profiles:
- Secure Channel For Work: 10.1.0.2/24 (Beryl AX)
- Prime Analytics: 10.1.0.3/24 (Slate AX)
```

---

### Port Forwarding (Deco)
| Service | External Port | Internal IP | Internal Port | Protocol |
|---------|---------------|-------------|---------------|----------|
| Flint 2 WireGuard | 51820 | 192.168.68.54 | 51820 | UDP |

---

### Session Timeline

| Time | Action | Result |
|------|--------|--------|
| 17:00 | Started VPN troubleshooting | - |
| 17:15 | Discovered DDNS disabled | Fixed |
| 17:30 | Found old IP in travel router configs | Identified |
| 18:00 | Deleted wrong configs from Slate AX | Done |
| 18:30 | Added port forwarding on Deco | Done |
| 18:45 | Uploaded correct config with DDNS | Success |
| 19:00 | VPN connection working | Verified |
| 19:05 | Starting Flint 2 firmware update | In Progress |
| 19:XX | Flint 2 firmware updated, LAN IP changed to 192.168.12.1 | Done |
| 19:XX | Diagnosed AXT1800 dropping - REKEY-GIVEUP errors in logs | Found |
| 19:XX | Changed AXT1800 WireGuard MTU from 1420 to 1280 | Applied |
| 20:XX | VPN shows connected but no internet passing through | Issue |
| 20:XX | Checked WireGuard Server Options (IP Masquerading ON, Remote LAN ON) | OK |
| 20:XX | Found PC getting 169.254.x.x APIPA addresses - DHCP failure | Root Cause |
| 20:XX | Set static IP on Ethernet 2 (192.168.12.100) | Applied |
| 20:XX | Set static IP on Ethernet 4 (192.168.12.101) | Applied |
| 20:XX | Ping 192.168.12.1 (Flint 2 LAN) - 100% packet loss | FAILED |
| 20:XX | Ping 192.168.68.54 (Flint 2 on Deco) - Destination unreachable | FAILED |
| 20:XX | Ping 192.168.68.1 (Deco gateway) - Responding | OK |
| 20:XX | **CONCLUSION: Flint 2 is completely offline/unresponsive** | CRITICAL |

---

### Current Issue: Flint 2 Unresponsive

**Symptoms:**
- Devices connected to Flint 2 LAN get 169.254.x.x APIPA addresses (no DHCP)
- Flint 2 not responding on LAN IP (192.168.12.1)
- Flint 2 not responding on Deco network IP (192.168.68.54)
- Deco gateway (192.168.68.1) is working fine

**Diagnosis:**
- Static IPs set on PC Ethernet adapters to rule out DHCP issue
- Ping tests confirm Flint 2 is completely unreachable on all interfaces
- Flint 2 appears to be frozen/crashed

**Required Action:**
- Power cycle Flint 2 (unplug 30 sec, replug, wait 2-3 min)
- After reboot, verify DHCP is enabled in NETWORK → LAN
- Re-test VPN connectivity from travel routers

**PC Static IP Configuration (Temporary):**
- Ethernet 2: 192.168.12.100/24, Gateway 192.168.12.1
- Ethernet 4: 192.168.12.101/24, Gateway 192.168.12.1

---

### Notes & Learnings
- Always export WireGuard configs with DDNS domain, not IP
- Travel routers on v4.7.0, Flint 2 on v4.8.3 - version mismatch may cause issues
- MTU 1420 can cause fragmentation on cellular/hotspot - use 1280 for stability
- iPhone hotspots are unstable - keep phone plugged in, disable Low Power Mode
- Global Proxy mode causes brief "no internet" during VPN reconnection - this is normal
- Port forwarding on Deco is required since Flint 2 is behind it
- After firmware updates, Flint 2 may become unresponsive - power cycle often required
- 169.254.x.x (APIPA) addresses = DHCP failure, router may be offline
- Can access GL.iNet router via Deco network IP if LAN is down (unless router is completely offline)
- Use `ping` to diagnose: if LAN IP and WAN IP both fail, device needs power cycle

---

*Last Updated: 2024-12-23 ~20:30*
