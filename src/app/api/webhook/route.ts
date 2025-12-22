import { NextRequest, NextResponse } from 'next/server'
import { stripe, SERVICES, ServiceId } from '@/lib/stripe'
import prisma from '@/lib/db'
import { sendOrderConfirmation } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      const serviceId = session.metadata?.serviceId as ServiceId
      const customerName = session.metadata?.customerName || 'Customer'
      const customerEmail = session.customer_email || ''
      const service = SERVICES[serviceId]

      if (!service) {
        console.error('Unknown service:', serviceId)
        break
      }

      // Create order in database
      const order = await prisma.order.create({
        data: {
          customerName,
          customerEmail,
          serviceId,
          serviceName: service.name,
          amount: session.amount_total || service.price,
          status: 'paid',
          notes: `Stripe Session: ${session.id}`,
        },
      })

      // Send confirmation emails
      await sendOrderConfirmation({
        customerEmail,
        customerName,
        serviceName: service.name,
        amount: session.amount_total || service.price,
        orderId: order.id,
      })

      console.log(`Order created: ${order.id} for ${customerEmail}`)
      break
    }

    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription created:', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription cancelled:', subscription.id)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
