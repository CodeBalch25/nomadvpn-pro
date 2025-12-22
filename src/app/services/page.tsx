import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import prisma from '@/lib/db'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Choose from our VPN setup packages: Essential Setup ($699), Premium + Support ($1,299), Remote VPN Access ($49/mo), or Enterprise Custom solutions.',
}

const faqs = [
  {
    question: 'How long does setup take?',
    answer:
      "Once you receive your pre-configured routers, you can be up and running within 30 minutes. We also schedule a Zoom call to walk you through everything and ensure it's working perfectly.",
  },
  {
    question: 'Will this work with my company VPN?',
    answer:
      "Yes! Our setup works with any corporate VPN. We've tested extensively with major telecom providers, national retail chains, and state government agencies. Your traffic routes through your home IP address, giving you reliable access to US networks from anywhere.",
  },
  {
    question: 'What if I have technical issues while traveling?',
    answer:
      "All packages include email support, and our Premium package includes priority support with emergency remote assistance. We can troubleshoot issues remotely and help you get back online quickly.",
  },
  {
    question: "What's the difference between this and NordVPN or ExpressVPN?",
    answer:
      'Commercial VPN services use shared data center IPs that get blocked by streaming services, banks, and corporate networks. Our solution routes through your residential home IP, giving you consistent access to US services and reliable enterprise VPN connectivity while traveling.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer:
      "No! Your routers arrive pre-configured and ready to use. Just plug them in and connect. We provide video guides and are available for questions if needed.",
  },
  {
    question: 'What hardware do I receive?',
    answer:
      'Our standard packages include a GL.iNet Flint 2 for your home and a Beryl AX for travel. Both are enterprise-grade routers with built-in WireGuard VPN support.',
  },
]

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    })
    return services
  } catch (error) {
    // Return default services if database isn't ready
    return [
      {
        id: '1',
        name: 'Essential Setup',
        slug: 'essential-setup',
        tagline: 'Everything you need to work remotely from anywhere',
        description:
          'Get started with a complete, pre-configured VPN setup that routes all your traffic through your home network.',
        price: 69900,
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
      },
      {
        id: '2',
        name: 'Premium + Support',
        slug: 'premium-support',
        tagline: 'Full setup with 6 months of dedicated support',
        description:
          'Our most popular package for professionals who want peace of mind.',
        price: 129900,
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
      },
      {
        id: '3',
        name: 'Remote VPN Access',
        slug: 'remote-vpn-access',
        tagline: 'Plug-and-play access to our managed VPN network',
        description:
          'We ship you a pre-programmed router. Just plug it in and connect.',
        price: 4900,
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
      },
    ]
  }
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
              From plug-and-play packages to fully managed enterprise solutions.
              Tested with Fortune 500 telecom, retail, and government networks.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                slug={service.slug}
                tagline={service.tagline}
                description={service.description}
                price={service.price}
                priceType={service.priceType}
                features={service.features}
                highlighted={service.highlighted}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              Compare <span className="gradient-text">Plans</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Essential</th>
                    <th className="text-center py-4 px-4 bg-primary/5">Premium</th>
                    <th className="text-center py-4 px-4">Remote Access</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Pre-configured hardware', '✓', '✓', 'Included'],
                    ['WireGuard VPN setup', '✓', '✓', '✓'],
                    ['Kill switch protection', '✓', '✓', '✓'],
                    ['Setup walkthrough', '✓', '✓', '✓'],
                    ['Email support', '30 days', '6 months', 'Included'],
                    ['Priority support', '—', '✓', '—'],
                    ['Connection monitoring', '—', '✓', '✓'],
                    ['Emergency assistance', '—', '✓', '—'],
                  ].map(([feature, ...values], index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4 text-muted-foreground">{feature}</td>
                      {values.map((value, i) => (
                        <td
                          key={i}
                          className={`text-center py-3 px-4 ${
                            i === 1 ? 'bg-primary/5' : ''
                          }`}
                        >
                          {value === '✓' ? (
                            <span className="text-primary">✓</span>
                          ) : value === '—' ? (
                            <span className="text-muted-foreground/50">—</span>
                          ) : (
                            value
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
