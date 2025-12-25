import { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield,
  Globe,
  Wifi,
  Server,
  CheckCircle,
  ArrowRight,
  Code,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about NomadVPN Pro and our mission to help travelers and remote professionals maintain secure, reliable internet access from anywhere in the world.',
}

const timeline = [
  {
    year: '2019',
    title: 'The Problem Discovered',
    description:
      'Traveling frequently, I found commercial VPNs unreliable and often blocked. I needed a consistent, secure connection back to the US.',
  },
  {
    year: '2020',
    title: 'The Solution Built',
    description:
      'Developed a residential VPN architecture using travel routers connected to my home network. Finally had reliable US access from anywhere.',
  },
  {
    year: '2021-2023',
    title: 'Extensively Tested',
    description:
      'Used this setup across 50+ countries. Secure banking, streaming, and work access without issues on any public WiFi.',
  },
  {
    year: '2024',
    title: 'NomadVPN Pro Launched',
    description:
      'Now offering this proven solution to travelers and remote professionals who need reliable, secure connectivity.',
  },
]

const credentials = [
  {
    icon: Building2,
    title: 'Enterprise Network Expertise',
    description: 'Tested with Fortune 500 telecom, retail, and government agency networks.',
  },
  {
    icon: Code,
    title: 'Technical Background',
    description: 'Network engineering, data science, and software development expertise ensuring reliable solutions.',
  },
  {
    icon: Globe,
    title: 'Real-World Tested',
    description: 'Used across 50+ countries connecting to major US corporate networks without issues.',
  },
  {
    icon: Shield,
    title: 'Security-First Approach',
    description: 'Every configuration prioritizes security, privacy, and protection of your connection.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Built by a <span className="gradient-text">Traveler</span>,
              <br />
              For Travelers
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              NomadVPN Pro was born from a simple need: secure, reliable internet access
              while traveling abroad. After years of perfecting this solution for myself,
              I'm now helping others achieve the same peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  The <span className="gradient-text">Problem</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I travel frequently and need reliable internet access. The challenge?
                    Public WiFi is insecure, and commercial VPNs are unreliable abroad.
                  </p>
                  <p>
                    Commercial VPN services use data center IPs that get blocked by
                    banks, streaming services, and many websites. Speeds were inconsistent
                    and connections dropped frequently.
                  </p>
                  <p>
                    I needed a solution that would give me a consistent, secure US IP
                    address with reliable performance no matter where I traveled.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  The <span className="gradient-text">Solution</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I built a home VPN server using enterprise-grade travel routers.
                    When traveling, my portable router connects back to my home network,
                    routing all traffic through my residential IP address.
                  </p>
                  <p>
                    The result? Secure, encrypted internet on any public WiFi. Access to
                    US banking and streaming services. Consistent speeds worldwide.
                  </p>
                  <p>
                    After years of refining this setup and using it across 50+ countries
                    without issues, I realized others could benefit from the same solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Our <span className="gradient-text">Journey</span>
            </h2>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="flex-grow pb-8 border-l border-border pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Why <span className="gradient-text">Trust Us</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {credentials.map((item, index) => (
                <Card key={index} className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A simple but powerful architecture that makes your remote connection
              indistinguishable from working at home.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Home Router</h3>
                <p className="text-sm text-muted-foreground">
                  GL.iNet Flint 2 at your home acts as a WireGuard VPN server,
                  connected to your regular internet.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Travel Router</h3>
                <p className="text-sm text-muted-foreground">
                  Beryl AX travel router connects to local WiFi abroad and tunnels
                  all traffic back to your home.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Work Anywhere</h3>
                <p className="text-sm text-muted-foreground">
                  Your traffic exits from your home IP address. To the world,
                  you're working from home.
                </p>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="mt-12 p-6 rounded-xl bg-card border border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-2">
                    <Globe className="h-6 w-6 text-violet-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">You (Abroad)</span>
                </div>

                <div className="hidden md:block flex-grow border-t-2 border-dashed border-border relative">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-primary">
                    WireGuard Tunnel
                  </span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Your Home</span>
                </div>

                <div className="hidden md:block flex-grow border-t-2 border-dashed border-border relative">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Your ISP
                  </span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                    <Building2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Company VPN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join remote workers worldwide who've discovered the freedom of
              location-independent work without compromising their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="gradient">
                <Link href="/services">
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
