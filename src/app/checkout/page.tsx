'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Lock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SERVICES: Record<string, { name: string; price: string; description: string }> = {
  'essential-setup': {
    name: 'Essential Setup',
    price: '$699',
    description: 'Pre-configured Flint 2 + Beryl AX routers with WireGuard VPN setup',
  },
  'premium-support': {
    name: 'Premium + Support',
    price: '$1,299',
    description: 'Full setup with 6 months of dedicated priority support',
  },
  'remote-vpn-access': {
    name: 'Remote VPN Access',
    price: '$49/mo',
    description: 'Monthly access with pre-programmed travel router',
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const service = serviceId ? SERVICES[serviceId] : null

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Service</h1>
            <p className="text-muted-foreground mb-6">
              Please select a valid service from our services page.
            </p>
            <Button asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          customerEmail: email,
          customerName: name,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to create checkout session')
        setLoading(false)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Order Summary */}
              <div className="p-4 rounded-lg bg-muted/50 mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-xl font-bold gradient-text">
                    {service.price}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send your order confirmation and updates here.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting to Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Continue to Payment
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                Secure payment powered by Stripe
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
