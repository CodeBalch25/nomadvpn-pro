import { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Order Cancelled',
  description: 'Your order has been cancelled.',
}

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-8">
            <XCircle className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Order Cancelled
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            No worries! Your payment was not processed and you haven't been
            charged. If you have any questions or concerns, feel free to reach
            out.
          </p>

          <Card className="bg-card/50 border-border mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Not Sure Which Package?</h2>
              <p className="text-muted-foreground mb-4">
                Book a free consultation and I'll help you figure out the best
                solution for your specific situation. No pressure, just honest
                advice.
              </p>
              <Button asChild variant="outline">
                <Link href="/consultation">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Book Free Consultation
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="gradient">
              <Link href="/services">
                View Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
