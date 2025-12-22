'use client'

import Link from 'next/link'
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'

interface ServiceCardProps {
  name: string
  slug: string
  tagline: string
  description: string
  price: number
  priceType: string
  features: string[]
  highlighted?: boolean
}

export function ServiceCard({
  name,
  slug,
  tagline,
  description,
  price,
  priceType,
  features,
  highlighted = false,
}: ServiceCardProps) {
  const priceDisplay = priceType === 'custom'
    ? 'Custom Quote'
    : formatPrice(price)

  const priceNote = {
    one_time: 'one-time',
    monthly: '/month',
    custom: 'starting at',
  }[priceType] || ''

  return (
    <Card
      id={slug}
      className={`h-full relative scroll-mt-24 ${
        highlighted
          ? 'border-primary/50 bg-card shadow-lg shadow-primary/10'
          : 'bg-card/50 border-border/50'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{tagline}</p>
        <div className="mt-4">
          {priceType === 'custom' ? (
            <div>
              <span className="text-sm text-muted-foreground">{priceNote}</span>
              <span className="text-4xl font-bold ml-2">{priceDisplay}</span>
            </div>
          ) : (
            <div>
              <span className="text-4xl font-bold">{priceDisplay}</span>
              <span className="text-muted-foreground ml-2">{priceNote}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {description.split('\n')[0]}
        </p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">What's included:</p>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          asChild
          className="w-full"
          variant={highlighted ? 'gradient' : 'default'}
          size="lg"
        >
          <Link href={`/checkout?service=${slug}`}>
            Get Started
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full" size="sm">
          <Link href="/consultation">Have questions? Book a call</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
