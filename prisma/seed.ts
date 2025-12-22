import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing services
  await prisma.service.deleteMany()

  // Seed services
  const services = await prisma.service.createMany({
    data: [
      {
        name: 'Essential Setup',
        slug: 'essential-setup',
        tagline: 'Everything you need to work remotely from anywhere',
        description: `Get started with a complete, pre-configured VPN setup that routes all your traffic through your home network. Perfect for digital nomads who want plug-and-play simplicity.

Includes GL.iNet Flint 2 home router and Beryl AX travel router, both professionally configured with WireGuard VPN, kill switch protection, and comprehensive documentation.`,
        price: 69900, // $699
        priceType: 'one_time',
        features: [
          'Pre-configured GL.iNet Flint 2 (home)',
          'Pre-configured Beryl AX (travel)',
          'WireGuard VPN server setup',
          'Kill switch configuration',
          'DNS leak protection',
          'Comprehensive setup guide',
          'Video walkthrough',
          '30-day email support',
        ],
        highlighted: false,
        sortOrder: 1,
        active: true,
      },
      {
        name: 'Premium + Support',
        slug: 'premium-support',
        tagline: 'Full setup with 6 months of dedicated support',
        description: `Our most popular package for professionals who want peace of mind. Get everything in Essential plus 6 months of priority support, monitoring, and configuration updates.

Ideal for remote workers with enterprise VPN requirements who need reliable, ongoing technical assistance.`,
        price: 129900, // $1,299
        priceType: 'one_time',
        features: [
          'Everything in Essential Setup',
          '6 months priority support',
          'Connection monitoring dashboard',
          'Proactive troubleshooting',
          'Configuration updates',
          'Emergency remote assistance',
          'Quarterly security audits',
          'Direct phone/video support',
        ],
        highlighted: true,
        sortOrder: 2,
        active: true,
      },
      {
        name: 'Remote VPN Access',
        slug: 'remote-vpn-access',
        tagline: 'Plug-and-play access to our managed VPN network',
        description: `We ship you a pre-programmed travel router that connects to our managed VPN infrastructure. Just plug it into any WiFi or ethernet connection and you're online with a US residential IP.

Perfect for travelers who want secure connectivity without managing their own home setup. No technical knowledge required.`,
        price: 4900, // $49/month
        priceType: 'monthly',
        features: [
          'Pre-programmed travel router shipped to you',
          'Just plug into WiFi or ethernet',
          'Residential US IP address',
          'All configuration done for you',
          '24/7 connection monitoring',
          'Automatic failover',
          'Monthly bandwidth: 500GB',
          'Cancel anytime',
        ],
        highlighted: false,
        sortOrder: 3,
        active: true,
      },
    ],
  })

  console.log(`Created ${services.count} services`)

  // Seed sample blog posts
  await prisma.blogPost.deleteMany()

  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        title: 'Why Residential VPNs Beat Commercial Services for Remote Work',
        slug: 'residential-vpn-vs-commercial',
        excerpt:
          'Commercial VPN services use data center IPs that are easily detected. Learn why a residential VPN setup provides superior privacy for remote workers.',
        content: `# Why Residential VPNs Beat Commercial Services for Remote Work

When it comes to maintaining privacy while working remotely, not all VPN solutions are created equal. Commercial VPN services like NordVPN, ExpressVPN, and Surfshark serve an important purpose, but they have a fundamental limitation that makes them unsuitable for professional remote work.

## The Data Center Problem

Commercial VPN providers route your traffic through servers in data centers. These IP addresses are easily identifiable as belonging to VPN services because:

1. **IP databases** maintain lists of known VPN provider ranges
2. **Traffic patterns** from data centers differ from residential connections
3. **Shared IPs** mean thousands of users connect from the same address

Enterprise IT departments and corporate VPN gateways can easily detect and block these connections.

## The Residential Advantage

A properly configured home VPN setup routes your traffic through a genuine residential IP address - your home internet connection. This provides:

- **Authentic residential IP** that passes all detection methods
- **Dedicated connection** that's not shared with other users
- **Consistent fingerprint** matching legitimate home network behavior
- **Full control** over your network configuration and logs

## Our Approach

We help remote workers set up secure, undetectable VPN connections using enterprise-grade travel routers connected back to their home networks. The result is a solution that:

- Maintains your privacy while working abroad
- Provides the same network signature as working from home
- Offers enterprise-level security with WireGuard encryption
- Includes kill switch protection to prevent accidental exposure

Ready to work from anywhere with confidence? [Contact us](/contact) to learn more.`,
        coverImage: '/images/blog/residential-vpn.jpg',
        published: true,
        publishedAt: new Date('2024-01-15'),
        tags: ['VPN', 'Remote Work', 'Privacy', 'Digital Nomad'],
        metaTitle: 'Residential VPN vs Commercial: Why It Matters for Remote Work',
        metaDesc:
          'Learn why residential VPN setups provide superior privacy compared to commercial VPN services for remote workers and digital nomads.',
      },
      {
        title: 'The Complete GL.iNet Travel Router Guide for Digital Nomads',
        slug: 'glinet-travel-router-guide',
        excerpt:
          'A comprehensive guide to choosing and configuring GL.iNet travel routers for secure remote work while traveling internationally.',
        content: `# The Complete GL.iNet Travel Router Guide for Digital Nomads

GL.iNet has become the go-to brand for digital nomads who need portable, secure networking solutions. This guide covers everything you need to know about selecting and using their travel routers.

## Why GL.iNet?

GL.iNet routers stand out for several reasons:

- **OpenWRT-based** firmware with full customization options
- **Built-in VPN support** for WireGuard and OpenVPN
- **Compact designs** perfect for travel
- **Regular updates** and active community support

## Recommended Models

### For Home Base: Flint 2 (GL-MT6000)

The Flint 2 serves as your home VPN server with:
- Wi-Fi 6 dual-band support
- 2.5G WAN port for high-speed connections
- Up to 900 Mbps WireGuard throughput
- Excellent for serving as your VPN endpoint

### For Travel: Beryl AX (GL-MT3000)

The Beryl AX is the perfect travel companion:
- Compact, portable design
- Wi-Fi 6 support
- ~300 Mbps WireGuard client performance
- USB-C powered (works with laptop chargers)

## Basic Setup Workflow

1. **Home router setup**: Configure Flint 2 as WireGuard server
2. **Dynamic DNS**: Set up DDNS for consistent access
3. **Travel router config**: Import WireGuard client configuration
4. **Kill switch**: Enable to prevent traffic leaks
5. **Testing**: Verify connection from a different network

## Pro Tips

- Always carry a backup configuration file
- Test your setup before leaving home
- Keep firmware updated for security patches
- Use the GL.iNet mobile app for easy monitoring

Need help setting this up? Our [Essential Setup](/services) package includes professionally configured routers ready to use out of the box.`,
        coverImage: '/images/blog/glinet-guide.jpg',
        published: true,
        publishedAt: new Date('2024-02-01'),
        tags: ['GL.iNet', 'Travel Router', 'WireGuard', 'Setup Guide'],
        metaTitle: 'GL.iNet Travel Router Guide: Best Models for Digital Nomads',
        metaDesc:
          'Complete guide to GL.iNet travel routers for digital nomads. Compare Flint 2, Beryl AX, and learn setup best practices.',
      },
    ],
  })

  console.log(`Created ${blogPosts.count} blog posts`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
