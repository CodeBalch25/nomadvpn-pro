import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with NomadVPN Pro. We typically respond within 24 hours. Ask questions about our VPN setup services or request a consultation.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone / Text',
    value: '(213) 321-8300',
    href: 'tel:+12133218300',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'timudai@outlook.com',
    href: 'mailto:timudai@outlook.com',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions about our services? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

                {contactInfo.map((item, index) => (
                  <Card key={index} className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.title}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-6">
                  <h3 className="font-semibold mb-3">Prefer a Call?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a free consultation and we'll schedule a time to discuss
                    your needs over Zoom or phone.
                  </p>
                  <Link
                    href="/consultation"
                    className="text-sm text-primary hover:underline"
                  >
                    Book a consultation →
                  </Link>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="section-padding bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Looking for Quick Answers?</h2>
            <p className="text-muted-foreground mb-6">
              Check out our services page for frequently asked questions about
              setup, pricing, and technical details.
            </p>
            <Link
              href="/services#faq"
              className="text-primary hover:underline font-medium"
            >
              View FAQ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
