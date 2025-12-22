import { Metadata } from 'next'
import { Calendar, Shield, Clock, CheckCircle } from 'lucide-react'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Book Consultation',
  description:
    'Schedule a free consultation to discuss your remote work VPN needs. Get personalized recommendations for your specific situation.',
}

const benefits = [
  {
    icon: Shield,
    title: 'Enterprise Experience',
    description: 'Advice from someone who has tested this with Fortune 500 networks.',
  },
  {
    icon: CheckCircle,
    title: 'Tailored Recommendations',
    description: 'Get advice on the best setup for your travel needs and budget.',
  },
  {
    icon: Clock,
    title: 'No Commitment',
    description: 'Free consultation with no obligation. Just honest advice.',
  },
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold">
              Book a Free <span className="gradient-text">Consultation</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's discuss your situation and find the right solution. No sales pressure,
              just honest advice from someone who's been in your shoes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Benefits */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-xl font-semibold mb-4">What to Expect</h2>

                {benefits.map((item, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-sm">During the Call</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Understand your current setup</li>
                    <li>• Discuss travel plans and needs</li>
                    <li>• Review employer requirements</li>
                    <li>• Recommend the best solution</li>
                    <li>• Answer all your questions</li>
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-2">Request Your Consultation</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Fill out the form below and we'll reach out within 24 hours to schedule.
                    </p>
                    <ConsultationForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-card/30 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Telecom, Retail & Gov Tested
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                50+ Countries
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Response Within 24h
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
