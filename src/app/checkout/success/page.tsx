import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been successfully placed.',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Thank You for Your Order!
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Your payment has been processed successfully. You'll receive a
            confirmation email shortly with all the details.
          </p>

          <Card className="bg-card/50 border-border mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox for order details and receipt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Personal Contact (Within 24h)</p>
                    <p className="text-sm text-muted-foreground">
                      I'll reach out to confirm your shipping address and schedule
                      your setup walkthrough.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Hardware Ships</p>
                    <p className="text-sm text-muted-foreground">
                      Your pre-configured routers ship within 2-3 business days
                      with tracking provided.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Setup Call</p>
                    <p className="text-sm text-muted-foreground">
                      We'll walk through everything together via video call to
                      ensure you're set up perfectly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Questions? Reach Out Anytime</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+12133218300"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (213) 321-8300
                </a>
                <a
                  href="mailto:support@nomadvpnpro.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@nomadvpnpro.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Button asChild size="lg" variant="gradient">
            <Link href="/">
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
