'use client'

import { motion } from 'framer-motion'
import { Quote, MapPin, Briefcase, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Real founder story - this is authentic and verifiable
const founderStory = {
  quote:
    "I built NomadVPN Pro because I faced this exact problem. Working remotely for a Fortune 500 company while traveling, I got locked out of my bank accounts, couldn't access streaming services, and dealt with unreliable commercial VPNs. After configuring my own residential VPN setup, everything just worked. Now I help others do the same.",
  author: 'Timothy Balch',
  role: 'Founder, NomadVPN Pro',
  experience: 'Former IT at AT&T, Nike, Comcast',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Testimonials() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Trusted by <span className="gradient-text">Remote Workers</span> Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join professionals from leading companies who work from anywhere
            without compromising their careers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="border-t border-border pt-4">
                    <p className="font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '100%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Countries Tested' },
            { value: 'Fortune 500', label: 'Networks Tested' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
