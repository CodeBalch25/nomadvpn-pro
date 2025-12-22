'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    name: 'Essential Setup',
    price: '$699',
    priceNote: 'one-time',
    description: 'Everything you need to work remotely from anywhere',
    features: [
      'Pre-configured Flint 2 + Beryl AX',
      'WireGuard VPN server setup',
      'Kill switch protection',
      '30-day email support',
    ],
    href: '/services#essential-setup',
    highlighted: false,
  },
  {
    name: 'Premium + Support',
    price: '$1,299',
    priceNote: 'one-time',
    description: 'Full setup with 6 months of dedicated support',
    features: [
      'Everything in Essential',
      '6 months priority support',
      'Connection monitoring',
      'Emergency remote assistance',
    ],
    href: '/services#premium-support',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Remote VPN Access',
    price: '$49',
    priceNote: '/month',
    description: 'We ship you a pre-programmed router. Just plug in and go.',
    features: [
      'Pre-programmed router shipped to you',
      'Plug into WiFi or ethernet',
      'Residential US IP address',
      'Cancel anytime',
    ],
    href: '/services#remote-vpn-access',
    highlighted: false,
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
            Choose Your <span className="gradient-text">Freedom</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From plug-and-play setups to fully managed solutions.
            Get started in days, not weeks.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.name} variants={itemVariants}>
              <Card
                className={`h-full relative ${
                  service.highlighted
                    ? 'border-primary/50 bg-card shadow-lg shadow-primary/10'
                    : 'bg-card/50 border-border/50'
                }`}
              >
                {service.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground ml-2">
                      {service.priceNote}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-4">
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={service.highlighted ? 'gradient' : 'outline'}
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
