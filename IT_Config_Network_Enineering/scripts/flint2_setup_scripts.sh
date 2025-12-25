#!/bin/bash
# =============================================================================
# FLINT 2 (GL-MT6000) SETUP SCRIPTS
# Re-apply these after factory reset
# Default IP after reset: 192.168.8.1
# Default password after reset: goodlife
# =============================================================================

# -----------------------------------------------------------------------------
# LED FIX - Stops LED from blinking in bridge mode
# Run this command via SSH:
# ssh root@192.168.8.1 'killall gl_led; uci set gl_led.global.led_daemon=0; uci commit gl_led'
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# HARDWARE FLOW OFFLOADING - Improves performance
# ssh root@192.168.8.1
# Then run:
# uci set firewall.@defaults[0].flow_offloading='1'
# uci set firewall.@defaults[0].flow_offloading_hw='1'
# uci commit firewall
# /etc/init.d/firewall restart
# -----------------------------------------------------------------------------

# =============================================================================
# MODE SWITCHING SCRIPTS - Create these in /root/ on the Flint 2
# =============================================================================

# -----------------------------------------------------------------------------
# /root/check_mode.sh - Check current mode
# -----------------------------------------------------------------------------
cat << 'CHECK_MODE_EOF'
#!/bin/sh
# Check current router mode

echo "=== Current Mode Check ==="
echo ""

MASQ=$(uci get firewall.@zone[1].masq 2>/dev/null)
DHCP=$(uci get dhcp.lan.ignore 2>/dev/null)
IP=$(uci get network.lan.ipaddr 2>/dev/null)

echo "NAT/Masquerade: $MASQ (0=disabled/bridge, 1=enabled/router)"
echo "DHCP Ignore: $DHCP (1=disabled/bridge, 0=enabled/router)"
echo "LAN IP: $IP"
echo ""

if [ "$MASQ" = "0" ] && [ "$DHCP" = "1" ]; then
    echo ">>> Currently in HOME/BRIDGE MODE"
elif [ "$MASQ" = "1" ] && [ "$DHCP" != "1" ]; then
    echo ">>> Currently in TRAVEL/ROUTER MODE"
else
    echo ">>> Mode unclear - check settings manually"
fi
CHECK_MODE_EOF

# -----------------------------------------------------------------------------
# /root/travel_mode.sh - Switch to Router Mode (for travel)
# -----------------------------------------------------------------------------
cat << 'TRAVEL_MODE_EOF'
#!/bin/sh
# Switch to TRAVEL/ROUTER MODE
# - Enables DHCP server
# - Enables NAT
# - Sets IP to 192.168.8.1

echo "Switching to TRAVEL MODE (Router Mode)..."

# Enable NAT
uci set firewall.@zone[1].masq='1'
uci commit firewall

# Enable DHCP
uci delete dhcp.lan.ignore 2>/dev/null
uci commit dhcp

# Set router IP
uci set network.lan.ipaddr='192.168.8.1'
uci set network.lan.gateway=''
uci commit network

echo "Restarting services..."
/etc/init.d/firewall restart
/etc/init.d/dnsmasq restart
/etc/init.d/network restart

echo ""
echo "=== TRAVEL MODE ACTIVATED ==="
echo "New IP: 192.168.8.1"
echo "DHCP: Enabled"
echo "NAT: Enabled"
echo "Connect to Flint 2's WiFi to access"
TRAVEL_MODE_EOF

# -----------------------------------------------------------------------------
# /root/home_mode.sh - Switch to Bridge Mode (for home)
# -----------------------------------------------------------------------------
cat << 'HOME_MODE_EOF'
#!/bin/sh
# Switch to HOME/BRIDGE MODE
# - Disables DHCP server (Deco handles it)
# - Disables NAT
# - Sets static IP in Deco's subnet

echo "Switching to HOME MODE (Bridge Mode)..."

# Disable NAT
uci set firewall.@zone[1].masq='0'
uci commit firewall

# Disable DHCP
uci set dhcp.lan.ignore='1'
uci commit dhcp

# Set static IP in Deco subnet
uci set network.lan.ipaddr='192.168.68.2'
uci set network.lan.gateway='192.168.68.1'
uci commit network

# Fix LED (stops blinking in bridge mode)
killall gl_led 2>/dev/null
uci set gl_led.global.led_daemon='0'
uci commit gl_led

echo "Restarting services..."
/etc/init.d/firewall restart
/etc/init.d/dnsmasq restart
/etc/init.d/network restart

echo ""
echo "=== HOME MODE ACTIVATED ==="
echo "New IP: 192.168.68.2 (or check Deco app for DHCP IP)"
echo "DHCP: Disabled"
echo "NAT: Disabled"
echo "LED daemon: Disabled"
HOME_MODE_EOF

# =============================================================================
# INSTALLATION INSTRUCTIONS
# =============================================================================
# 1. SSH into Flint 2: ssh root@192.168.8.1
# 2. Create scripts:
#    nano /root/check_mode.sh   (paste check_mode content)
#    nano /root/travel_mode.sh  (paste travel_mode content)
#    nano /root/home_mode.sh    (paste home_mode content)
# 3. Make executable:
#    chmod +x /root/check_mode.sh /root/travel_mode.sh /root/home_mode.sh
# 4. Apply LED fix:
#    killall gl_led; uci set gl_led.global.led_daemon=0; uci commit gl_led
# =============================================================================
