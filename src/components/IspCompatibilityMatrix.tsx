'use client'

import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { ispOptions } from '@/lib/validations'

type ViewMode = 'full' | 'compact' | 'badges'

interface IspCompatibilityMatrixProps {
  mode?: ViewMode
  showHeader?: boolean
  className?: string
}

// Group ISPs by tier
const compatibleIsps = ispOptions.filter(isp => isp.tier === 'easy')
const complexIsps = ispOptions.filter(isp => isp.tier === 'medium')
const cgnatIsps = ispOptions.filter(isp => isp.tier === 'remote_only')

export function IspCompatibilityMatrix({
  mode = 'full',
  showHeader = true,
  className = '',
}: IspCompatibilityMatrixProps) {
  if (mode === 'badges') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {compatibleIsps.map((isp) => (
          <span
            key={isp.value}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs"
          >
            <CheckCircle className="h-3 w-3" />
            {isp.label}
          </span>
        ))}
      </div>
    )
  }

  if (mode === 'compact') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
        <div className="p-4 rounded-lg border border-border bg-card/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Compatible ISPs</p>
              <p className="text-xs text-muted-foreground mt-1">
                {compatibleIsps.map(i => i.label).join(', ')}
                {complexIsps.length > 0 && `, ${complexIsps.map(i => i.label).join(', ')}`}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">CGNAT ISPs (Remote Only)</p>
              <p className="text-xs text-muted-foreground mt-1">
                {cgnatIsps.map(i => i.label).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full mode
  return (
    <div className={`space-y-6 ${className}`}>
      {showHeader && (
        <div className="text-center">
          <h3 className="text-lg font-semibold">ISP Compatibility</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check if your internet provider supports VPN hosting
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Compatible - Easy Setup */}
        <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h4 className="font-semibold text-green-500">Easy Setup</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Straightforward port forwarding. Works with our Easy Setup package.
          </p>
          <ul className="space-y-2">
            {compatibleIsps.map((isp) => (
              <li key={isp.value} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">{isp.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Complex Setup */}
        <div className="p-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h4 className="font-semibold text-yellow-500">Complex Setup</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            May require extra configuration. Works with our Complex Setup package.
          </p>
          <ul className="space-y-2">
            {complexIsps.map((isp) => (
              <li key={isp.value} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm">{isp.label}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-sm">Any ISP + Mesh WiFi</span>
            </li>
          </ul>
        </div>

        {/* CGNAT - Remote Only */}
        <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="h-5 w-5 text-red-500" />
            <h4 className="font-semibold text-red-500">Remote VPN Only</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Uses CGNAT - can't host VPN at home. Our Remote VPN Access works perfectly.
          </p>
          <ul className="space-y-2">
            {cgnatIsps.map((isp) => (
              <li key={isp.value} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm">{isp.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Don't see your ISP? Use our{' '}
          <a href="/compatibility" className="text-primary hover:underline">
            compatibility checker
          </a>{' '}
          or{' '}
          <a href="/consultation" className="text-primary hover:underline">
            book a consultation
          </a>
          .
        </p>
      </div>
    </div>
  )
}
