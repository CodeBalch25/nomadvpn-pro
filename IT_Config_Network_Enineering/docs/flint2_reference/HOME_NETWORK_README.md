# Home Network Configuration - Memory File
**Last Updated:** December 2024
**Session:** GL.iNet Flint 2 Router Optimization & Bridge Mode Setup

---

## Network Overview

| Device | Role | IP Address | Access |
|--------|------|------------|--------|
| TP-Link Deco | Primary Router/Mesh | 192.168.68.1 | Web UI or Deco App |
| GL.iNet Flint 2 (GL-MT6000) | Wireless Extender/Bridge | DHCP (check Deco app) | SSH or Web UI |

**Subnet:** 192.168.68.0/22 (255.255.252.0)

---

## What Was Done

### 1. Diagnosed Original Issues
- WAN connection drops during video calls
- Hardware flow offloading was DISABLED
- Same-channel interference (2.4GHz on channel 4)
- Double NAT configuration
- Using slow 2.4GHz backhaul instead of 5GHz

### 2. Fixes Applied to Flint 2

**Hardware Flow Offloading:** Enabled
```bash
uci set firewall.@defaults[0].flow_offloading='1'
uci set firewall.@defaults[0].flow_offloading_hw='1'
uci commit firewall
```

**Channel Interference:** Changed 2.4GHz AP from channel 4 to channel 11

**Bridge Mode Configuration:**
- Disabled DHCP server (Deco handles DHCP)
- Disabled NAT/masquerade
- Set static IP in Deco's subnet
- Connected via 5GHz backhaul to Deco's "Set Theory Squad" network

**LED Fix:** Disabled gl_led daemon to stop blinking in bridge mode

---

## Mode Switching Scripts (On Router)

Three scripts were created in `/root/` on the Flint 2:

### Check Current Mode
```bash
ssh root@<flint2-ip> '/root/check_mode.sh'
```

### Switch to Travel Mode (Router Mode)
```bash
ssh root@<flint2-ip> '/root/travel_mode.sh'
```
- Enables DHCP server
- Enables NAT
- Sets IP to 192.168.8.1
- Use when connecting to hotel/travel WiFi

### Switch to Home Mode (Bridge Mode)
```bash
ssh root@<flint2-ip> '/root/home_mode.sh'
```
- Disables DHCP server
- Disables NAT
- Sets IP to 192.168.68.2 (static)
- Use when returning home to connect to Deco

---

## How to Access Devices

### Deco (Primary Router)
- **Web UI:** http://192.168.68.1
- **App:** TP-Link Deco (iOS/Android)
- **SSH:** Not available (by design)
- **Logs:** Only via Deco app or web UI login

### Flint 2 (Extender)
- **Web UI:** http://<current-ip> (check Deco app for connected devices)
- **SSH:** `ssh root@<current-ip>`
- **Password:** `Newgoal@910@123456`
- **Firmware:** 4.8.3 (OpenWrt 21.02-SNAPSHOT)

---

## Router Specifications

**GL.iNet Flint 2 (GL-MT6000)**
- CPU: MediaTek MT7986 (Filogic 830)
- RAM: 1GB DDR4
- WiFi: Wi-Fi 6 (AX6000) - 2.4GHz + 5GHz
- Ports: 1x 2.5G WAN, 4x 1G LAN
- Features: WireGuard, OpenVPN, AdGuard Home

---

## Important Settings Reference

### Current Bridge Mode Settings (UCI)
```
firewall.@zone[1].masq='0'          # NAT disabled
dhcp.lan.ignore='1'                  # DHCP disabled
network.lan.ipaddr='192.168.68.2'   # Static IP
network.lan.gateway='192.168.68.1'  # Deco gateway
firewall.@defaults[0].flow_offloading_hw='1'  # HW offload enabled
```

### 5GHz Backhaul
- Connected to Deco's 5GHz network "Set Theory Squad"
- Link speed: Up to 2401 Mbps
- Much faster than 2.4GHz backhaul (573 Mbps)

---

## Troubleshooting

### Can't find Flint 2 IP?
1. Open Deco app → Devices → Look for GL.iNet or MT6000
2. Or scan network: `arp -a | findstr 92-83-c4`

### Flint 2 unreachable after mode switch?
- Wait 2-3 minutes for reboot
- In Home mode: Look for new DHCP IP from Deco
- In Travel mode: Connect to Flint's WiFi, access 192.168.8.1

### LED won't stop blinking?
```bash
ssh root@<ip> 'killall gl_led; uci set gl_led.global.led_daemon=0; uci commit gl_led'
```

### Need to factory reset?
- Hold reset button 10+ seconds
- Default IP: 192.168.8.1
- Default password: goodlife

---

## Files in This Folder

| File | Description |
|------|-------------|
| README.md | This memory file |
| Flint2_Router_Optimization_Report.docx | Original diagnostic report |
| Flint2_Complete_Guide.docx | Full guide with mode switching instructions |

---

## Network Health Benchmarks (Dec 2024)

| Metric | Result |
|--------|--------|
| Gateway latency | 2-3ms |
| Internet latency | 5-11ms |
| DNS resolution | 4-11ms |
| Packet loss | 0% |

---

## Notes for Future Sessions

1. **Deco has no SSH** - Can only check logs via app or web UI with password
2. **Flint 2 IP is dynamic** in bridge mode - Check Deco app for current IP
3. **WireGuard** available on Flint 2, NOT on Deco
4. **Travel mode** is for use with portable travel routers abroad
5. **5GHz backhaul** is critical for performance - verify it's connected to 5GHz not 2.4GHz
