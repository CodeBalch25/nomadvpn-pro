#!/bin/sh
# Switch to HOME/BRIDGE MODE
# Location on router: /root/home_mode.sh
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
