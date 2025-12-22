'use client'

import { motion } from 'framer-motion'
import { Home, Building2, Shield, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Home,
    title: 'Residential IP Address',
    description:
      'Your traffic routes through your home internet connection, giving you a consistent US IP address no matter where you travel.',
  },
  {
    icon: Building2,
    title: 'Secure Public WiFi',
    description:
      'Protect your data on hotel, airport, and cafe networks. All traffic is encrypted through your private VPN tunnel.',
  },
  {
    icon: Shield,
    title: 'Reliable Connections',
    description:
      'Tested across 50+ countries with 99.9% uptime. No dropped connections, no speed throttling, no data leaks.',
  },
  {
    icon: Zap,
    title: 'Plug & Play Setup',
    description:
      'Pre-configured hardware arrives ready to use. Connect, power on, and enjoy secure internet from anywhere.',
  },
]

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

export function ValueProposition() {
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
            Why <span className="gradient-text">Residential VPN</span> Is Better for Travelers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Commercial VPN services use shared data center IPs that get blocked by streaming services
            and websites. Our approach gives you your own dedicated residential connection.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Commercial VPN */}
            <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-sm">
                  ✕
                </span>
                Commercial VPN Services
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Data center IPs blocked by streaming services</li>
                <li>• Shared with thousands of users</li>
                <li>• Inconsistent speeds and reliability</li>
                <li>• Often throttled or blocked abroad</li>
                <li>• No dedicated connection</li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                  ✓
                </span>
                NomadVPN Pro Solution
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your own residential US IP address</li>
                <li>• Tested with Fortune 500 enterprise networks</li>
                <li>• Access US streaming and banking</li>
                <li>• Telecom, retail & government compatible</li>
                <li>• Full control of your network</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
