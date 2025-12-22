import { Hero } from '@/components/home/Hero'
import { TrustSignals } from '@/components/home/TrustSignals'
import { ValueProposition } from '@/components/home/ValueProposition'
import { ServicePreview } from '@/components/home/ServicePreview'
import { Testimonials } from '@/components/home/Testimonials'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <ValueProposition />
      <ServicePreview />
      <Testimonials />
      <CTASection />
    </>
  )
}
