#!/bin/sh
# Check current router mode
# Location on router: /root/check_mode.sh

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
