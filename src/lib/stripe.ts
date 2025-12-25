import Stripe from 'stripe'

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return stripeInstance
}

export const SERVICES = {
  'essential-setup': {
    name: 'Essential Setup',
    price: 69900, // $699.00 in cents
    priceType: 'one_time' as const,
    description: 'Pre-configured Flint 2 + Beryl AX routers with WireGuard VPN setup',
  },
  'premium-support': {
    name: 'Premium + Support',
    price: 129900, // $1,299.00 in cents
    priceType: 'one_time' as const,
    description: 'Full setup with 6 months of dedicated priority support',
  },
  'remote-vpn-access': {
    name: 'Remote VPN Access',
    price: 4900, // $49.00 in cents
    priceType: 'subscription' as const,
    description: 'Monthly access with pre-programmed travel router',
  },
} as const

export type ServiceId = keyof typeof SERVICES
