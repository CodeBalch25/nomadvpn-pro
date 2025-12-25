import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
      'Please enter a valid phone number'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ISP options with tier mappings
export const ispOptions = [
  { value: 'xfinity', label: 'Xfinity/Comcast', tier: 'easy' },
  { value: 'spectrum', label: 'Spectrum', tier: 'easy' },
  { value: 'att_fiber', label: 'AT&T Fiber', tier: 'easy' },
  { value: 'verizon_fios', label: 'Verizon Fios', tier: 'easy' },
  { value: 'cox', label: 'Cox', tier: 'easy' },
  { value: 'google_fiber', label: 'Google Fiber', tier: 'easy' },
  { value: 'frontier_fiber', label: 'Frontier Fiber', tier: 'easy' },
  { value: 'centurylink', label: 'CenturyLink', tier: 'medium' },
  { value: 'optimum', label: 'Optimum/Altice', tier: 'medium' },
  { value: 'tmobile_5g', label: 'T-Mobile Home Internet', tier: 'remote_only' },
  { value: 'verizon_5g', label: 'Verizon 5G Home', tier: 'remote_only' },
  { value: 'starlink', label: 'Starlink', tier: 'remote_only' },
  { value: 'fixed_wireless', label: 'Fixed Wireless Provider', tier: 'remote_only' },
  { value: 'other', label: 'Other', tier: 'unknown' },
] as const

export const ispValues = ispOptions.map(opt => opt.value)
export type IspValue = typeof ispValues[number]

export const uploadSpeedOptions = [
  { value: 'under_10', label: 'Under 10 Mbps', warning: true },
  { value: '10_25', label: '10-25 Mbps', tier: 'ok' },
  { value: '25_100', label: '25-100 Mbps', tier: 'good' },
  { value: 'over_100', label: 'Over 100 Mbps', tier: 'excellent' },
  { value: 'unknown', label: "I don't know", tier: 'unknown' },
] as const

export const technicalComfortOptions = [
  { value: 'expert', label: 'Very comfortable - I manage my own network' },
  { value: 'moderate', label: 'Somewhat comfortable - I can follow instructions' },
  { value: 'beginner', label: 'Not comfortable - I want someone else to handle it' },
] as const

export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional(),
  preferredDate: z
    .string()
    .optional(),
  timezone: z
    .string()
    .optional(),
  homeIsp: z
    .enum(['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber',
           'frontier_fiber', 'centurylink', 'optimum', 'tmobile_5g', 'verizon_5g',
           'starlink', 'fixed_wireless', 'other'])
    .optional(),
  hasMeshWifi: z
    .enum(['yes', 'no', 'unknown'])
    .optional(),
  uploadSpeed: z
    .enum(['under_10', '10_25', '25_100', 'over_100', 'unknown'])
    .optional(),
  technicalComfort: z
    .enum(['expert', 'moderate', 'beginner'])
    .optional(),
  currentSetup: z
    .string()
    .max(500, 'Please keep your response under 500 characters')
    .optional(),
  travelPlans: z
    .string()
    .max(500, 'Please keep your response under 500 characters')
    .optional(),
  employerType: z
    .enum(['employee', 'freelance', 'consultant', 'other'])
    .optional(),
  serviceInterest: z
    .enum(['remote_vpn_access', 'easy_setup', 'complex_setup', 'premium_bundle', 'consultation']),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
})

export type ConsultationFormData = z.infer<typeof consultationFormSchema>

// Service tier recommendation logic
export type RecommendedTier = {
  tier: 'remote_vpn_access' | 'easy_setup' | 'complex_setup' | 'premium_bundle' | 'consultation'
  reason: string
  canDIY: boolean | null
}

export function getRecommendedTier(answers: {
  isp?: string
  hasMeshWifi?: string
  uploadSpeed?: string
  technicalComfort?: string
}): RecommendedTier {
  // CGNAT ISPs - must use Remote VPN Access
  if (['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'].includes(answers.isp || '')) {
    return {
      tier: 'remote_vpn_access',
      reason: 'Your ISP uses CGNAT which prevents hosting a VPN server at home. Our Remote VPN Access service is perfect for you - we handle everything.',
      canDIY: false
    }
  }

  // Upload too slow
  if (answers.uploadSpeed === 'under_10') {
    return {
      tier: 'remote_vpn_access',
      reason: 'Your upload speed may not support reliable VPN performance. Consider upgrading your internet or using our Remote VPN Access service.',
      canDIY: false
    }
  }

  // Beginner + Mesh = Premium Bundle
  if (answers.technicalComfort === 'beginner' && answers.hasMeshWifi === 'yes') {
    return {
      tier: 'premium_bundle',
      reason: 'Based on your setup complexity and preference for hands-off service, our Premium Bundle with full configuration is recommended.',
      canDIY: false
    }
  }

  // Mesh WiFi = Complex Setup
  if (answers.hasMeshWifi === 'yes') {
    return {
      tier: 'complex_setup',
      reason: 'Your mesh WiFi requires additional configuration (bridge mode or double NAT handling). Our Complex Setup package includes this.',
      canDIY: true
    }
  }

  // Easy ISPs + No Mesh = Easy Setup
  if (['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber', 'frontier_fiber'].includes(answers.isp || '')) {
    return {
      tier: 'easy_setup',
      reason: 'Great news! Your ISP is fully compatible. Our Easy Setup package is perfect for you.',
      canDIY: true
    }
  }

  // Medium difficulty ISPs
  if (['centurylink', 'optimum'].includes(answers.isp || '')) {
    return {
      tier: 'complex_setup',
      reason: 'Your ISP may require some additional configuration. Our Complex Setup package covers this.',
      canDIY: true
    }
  }

  // Default to consultation for unknown
  return {
    tier: 'consultation',
    reason: 'We need a bit more information about your setup. Book a free consultation and we\'ll recommend the best option.',
    canDIY: null
  }
}

// Service tiers configuration
export const serviceTiers = [
  {
    id: 'remote_vpn_access',
    name: 'Remote VPN Access',
    slug: 'remote-vpn-access',
    tagline: 'Works with ANY ISP - we handle everything',
    description: 'Perfect for CGNAT customers (T-Mobile, Verizon 5G, Starlink) or anyone who wants zero setup hassle.',
    price: 14900, // $149 setup
    monthlyPrice: 3500, // $35/mo
    priceType: 'monthly',
    features: [
      'Pre-configured Beryl AX travel router shipped to you',
      'Works with ANY internet provider (even CGNAT)',
      'Connects to our managed VPN infrastructure',
      'US residential IP address',
      'Zero home configuration required',
      '24/7 connection monitoring',
      'Automatic failover between our servers',
      'Cancel anytime',
    ],
    highlighted: true,
    incompatibleIsps: [],
    compatibleIsps: 'all',
  },
  {
    id: 'easy_setup',
    name: 'Easy Setup',
    slug: 'easy-setup',
    tagline: 'For fiber & cable customers with straightforward setups',
    description: 'Remote configuration session for compatible ISPs without mesh WiFi.',
    price: 69900, // $699
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
    compatibleIsps: ['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber', 'frontier_fiber'],
    incompatibleIsps: ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'],
  },
  {
    id: 'complex_setup',
    name: 'Complex Setup',
    slug: 'complex-setup',
    tagline: 'For mesh WiFi or tricky ISP configurations',
    description: 'Extended setup for double NAT, mesh systems, or challenging ISPs.',
    price: 89900, // $899
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
    compatibleIsps: ['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber', 'frontier_fiber', 'centurylink', 'optimum'],
    incompatibleIsps: ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'],
    requiresMeshHandling: true,
  },
  {
    id: 'premium_bundle',
    name: 'Premium Bundle',
    slug: 'premium-bundle',
    tagline: 'Complete turnkey solution - just plug in and go',
    description: 'We ship you a complete, pre-tested network stack. Zero configuration needed.',
    price: 149900, // $1,499
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
    compatibleIsps: ['xfinity', 'spectrum', 'att_fiber', 'verizon_fios', 'cox', 'google_fiber', 'frontier_fiber', 'centurylink', 'optimum'],
    incompatibleIsps: ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'],
  },
] as const

export const leadStatusSchema = z.enum(['new', 'contacted', 'converted', 'closed'])
export type LeadStatus = z.infer<typeof leadStatusSchema>

export const consultationStatusSchema = z.enum(['pending', 'confirmed', 'completed', 'cancelled'])
export type ConsultationStatus = z.infer<typeof consultationStatusSchema>

export const orderStatusSchema = z.enum(['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'])
export type OrderStatus = z.infer<typeof orderStatusSchema>
