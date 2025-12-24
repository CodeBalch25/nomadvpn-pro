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

---

### Notes & Learnings
- Always export WireGuard configs with DDNS domain, not IP
- Travel routers on v4.7.0, Flint 2 on v4.8.3 - version mismatch may cause issues
- Port forwarding on Deco is required since Flint 2 is behind it

---

*Last Updated: 2024-12-23 19:05*
