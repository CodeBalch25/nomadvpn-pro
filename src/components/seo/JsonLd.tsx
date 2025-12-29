'use client'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NomadVPN Pro',
    url: 'https://www.nomadvpnpro.com',
    logo: 'https://www.nomadvpnpro.com/logo.png',
    description: 'Pre-configured VPN routers for remote workers and digital nomads. Work abroad, appear from home.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-213-321-8300',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NomadVPN Pro Easy Setup',
    description: 'Pre-configured VPN router package with GL.iNet Flint 2 (home) and Beryl AX (travel). Route your traffic through your residential IP while working abroad.',
    brand: {
      '@type': 'Brand',
      name: 'NomadVPN Pro',
    },
    offers: {
      '@type': 'Offer',
      price: '699.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
      seller: {
        '@type': 'Organization',
        name: 'NomadVPN Pro',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NomadVPN Pro',
    description: 'VPN router setup service for remote workers and digital nomads',
    url: 'https://www.nomadvpnpro.com',
    telephone: '+1-213-321-8300',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    priceRange: '$35-$1499',
    openingHours: 'Mo-Fr 09:00-18:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
