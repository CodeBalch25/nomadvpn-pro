import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle, CheckCircle, AlertTriangle, Wifi } from 'lucide-react'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import prisma from '@/lib/db'
import { serviceTiers } from '@/lib/validations'

export const metadata: Metadata = {
  title: 'Services | NomadVPN Pro',
  description:
    'Choose from our VPN setup packages: Remote VPN Access ($35/mo), Easy Setup ($699), Complex Setup ($899), or Premium Bundle ($1,499). Works with 85% of US internet providers.',
}

const faqs = [
  {
    question: 'Will this work with my ISP?',
    answer:
      "Our service works with about 85% of US home internet providers including Xfinity, Spectrum, AT&T Fiber, Verizon Fios, Cox, and Google Fiber. Some ISPs like T-Mobile Home Internet, Verizon 5G Home, and Starlink use CGNAT which prevents hosting a VPN server - but our Remote VPN Access service works perfectly with those providers.",
  },
  {
    question: 'What is CGNAT and why does it matter?',
    answer:
      "CGNAT (Carrier-Grade NAT) is when your ISP shares one public IP address among many customers. This prevents port forwarding, which is required to host your own VPN server. T-Mobile 5G Home, Verizon 5G Home, and Starlink all use CGNAT. Our Remote VPN Access service is designed specifically for these customers - you connect to our infrastructure instead.",
  },
  {
    question: 'I have T-Mobile 5G Home Internet - can I use NomadVPN Pro?',
    answer:
      "Yes! While you can't host your own VPN server due to CGNAT, our Remote VPN Access service ($35/mo) is perfect for you. We ship you a pre-configured travel router that connects to our managed VPN servers. You get all the benefits of a residential IP without any home setup.",
  },
  {
    question: 'How long does setup take?',
    answer:
      "For Remote VPN Access, just plug in and go - zero setup. For Easy Setup and Complex Setup packages, we schedule a Zoom call to walk you through everything. Most setups take 30-60 minutes.",
  },
  {
    question: 'Will this work with my company VPN?',
    answer:
      "Yes! Our setup works with any corporate VPN. We've tested extensively with major telecom providers, national retail chains, and state government agencies. Your traffic routes through your home IP address (or our residential IP for Remote VPN Access), giving you reliable access to US networks from anywhere.",
  },
  {
    question: "What's the difference between this and NordVPN or ExpressVPN?",
    answer:
      'Commercial VPN services use shared data center IPs that get blocked by streaming services, banks, and corporate networks. Our solution routes through residential IPs, giving you consistent access to US services and reliable enterprise VPN connectivity while traveling.',
  },
  {
    question: 'Do I need to change settings on my home router?',
    answer:
      "For Easy and Complex Setup packages, we'll help you configure port forwarding on your router during our Zoom session. For Premium Bundle, we ship you a complete pre-configured network stack. For Remote VPN Access, no home configuration is needed at all.",
  },
  {
    question: 'What hardware do I receive?',
    answer:
      'Easy and Complex Setup include a GL.iNet Flint 2 (home) and Beryl AX (travel). Premium Bundle adds a TP-Link Deco mesh system. Remote VPN Access includes just the Beryl AX travel router since no home equipment is needed.',
  },
]

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    })
    if (services.length > 0) return services
    // Fall through to defaults if no services in DB
  } catch (error) {
    // Continue to defaults
  }

  // Return updated 4-tier service structure
  return [
    {
      id: '1',
      name: 'Remote VPN Access',
      slug: 'remote-vpn-access',
      tagline: 'Works with ANY ISP - we handle everything',
      description:
        'Perfect for CGNAT customers (T-Mobile, Verizon 5G, Starlink) or anyone who wants zero setup hassle.',
      price: 3500,
      setupPrice: 14900,
      priceType: 'monthly',
      features: [
        'Pre-configured Beryl AX travel router shipped',
        'Works with ANY internet provider (even CGNAT)',
        'Connects to our managed VPN infrastructure',
        'US residential IP address',
        'Zero home configuration required',
        '24/7 connection monitoring',
        'Automatic failover between our servers',
        'Cancel anytime',
      ],
      highlighted: true,
      badge: 'RECOMMENDED',
    },
    {
      id: '2',
      name: 'Easy Setup',
      slug: 'easy-setup',
      tagline: 'For fiber & cable customers with straightforward setups',
      description:
        'Remote configuration session for compatible ISPs without mesh WiFi.',
      price: 69900,
      priceType: 'one_time',
      features: [
        'Pre-configured Flint 2 (home) + Beryl AX (travel)',
        'Remote setup session via Zoom',
        'ISP-specific port forwarding guide',
        'WireGuard VPN server configuration',
        'Kill switch & DNS leak protection',
        'Video walkthrough',
        '30-day email support',
      ],
      highlighted: false,
      compatibleWith: 'Xfinity, Spectrum, AT&T Fiber, Verizon Fios, Cox, Google Fiber',
    },
    {
      id: '3',
      name: 'Complex Setup',
      slug: 'complex-setup',
      tagline: 'For mesh WiFi or tricky ISP configurations',
      description:
        'Extended setup for double NAT, mesh systems, or challenging ISPs.',
      price: 89900,
      priceType: 'one_time',
      features: [
        'Everything in Easy Setup',
        'Extended remote session (up to 2 hours)',
        'Mesh WiFi bridge mode configuration',
        'Double NAT troubleshooting',
        'ISP router/gateway optimization',
        'Network diagram documentation',
        '60-day priority email support',
      ],
      highlighted: false,
      compatibleWith: 'Compatible ISPs + mesh WiFi (Google Nest, Eero, Orbi, etc.)',
    },
    {
      id: '4',
      name: 'Premium Bundle',
      slug: 'premium-bundle',
      tagline: 'Complete turnkey solution - just plug in and go',
      description:
        'We ship you a complete, pre-tested network stack. Zero configuration needed.',
      price: 149900,
      priceType: 'one_time',
      features: [
        'TP-Link Deco mesh system (replaces your WiFi)',
        'Pre-configured Flint 2 (home server)',
        'Pre-configured Beryl AX (travel)',
        'Complete plug-and-play setup',
        'Network tested before shipping',
        '6 months priority support',
        'Emergency remote assistance',
        'Quarterly security audits',
      ],
      highlighted: false,
      badge: 'FULL SERVICE',
    },
  ]
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Choose Your <span className="gradient-text">Setup</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Works with 85% of US home internet providers. Tested with Fortune 500
              telecom, retail, and government networks.
            </p>
          </div>
        </div>
      </section>

      {/* ISP Compatibility Check CTA */}
      <section className="py-8 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold">Not sure which package is right for you?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check your ISP compatibility in 60 seconds and get a personalized recommendation.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button asChild variant="gradient" size="lg">
                    <Link href="/compatibility">
                      Check Compatibility
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISP Compatibility Notice */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card/30">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Compatible ISPs (Easy/Complex Setup)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Xfinity, Spectrum, AT&T Fiber, Verizon Fios, Cox, Google Fiber, Frontier Fiber, CenturyLink, Optimum
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">CGNAT ISPs (Remote VPN Access Only)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      T-Mobile Home Internet, Verizon 5G Home, Starlink, Fixed Wireless
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - 4 tiers */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service: any) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                slug={service.slug}
                tagline={service.tagline}
                description={service.description}
                price={service.price}
                setupPrice={service.setupPrice}
                priceType={service.priceType}
                features={service.features}
                highlighted={service.highlighted}
                badge={service.badge}
                compatibleWith={service.compatibleWith}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              Compare <span className="gradient-text">Plans</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-3">Feature</th>
                    <th className="text-center py-4 px-3 bg-primary/5">Remote VPN</th>
                    <th className="text-center py-4 px-3">Easy Setup</th>
                    <th className="text-center py-4 px-3">Complex Setup</th>
                    <th className="text-center py-4 px-3">Premium Bundle</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Works with CGNAT ISPs', '✓', '—', '—', '—'],
                    ['Home configuration needed', '—', '✓', '✓', '—'],
                    ['Pre-configured hardware', '✓', '✓', '✓', '✓'],
                    ['WireGuard VPN', '✓', '✓', '✓', '✓'],
                    ['Kill switch protection', '✓', '✓', '✓', '✓'],
                    ['Mesh WiFi support', 'N/A', '—', '✓', '✓'],
                    ['Email support', 'Included', '30 days', '60 days', '6 months'],
                    ['Remote setup session', '—', '✓', 'Extended', '—'],
                    ['Priority support', '—', '—', '✓', '✓'],
                    ['Connection monitoring', '✓', '—', '—', '✓'],
                    ['Emergency assistance', '—', '—', '—', '✓'],
                  ].map(([feature, ...values], index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-3 text-muted-foreground">{feature}</td>
                      {values.map((value, i) => (
                        <td
                          key={i}
                          className={`text-center py-3 px-3 ${
                            i === 0 ? 'bg-primary/5' : ''
                          }`}
                        >
                          {value === '✓' ? (
                            <span className="text-primary">✓</span>
                          ) : value === '—' ? (
                            <span className="text-muted-foreground/50">—</span>
                          ) : value === 'N/A' ? (
                            <span className="text-muted-foreground/50 text-xs">N/A</span>
                          ) : (
                            <span className="text-xs">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free consultation and we'll help you find the right solution
              for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="gradient">
                <Link href="/consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
