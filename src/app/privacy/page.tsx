import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'NomadVPN Pro privacy policy - how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: December 25, 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                NomadVPN Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website nomadvpnpro.com or use our VPN router configuration services.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. By using our services, you consent to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Fill out contact or consultation forms</li>
                <li>Purchase our services</li>
                <li>Subscribe to our newsletter</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Phone number</li>
                <li>Shipping address (for hardware delivery)</li>
                <li>Payment information (processed securely via Stripe)</li>
                <li>Internet Service Provider information (to assess compatibility)</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground">
                When you visit our website, we may automatically collect certain information including your IP address, browser type, operating system, and pages visited. This helps us improve our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Schedule and conduct consultation calls</li>
                <li>Configure your VPN routers</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. VPN Service Privacy</h2>
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Important:</strong> NomadVPN Pro provides VPN router configuration services. We set up WireGuard VPN connections that route through either:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong className="text-foreground">Your own home network</strong> (Easy Setup and Complex Setup tiers)</li>
                <li><strong className="text-foreground">Our managed VPN servers</strong> (Remote VPN Access tier)</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                For customers using our Remote VPN Access service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We do not log your browsing activity or traffic</li>
                <li>We do not sell or share your internet usage data</li>
                <li>Connection logs (timestamps only) may be retained for up to 30 days for troubleshooting purposes</li>
                <li>We use WireGuard protocol which provides modern, secure encryption</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Payment Processing</h2>
              <p className="text-muted-foreground">
                All payments are processed securely through Stripe. We do not store your full credit card numbers on our servers. Stripe's privacy policy governs the handling of your payment information. You can review Stripe's privacy policy at stripe.com/privacy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Service Providers:</strong> With trusted third parties who assist in operating our business (payment processing, shipping carriers)</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In connection with any merger or sale of company assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Customer records are typically retained for 7 years for tax and legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Cookies</h2>
              <p className="text-muted-foreground">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Email:</strong> support@nomadvpnpro.com</li>
                <li><strong className="text-foreground">Phone:</strong> (213) 321-8300</li>
              </ul>
            </section>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about how we handle your data?
            </p>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
