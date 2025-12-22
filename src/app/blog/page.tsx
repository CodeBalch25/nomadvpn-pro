import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tips, guides, and insights for digital nomads and remote workers. Learn about VPN setup, travel routers, and working from anywhere.',
}

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        tags: true,
        author: true,
      },
    })
    return posts
  } catch (error) {
    // Return sample posts if database isn't ready
    return [
      {
        id: '1',
        title: 'Why Residential VPNs Beat Commercial Services for Remote Work',
        slug: 'residential-vpn-vs-commercial',
        excerpt:
          'Commercial VPN services use data center IPs that are easily detected. Learn why a residential VPN setup provides superior privacy for remote workers.',
        coverImage: null,
        publishedAt: new Date('2024-01-15'),
        tags: ['VPN', 'Remote Work', 'Privacy'],
        author: 'NomadVPN Pro Team',
      },
      {
        id: '2',
        title: 'The Complete GL.iNet Travel Router Guide for Digital Nomads',
        slug: 'glinet-travel-router-guide',
        excerpt:
          'A comprehensive guide to choosing and configuring GL.iNet travel routers for secure remote work while traveling internationally.',
        coverImage: null,
        publishedAt: new Date('2024-02-01'),
        tags: ['GL.iNet', 'Travel Router', 'Setup Guide'],
        author: 'NomadVPN Pro Team',
      },
    ]
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="gradient-text">Blog</span> & Resources
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tips, guides, and insights for digital nomads and remote workers.
              Learn how to work from anywhere securely.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Image placeholder */}
                            {post.coverImage && (
                              <div className="md:w-48 h-32 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                                {/* Add Image component when you have actual images */}
                              </div>
                            )}

                            <div className="flex-grow">
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Title */}
                              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h2>

                              {/* Excerpt */}
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(post.publishedAt!)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />5 min read
                                </span>
                              </div>

                              {/* Read more */}
                              <div className="mt-4 flex items-center text-primary text-sm font-medium">
                                Read more
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest tips and guides for remote work delivered to your inbox.
            </p>
            <p className="text-sm text-muted-foreground">
              Newsletter coming soon. For now, follow us on social or check back regularly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
