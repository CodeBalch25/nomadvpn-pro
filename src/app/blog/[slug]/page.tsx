import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import prisma from '@/lib/db'

interface BlogPostPageProps {
  params: { slug: string }
}

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    })
    return post
  } catch (error) {
    // Return sample post if database isn't ready
    const samplePosts: Record<string, any> = {
      'residential-vpn-vs-commercial': {
        id: '1',
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
        coverImage: null,
        publishedAt: new Date('2024-01-15'),
        tags: ['VPN', 'Remote Work', 'Privacy', 'Digital Nomad'],
        author: 'NomadVPN Pro Team',
        metaTitle: 'Residential VPN vs Commercial: Why It Matters for Remote Work',
        metaDesc:
          'Learn why residential VPN setups provide superior privacy compared to commercial VPN services for remote workers and digital nomads.',
      },
      'glinet-travel-router-guide': {
        id: '2',
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
        coverImage: null,
        publishedAt: new Date('2024-02-01'),
        tags: ['GL.iNet', 'Travel Router', 'WireGuard', 'Setup Guide'],
        author: 'NomadVPN Pro Team',
        metaTitle: 'GL.iNet Travel Router Guide: Best Models for Digital Nomads',
        metaDesc:
          'Complete guide to GL.iNet travel routers for digital nomads. Compare Flint 2, Beryl AX, and learn setup best practices.',
      },
    }

    return samplePosts[slug] || null
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Simple markdown to HTML conversion (in production, use a proper markdown parser)
  const contentHtml = post.content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">')
    .replace(/^(?!<[hlu])/gm, '<p class="mb-4 text-muted-foreground leading-relaxed">')

  return (
    <div className="min-h-screen pt-24">
      <article className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt!)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />5 min read
                </span>
                <span>By {post.author}</span>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-muted-foreground border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
            </header>

            {/* Content */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Found this helpful? Share it with others.
                </span>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 rounded-xl bg-card border border-border text-center">
              <h3 className="text-xl font-semibold mb-2">
                Ready to Work From Anywhere?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get your own secure VPN setup and start working remotely with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/services">View Services</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/consultation">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
