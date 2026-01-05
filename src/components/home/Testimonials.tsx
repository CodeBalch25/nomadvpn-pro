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
            Built by a <span className="gradient-text">Remote Worker</span>, for Remote Workers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            This isn't a corporate product. It's a solution I built to solve my own problem.
          </p>
        </motion.div>

        {/* Founder Story - Single authentic testimonial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/30 mb-6" />

                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  "{founderStory.quote}"
                </p>

                <div className="flex items-center gap-4 border-t border-border pt-6">
                  {/* Placeholder for photo - you can add a real image later */}
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">TB</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {founderStory.author}
                    </p>
                    <p className="text-sm text-primary">
                      {founderStory.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {founderStory.experience}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Experience Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Tested in 50+ countries</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Fortune 500 IT experience</span>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Based in Los Angeles, CA</span>
          </div>
        </motion.div>

        {/* Beta Tester CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Want to be an early adopter?
              </h3>
              <p className="text-muted-foreground mb-4">
                We're looking for beta testers who travel frequently. Get a discounted setup in exchange for honest feedback.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/consultation">Apply for Beta Program</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
