'use client'

import { motion } from 'framer-motion'
import { Quote, MapPin, Briefcase, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Why we built this - anonymous but authentic
const whyWeBuiltThis = {
  problem: "Commercial VPNs kept failing when I needed them most - locked out of bank accounts, streaming services blocked, slow connections shared with thousands of users.",
  solution: "After years working IT for Fortune 500 companies, I knew there had to be a better way. Residential VPN through your own home connection solves every problem commercial VPNs create.",
  result: "Now tested across 50+ countries with telecom, retail, and government enterprise networks.",
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

        {/* Why We Built This - Problem/Solution format */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <span className="text-destructive font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">The Problem</h3>
                  <p className="text-sm text-muted-foreground">
                    {whyWeBuiltThis.problem}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">The Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    {whyWeBuiltThis.solution}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <span className="text-emerald-500 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">The Result</h3>
                  <p className="text-sm text-muted-foreground">
                    {whyWeBuiltThis.result}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
