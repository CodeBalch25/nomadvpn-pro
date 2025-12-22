'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Award, Clock } from 'lucide-react'

const trustPoints = [
  {
    icon: Shield,
    title: 'Enterprise Tested',
    description: 'Fortune 500 network compatible',
  },
  {
    icon: Lock,
    title: 'WireGuard Encryption',
    description: 'Military-grade security protocol',
  },
  {
    icon: Award,
    title: '50+ Countries Tested',
    description: 'Telecom, retail & government networks',
  },
  {
    icon: Clock,
    title: 'Same-Day Setup',
    description: 'Get started within 24 hours',
  },
]

export function TrustSignals() {
  return (
    <section className="py-12 bg-card/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <point.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {point.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
