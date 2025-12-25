#!/bin/sh
# Switch to TRAVEL/ROUTER MODE
# Location on router: /root/travel_mode.sh
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
