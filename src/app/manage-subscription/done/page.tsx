import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Subscription Updated',
  description: 'Your subscription changes have been saved.',
}

export default function ManageSubscriptionDonePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Changes Saved
          </h1>

          <p className="text-muted-foreground mb-8">
            Your subscription changes have been processed. You'll receive an email
            confirmation if any billing changes were made.
          </p>

          <Card className="bg-card/50 border-border mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Need Additional Help?</h3>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/manage-subscription">
                Manage Subscription Again
              </Link>
            </Button>
            <Button asChild variant="gradient">
              <Link href="/">
                Return to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
