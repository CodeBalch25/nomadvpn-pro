'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Ready to Stay{' '}
            <span className="gradient-text">Connected?</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Join professionals using our enterprise-tested VPN solutions in 50+ countries.
            Secure connectivity to US networks from anywhere. Book a free consultation
            to discuss your travel needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" variant="gradient" className="group">
              <Link href="/consultation">
                <MessageSquare className="mr-2 h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No commitment required. We'll discuss your needs and recommend the best solution.
          </p>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Fortune 500 Tested
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
        </motion.div>
      </div>
    </section>
  )
}
