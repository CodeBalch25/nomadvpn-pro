import Stripe from 'stripe'

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })
  }
  return stripeInstance
}

export const SERVICES = {
  'remote-vpn-access': {
    name: 'Remote VPN Access',
    price: 3500, // $35.00/month in cents
    setupPrice: 14900, // $149 one-time setup
    priceType: 'subscription' as const,
    description: 'Works with ANY ISP - pre-configured travel router connects to our managed VPN servers',
  },
  'essential-setup': {
    name: 'Easy Setup',
    price: 69900, // $699.00 in cents
    priceType: 'one_time' as const,
    description: 'Pre-configured Flint 2 + Beryl AX routers with remote Zoom setup session',
  },
  'complex-setup': {
    name: 'Complex Setup',
    price: 89900, // $899.00 in cents
    priceType: 'one_time' as const,
    description: 'Extended setup for mesh WiFi, double NAT, or challenging ISP configurations',
  },
  'premium-support': {
    name: 'Premium Bundle',
    price: 149900, // $1,499.00 in cents
    priceType: 'one_time' as const,
    description: 'Complete turnkey solution with mesh system - just plug in and go',
  },
} as const

export type ServiceId = keyof typeof SERVICES
