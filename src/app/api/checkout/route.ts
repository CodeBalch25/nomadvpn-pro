import { NextRequest, NextResponse } from 'next/server'
import { stripe, SERVICES, ServiceId } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, customerEmail, customerName } = body

    // Validate service
    if (!serviceId || !SERVICES[serviceId as ServiceId]) {
      return NextResponse.json(
        { error: 'Invalid service selected' },
        { status: 400 }
      )
    }

    const service = SERVICES[serviceId as ServiceId]
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (service.priceType === 'subscription') {
      // Create subscription checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: customerEmail,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: service.name,
                description: service.description,
              },
              unit_amount: service.price,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          serviceId,
          customerName: customerName || '',
        },
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancel`,
      })

      return NextResponse.json({ url: session.url })
    } else {
      // Create one-time payment checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: customerEmail,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: service.name,
                description: service.description,
              },
              unit_amount: service.price,
            },
            quantity: 1,
          },
        ],
        metadata: {
          serviceId,
          customerName: customerName || '',
        },
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancel`,
      })

      return NextResponse.json({ url: session.url })
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
