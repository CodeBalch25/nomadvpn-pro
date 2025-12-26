import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'NomadVPN Pro terms of service - the agreement between you and NomadVPN Pro for using our services.',
}

export default function TermsOfServicePage() {
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
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: December 25, 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using NomadVPN Pro's website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-muted-foreground">
                These Terms apply to all visitors, users, and customers of NomadVPN Pro.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground mb-4">
                NomadVPN Pro provides VPN router configuration services designed for digital nomads and remote workers. Our services include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Hardware:</strong> Pre-configured GL.iNet routers (Flint 2 and Beryl AX models)</li>
                <li><strong className="text-foreground">Configuration:</strong> WireGuard VPN setup connecting your travel router to your home network or our managed servers</li>
                <li><strong className="text-foreground">Support:</strong> Remote setup assistance via video call</li>
                <li><strong className="text-foreground">Remote VPN Access:</strong> Managed VPN server access for customers who cannot host their own VPN</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree to use our services only for lawful purposes. You may NOT use our services to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Engage in any illegal activities</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Attempt to gain unauthorized access to systems or networks</li>
                <li>Distribute spam or unsolicited communications</li>
                <li>Engage in activities that could damage our infrastructure or reputation</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to terminate service for any user who violates these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Purchases and Payments</h2>

              <h3 className="text-lg font-medium text-foreground mb-2">Pricing</h3>
              <p className="text-muted-foreground mb-4">
                All prices are listed in US dollars. We reserve the right to change prices at any time without notice, but changes will not affect orders already placed.
              </p>

              <h3 className="text-lg font-medium text-foreground mb-2">Payment Processing</h3>
              <p className="text-muted-foreground mb-4">
                Payments are processed securely through Stripe. By making a purchase, you represent that you are authorized to use the payment method provided.
              </p>

              <h3 className="text-lg font-medium text-foreground mb-2">Subscriptions (Remote VPN Access)</h3>
              <p className="text-muted-foreground">
                Remote VPN Access is billed monthly at the current rate. You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Hardware and Shipping</h2>
              <p className="text-muted-foreground mb-4">
                Our services include pre-configured router hardware. By purchasing:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Hardware ships within 2-3 business days after order confirmation</li>
                <li>Shipping times vary based on your location (typically 3-7 business days within the US)</li>
                <li>You are responsible for providing accurate shipping information</li>
                <li>Risk of loss transfers to you upon delivery to the carrier</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Refund Policy</h2>
              <p className="text-muted-foreground mb-4">
                We want you to be satisfied with your purchase. Our refund policy is as follows:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Hardware:</strong> 30-day return policy for unopened hardware in original packaging</li>
                <li><strong className="text-foreground">Configuration Services:</strong> If we cannot successfully configure your VPN due to ISP limitations not identified during the compatibility check, we will provide a full refund</li>
                <li><strong className="text-foreground">Remote VPN Access:</strong> Prorated refund available within the first 14 days if service does not meet your needs</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To request a refund, please contact support@nomadvpnpro.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                While we strive for 99.9% uptime for our Remote VPN Access service, we do not guarantee uninterrupted service. We are not liable for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Scheduled maintenance (we will provide advance notice when possible)</li>
                <li>Outages caused by your ISP or internet connection</li>
                <li>Force majeure events beyond our control</li>
                <li>Issues with your employer's VPN or network policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Your Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                As a customer, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Ensuring your use of VPN services complies with your employer's policies</li>
                <li>Maintaining the security of your router credentials</li>
                <li>Keeping your home router connected and powered (for self-hosted VPN)</li>
                <li>Providing accurate information during the compatibility check</li>
                <li>Complying with all applicable laws in your jurisdiction and travel destinations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on the NomadVPN Pro website, including text, graphics, logos, and software, is the property of NomadVPN Pro or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The service will meet all your requirements</li>
                <li>The service will be uninterrupted, secure, or error-free</li>
                <li>The VPN will work with all websites, services, or employer networks</li>
                <li>Connection speeds will match your home internet speeds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, NomadVPN Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services. Our total liability for any claim shall not exceed the amount you paid for the service in question.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless NomadVPN Pro, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">13. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your access to our services at any time, with or without cause, and with or without notice. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">14. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">15. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Email:</strong> support@nomadvpnpro.com</li>
                <li><strong className="text-foreground">Phone:</strong> (213) 321-8300</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">17. Severability</h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              By using NomadVPN Pro services, you acknowledge that you have read and agree to these Terms of Service.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
