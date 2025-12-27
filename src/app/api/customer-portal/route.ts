import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerEmail } = body

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Find the customer by email
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    })

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: 'No subscription found for this email address' },
        { status: 404 }
      )
    }

    const customer = customers.data[0]

    // Check if customer has active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    })

    if (subscriptions.data.length === 0) {
      // Check for any subscription (including canceled)
      const allSubs = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 1,
      })

      if (allSubs.data.length === 0) {
        return NextResponse.json(
          { error: 'No subscription found for this email address' },
          { status: 404 }
        )
      }
    }

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/manage-subscription/done`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Customer portal error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer portal session' },
      { status: 500 }
    )
  }
}
