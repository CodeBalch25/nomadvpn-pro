'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star, Wifi, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    name: 'Remote VPN Access',
    price: '$35',
    priceNote: '/mo',
    setupNote: '+ $149 setup',
    description: 'Works with ANY ISP - we handle everything',
    features: [
      'Works with ANY ISP (even CGNAT)',
      'Pre-configured travel router shipped',
      'US residential IP address',
      'Cancel anytime',
    ],
    href: '/services#remote-vpn-access',
    highlighted: true,
    badge: 'Recommended',
  },
  {
    name: 'Easy Setup',
    price: '$699',
    priceNote: 'one-time',
    description: 'For fiber & cable customers with straightforward setups',
    features: [
      'Pre-configured Flint 2 + Beryl AX',
      'Remote setup session via Zoom',
      'WireGuard VPN configuration',
      '30-day email support',
    ],
    href: '/services#easy-setup',
    highlighted: false,
  },
  {
    name: 'Complex Setup',
    price: '$899',
    priceNote: 'one-time',
    description: 'For mesh WiFi or tricky ISP configurations',
    features: [
      'Everything in Easy Setup',
      'Mesh WiFi bridge mode config',
      'Double NAT troubleshooting',
      '60-day priority support',
    ],
    href: '/services#complex-setup',
    highlighted: false,
  },
  {
    name: 'Premium Bundle',
    price: '$1,499',
    priceNote: 'one-time',
    description: 'Complete turnkey solution - just plug in and go',
    features: [
      'Includes Deco mesh system',
      'Complete network stack shipped',
      '6 months priority support',
      'Emergency remote assistance',
    ],
    href: '/services#premium-bundle',
    highlighted: false,
    badge: 'Full Service',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ServicePreview() {
  return (
    <section className="section-padding bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Choose Your <span className="gradient-text">Setup</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Works with 85% of US home internet providers.
            Get started in days, not weeks.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.name} variants={itemVariants}>
              <Card
                className={`h-full relative flex flex-col ${
                  service.highlighted
                    ? 'border-primary/50 bg-card shadow-lg shadow-primary/10'
                    : 'bg-card/50 border-border/50'
                }`}
              >
                {service.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className={service.highlighted ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
                      {service.highlighted ? <Star className="h-3 w-3 mr-1" /> : <Zap className="h-3 w-3 mr-1" />}
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {service.priceNote}
                    </span>
                    {service.setupNote && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {service.setupNote}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-4 flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    className="w-full"
                    variant={service.highlighted ? 'gradient' : 'outline'}
                    size="sm"
                  >
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which option is right for you?
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/consultation">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
