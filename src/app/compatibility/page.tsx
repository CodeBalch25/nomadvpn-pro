import { Metadata } from 'next'
import { CompatibilityChecker } from './CompatibilityChecker'
import { IspCompatibilityMatrix } from '@/components/IspCompatibilityMatrix'

export const metadata: Metadata = {
  title: 'Check Your ISP Compatibility | NomadVPN Pro',
  description:
    'Find out in 60 seconds if your home internet provider is compatible with NomadVPN Pro. Works with 85% of US ISPs including Xfinity, Spectrum, AT&T Fiber, and more.',
}

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Check Your <span className="gradient-text">Compatibility</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find out in 60 seconds if your home internet setup will work with NomadVPN Pro.
              We'll recommend the perfect package for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Compatibility Checker */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <CompatibilityChecker />
          </div>
        </div>
      </section>

      {/* ISP Compatibility Matrix */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <IspCompatibilityMatrix mode="full" showHeader={true} />
          </div>
        </div>
      </section>

      {/* Why Compatibility Matters */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why <span className="gradient-text">Compatibility</span> Matters
            </h2>

            <div className="prose prose-invert max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="text-lg font-semibold mb-3">What is CGNAT?</h3>
                  <p className="text-sm text-muted-foreground">
                    CGNAT (Carrier-Grade NAT) is when your ISP shares one public IP address
                    among many customers. This is common with 5G home internet and satellite
                    providers. It prevents you from hosting a VPN server at home because
                    incoming connections can't reach your router.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="text-lg font-semibold mb-3">What About Mesh WiFi?</h3>
                  <p className="text-sm text-muted-foreground">
                    Mesh WiFi systems like Google Nest, Eero, or Orbi often run in "router mode"
                    which creates a double NAT situation. This requires additional configuration
                    to allow VPN traffic through. Our Complex Setup package handles this.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="text-lg font-semibold mb-3">Upload Speed Matters</h3>
                  <p className="text-sm text-muted-foreground">
                    When you're traveling and connecting back to your home VPN, your home's
                    upload speed becomes your download speed abroad. We recommend at least
                    10 Mbps upload for reliable video calls and streaming.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="text-lg font-semibold mb-3">We've Got You Covered</h3>
                  <p className="text-sm text-muted-foreground">
                    Even if your ISP uses CGNAT, our Remote VPN Access service connects you
                    to our managed infrastructure instead. You still get a residential US IP -
                    just through our network instead of your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
