#!/bin/sh
# Fix LED - stops blinking in bridge mode
# Run via SSH: ssh root@<ip> '/root/fix_led.sh'
# Or directly: ssh root@<ip> 'killall gl_led; uci set gl_led.global.led_daemon=0; uci commit gl_led'

echo "Fixing LED daemon..."

# Kill the LED daemon process
killall gl_led 2>/dev/null

# Disable LED daemon in config
uci set gl_led.global.led_daemon='0'
uci commit gl_led

echo "LED daemon disabled. LED should now be solid."
