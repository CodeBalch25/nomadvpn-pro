import Link from 'next/link'
import { Shield, Mail, Phone, MapPin } from 'lucide-react'

const footerNavigation = {
  services: [
    { name: 'Essential Setup', href: '/services#essential-setup' },
    { name: 'Premium + Support', href: '/services#premium-support' },
    { name: 'Remote VPN Access', href: '/services#remote-vpn-access' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Book Consultation', href: '/consultation' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                <span className="text-foreground">Nomad</span>
                <span className="gradient-text">VPN</span>
                <span className="text-muted-foreground text-sm ml-1">Pro</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Pre-configured VPN routers for digital nomads and remote workers.
              Secure access to your home network from anywhere.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <a href="tel:+12133218300" className="hover:text-foreground transition-colors">
                  (213) 321-8300
                </a>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <a href="mailto:support@nomadvpnpro.com" className="hover:text-foreground transition-colors">
                  support@nomadvpnpro.com
                </a>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>United States</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} NomadVPN Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground">
                Secure payments via Stripe
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-muted-foreground">VISA</span>
                </div>
                <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
                  <span className="text-[8px] font-bold text-muted-foreground">MC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
