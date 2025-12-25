'use client'

import Link from 'next/link'
import { Check, Star, Zap } from 'lucide-react'
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
  setupPrice?: number
  priceType: string
  features: string[]
  highlighted?: boolean
  badge?: string
  compatibleWith?: string
}

export function ServiceCard({
  name,
  slug,
  tagline,
  description,
  price,
  setupPrice,
  priceType,
  features,
  highlighted = false,
  badge,
  compatibleWith,
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
      className={`h-full relative scroll-mt-24 flex flex-col ${
        highlighted
          ? 'border-primary/50 bg-card shadow-lg shadow-primary/10'
          : 'bg-card/50 border-border/50'
      }`}
    >
      {(highlighted || badge) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className={highlighted ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}>
            {highlighted ? (
              <>
                <Star className="h-3 w-3 mr-1" />
                {badge || 'Recommended'}
              </>
            ) : (
              <>
                <Zap className="h-3 w-3 mr-1" />
                {badge}
              </>
            )}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">{tagline}</p>
        <div className="mt-4">
          {priceType === 'custom' ? (
            <div>
              <span className="text-sm text-muted-foreground">{priceNote}</span>
              <span className="text-3xl font-bold ml-2">{priceDisplay}</span>
            </div>
          ) : priceType === 'monthly' && setupPrice ? (
            <div>
              <span className="text-3xl font-bold">{priceDisplay}</span>
              <span className="text-muted-foreground text-sm">/mo</span>
              <p className="text-xs text-muted-foreground mt-1">
                + {formatPrice(setupPrice)} one-time setup
              </p>
            </div>
          ) : (
            <div>
              <span className="text-3xl font-bold">{priceDisplay}</span>
              <span className="text-muted-foreground text-sm ml-1">{priceNote}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          {description.split('\n')[0]}
        </p>

        {compatibleWith && (
          <div className="mb-4 p-2 rounded bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Works with: </span>
              {compatibleWith}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">What's included:</p>
          <ul className="space-y-1.5">
            {features.slice(0, 6).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </li>
            ))}
            {features.length > 6 && (
              <li className="text-xs text-primary mt-2">
                + {features.length - 6} more features
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 mt-auto">
        <Button
          asChild
          className="w-full"
          variant={highlighted ? 'gradient' : 'default'}
          size="default"
        >
          <Link href={`/checkout?service=${slug}`}>
            Buy Now
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link href={`/consultation?service=${slug}`}>
            Book Free Consultation
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
