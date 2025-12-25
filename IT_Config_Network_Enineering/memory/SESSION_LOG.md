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

---

### Historical Files Discovered (Dec 24, 2024)

**Found via agent search across entire PC:**

| File | Location | Contents |
|------|----------|----------|
| README.md | `C:\Users\timud\Documents\Home Network\` | LED fix, mode scripts, SSH password |
| Flint2_Router_Optimization_Report.docx | Same folder | Original diagnostic report |
| Flint2_Complete_Guide.docx | Same folder | Full guide with mode switching |

**Key Credentials Found:**
- SSH Password: `Newgoal@910@123456`
- Default Password (after reset): `goodlife`
- Default IP (after reset): `192.168.8.1`

**LED Fix Command:**
```bash
ssh root@<ip> 'killall gl_led; uci set gl_led.global.led_daemon=0; uci commit gl_led'
```

**Mode Scripts (were on router at `/root/`):**
- `check_mode.sh` - Check current mode
- `travel_mode.sh` - Switch to router mode
- `home_mode.sh` - Switch to bridge mode
- Now backed up locally at: `IT_Config_Network_Enineering/scripts/router_scripts/`

---

### RESOLVED: Flint 2 Factory Reset & Recovery (Dec 24, 2024)

**Problem:** Flint 2 completely frozen/unresponsive after firmware update
**Solution:** Physical factory reset (hold reset button 10+ sec)

**Recovery Timeline:**
| Time | Action | Result |
|------|--------|--------|
| ~01:00 | Physical factory reset performed | Router rebooted |
| ~01:02 | Flint 2 came online at 192.168.8.1 | Responding to ping |
| ~01:03 | Initial setup - set password to `Newgoal@910@123456` | Done |
| ~01:04 | WiFi setup - kept defaults (GL-MT6000-102) | Done |
| ~01:05 | Cleared old SSH host key, verified SSH working | SSH OK |
| ~01:06 | LED verified - solid (fixed by factory reset) | LED OK |
| ~01:07 | Checked crash logs - empty (wiped by reset) | No data |
| ~01:10 | Connected to "Set Theory Squad" via 5G Repeater | Connected |
| ~01:12 | Internet connectivity verified | Working |

**Current Flint 2 Configuration (Post-Reset):**
| Setting | Value |
|---------|-------|
| Firmware | v4.8.3 |
| LAN IP | 192.168.8.1 |
| Deco Network IP | 192.168.68.63 |
| Gateway | 192.168.68.1 |
| Connection Mode | Repeater (5GHz to "Set Theory Squad") |
| SSH | Enabled, working |
| Password | `Newgoal@910@123456` |

**Scripts Backed Up Locally:**
```
IT_Config_Network_Enineering/scripts/router_scripts/
├── check_mode.sh
├── fix_led.sh
├── home_mode.sh
└── travel_mode.sh
```

**Freeze Root Cause:** Unknown - crash logs wiped by factory reset

---

### COMPLETED: WireGuard Server Re-Configuration (Dec 24, 2024)

**All tasks completed via browser automation:**

| Task | Status | Details |
|------|--------|---------|
| WireGuard Server Config | DONE | 10.1.0.1/24, Port 51820 |
| Server Options | DONE | IP Masquerading ON, Allow Remote LAN ON |
| DDNS Enabled | DONE | yp61102.glddns.com |
| Profile: Secure Channel For Work | DONE | 10.1.0.2/24 (Beryl AX) |
| Profile: Prime Analytics | DONE | 10.1.0.3/24 (Slate AX) |
| WireGuard Server Started | DONE | Running, 0 clients connected |
| Client configs use DDNS | DONE | Endpoint = yp61102.glddns.com:51820 |

**WireGuard Server Status:**
```
Status: RUNNING (green indicator)
Tunnel Address: 10.1.0.1/24
Listen Port: 51820
Connected Devices: 0 (travel routers not yet connected)
```

**Client Profiles Created:**
| # | Name | Client IP | Target Router |
|---|------|-----------|---------------|
| 1 | Secure Channel For Work | 10.1.0.2/24 | Beryl AX (GL-MT3000) |
| 2 | Prime Analytics | 10.1.0.3/24 | Slate AX (GL-AXT1800) |

**Client Config Sample (using DDNS):**
```
[Interface]
Address = 10.1.0.2/24
PrivateKey = <auto-generated>
DNS = 10.1.0.1,64.6.64.6
MTU = 1420

[Peer]
AllowedIPs = 0.0.0.0/0,::/0
Endpoint = yp61102.glddns.com:51820  <-- DDNS domain!
PersistentKeepalive = 25
PublicKey = <server-public-key>
```

---

### ALL TASKS COMPLETED (Dec 24, 2024)

- [x] Update Deco port forwarding to new IP (192.168.68.63:51820) - DONE
- [x] Export client configs and upload to travel routers - DONE
- [x] Test VPN from travel routers - WORKING
- [ ] Re-apply mode switching scripts to router (optional)

**VPN STATUS: FULLY OPERATIONAL**
- Travel routers connecting successfully
- Internet flowing through VPN tunnel
- DDNS ensuring connection survives IP changes

---

### Router Inventory (Updated Dec 24, 2024)

| Device | Model | Profile Name | WireGuard IP | Role | Status |
|--------|-------|--------------|--------------|------|--------|
| Flint 2 | GL-MT6000 | - | 10.1.0.1 | WireGuard Server | Online |
| Beryl AX | GL-MT3000 | Travel_router_AX3000 | 10.1.0.2 | Travel Router | Online |
| Slate AX | GL-AXT1800 | Travel_router_AX | 10.1.0.3 | Travel Router | Online |
| AC1200 | GL-AC1200 | Travel_router_AC | 10.1.0.4 | Travel Router | Online |
| Deco Mesh | TP-Link | - | - | Main Router | Online |

### Network Details

| Device | LAN IP | Deco IP | Password |
|--------|--------|---------|----------|
| Flint 2 | 192.168.8.1 | 192.168.68.63 | `Newgoal@910@123456` |
| Deco Mesh | 192.168.68.1 | - | - |

---

*Last Updated: 2024-12-24 11:35*

---

### Session Update: Dec 24, 2024 11:35

**Travel Router Profiles Renamed:**
- Old names (Secure Channel For Work, Prime Analytics) replaced with standardized naming
- Added third travel router (AC1200) to the fleet
- All three travel routers confirmed online and connected to WireGuard server

**Config Files Updated:**
```
configs/travel_routers/
├── Travel_router_AX3000.conf  ← Beryl AX (10.1.0.2)
├── Travel_router_AX.conf      ← Slate AX (10.1.0.3)
└── Travel_router_AC.conf      ← AC1200 (10.1.0.4)
```
