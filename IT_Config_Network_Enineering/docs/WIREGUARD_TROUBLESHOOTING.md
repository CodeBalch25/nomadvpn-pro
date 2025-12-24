# WireGuard Troubleshooting Checklist - GL.iNet Flint 2

## Quick Diagnosis Steps

### Step 1: Access Flint 2 Admin Panel
- Default gateway: `192.168.8.1`
- Navigate to: VPN → WireGuard Server

### Step 2: Check These Settings First

| Setting | Check | Common Issue |
|---------|-------|--------------|
| **Tunnel IP** | Should NOT be 10.0.0.1/24 | Conflicts with Xfinity/ISP gateways |
| **Recommended** | Use 10.1.0.1/24 or 10.2.0.1/24 | Must include /24 CIDR |
| **Listen Port** | Default 51820, try 51825 if blocked | Some ISPs block default |
| **Remote LAN Access** | Should be ENABLED | Gear icon in VPN dashboard |

### Step 3: Verify Port Forwarding (if behind another router)
- External Port: 51820 → Internal: 51820 → Flint 2 LAN IP
- Protocol: UDP only
- Source Port: ANY (clients use random source ports)

### Step 4: Client Profile Sync
**CRITICAL:** After ANY server config change, you MUST:
1. Re-generate client profiles on Flint 2
2. Re-export to travel router (QR code or .conf file)
3. Delete old profile on travel router first

### Step 5: Test Connection
- Use phone on cellular (NOT WiFi) as first test
- Check handshake timestamp updates
- Verify IP shows as home network IP

---

## Common Fixes

### Fix 1: Tunnel IP Conflict
```
OLD: 10.0.0.1/24 (conflicts with many ISPs)
NEW: 10.1.0.1/24 (safe choice)
```
After changing: Re-export ALL client profiles

### Fix 2: LAN IP Conflict (Multiple GL.iNet routers)
- Flint 2 (home): Keep 192.168.8.1
- Travel router: Change to 192.168.10.1
- Path: Network → LAN → LAN IP

### Fix 3: DNS Not Working
Option A: Enable "Allow Remote Access to LAN Subnet"
Option B: Set client DNS to 1.1.1.1 or 8.8.8.8

### Fix 4: DDNS Setup (Dynamic IP)
1. Applications → Dynamic DNS → Enable
2. Note domain: xxxxx.gl-inet.com
3. WireGuard Server → Change endpoint from IP to DDNS domain
4. Re-export client profiles

---

## SSH Diagnostics (Advanced)

```bash
# Connect to Flint 2
ssh root@192.168.8.1

# Check WireGuard status
wg show

# View logs
logread | grep -i wireguard

# Check firewall rules
iptables -L -n -v | grep 51820
```

---

## Current Session Notes

**Date:** 2024-12-23
**Issue:** VPN connections stopped after Flint 2 config changes
**IP Status:** Public IP unchanged

### What Changed:
- [ ] Document what settings were modified

### Current Config (to be filled):
- Tunnel IP: _______________
- Listen Port: _______________
- DDNS Domain: _______________
- Upstream Router IP: _______________
- Flint 2 LAN IP: _______________

### Resolution:
- [ ] To be documented after fix
