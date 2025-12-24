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

## Fix 5: Flint 2 Completely Unresponsive

**Symptoms:**
- Devices connected to Flint 2 LAN get 169.254.x.x (APIPA) addresses
- Cannot ping Flint 2 on LAN IP
- Cannot ping Flint 2 on upstream network IP (Deco)
- Upstream gateway (Deco) responds fine

**Diagnosis Steps:**
```powershell
# Check if PC is getting DHCP
ipconfig /all
# Look for 169.254.x.x = APIPA = no DHCP

# Set static IP to test connectivity
netsh interface ip set address "Ethernet 2" static 192.168.12.100 255.255.255.0 192.168.12.1

# Ping Flint 2 LAN
ping 192.168.12.1

# Ping Flint 2 on upstream network (Deco)
ping 192.168.68.54

# Ping upstream gateway
ping 192.168.68.1
```

**Resolution:**
1. **Power cycle Flint 2** - Unplug for 30 seconds, replug
2. Wait 2-3 minutes for full boot
3. Verify DHCP server is enabled: NETWORK → LAN → DHCP Server ON
4. Set PC back to DHCP: `netsh interface ip set address "Ethernet 2" dhcp`
5. Verify PC gets proper IP in 192.168.12.x range

**Common Causes:**
- Firmware update caused hang
- LAN IP change not fully applied
- Memory/CPU overload on router

---

## Fix 6: VPN Connected But No Internet

**Symptoms:**
- WireGuard handshake succeeds (tunnel established)
- Travel router shows "connected" status
- No internet access through VPN

**Check on Flint 2 Server:**
1. VPN Dashboard → WireGuard Server → Settings (gear icon)
2. Verify: **IP Masquerading** = ON
3. Verify: **Allow Remote Access LAN** = ON
4. Verify: VPN Client is OFF (not conflicting)
5. Verify: AdGuard Home OFF or DNS properly configured

**Check on Travel Router Client:**
1. VPN Dashboard → WireGuard Client → Settings
2. **Global Proxy** mode may cause brief outage during reconnection - this is normal
3. **Block Non-VPN Traffic** should be OFF for testing
4. MTU should be 1280 for cellular/hotspot connections

---

## Current Working Config (Dec 2024)

**Flint 2 Server:**
- LAN IP: 192.168.12.1
- Deco Network IP: 192.168.68.54
- Tunnel IP: 10.1.0.1/24
- Listen Port: 51820
- DDNS: yp61102.glddns.com

**WireGuard Profiles:**
| Profile | Client IP | Router |
|---------|-----------|--------|
| Secure Channel For Work | 10.1.0.2/24 | Beryl AX |
| Prime Analytics | 10.1.0.3/24 | Slate AX |

**Port Forwarding (Deco):**
- UDP 51820 → 192.168.68.54:51820
