'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Wifi, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ispOptions,
  uploadSpeedOptions,
  technicalComfortOptions,
  getRecommendedTier,
  serviceTiers,
  type RecommendedTier,
} from '@/lib/validations'
import { formatPrice } from '@/lib/utils'

const steps = [
  { id: 1, title: 'Internet Provider' },
  { id: 2, title: 'Home Setup' },
  { id: 3, title: 'Your Preference' },
  { id: 4, title: 'Results' },
]

export function CompatibilityChecker() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    isp: '',
    hasMeshWifi: '',
    uploadSpeed: '',
    technicalComfort: '',
    email: '',
  })

  const [recommendation, setRecommendation] = useState<RecommendedTier | null>(null)

  const isCgnatIsp = ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'].includes(formData.isp)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep === 3) {
      // Calculate recommendation
      const rec = getRecommendedTier({
        isp: formData.isp,
        hasMeshWifi: formData.hasMeshWifi,
        uploadSpeed: formData.uploadSpeed,
        technicalComfort: formData.technicalComfort,
      })
      setRecommendation(rec)
    }
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.isp !== ''
      case 2:
        return formData.hasMeshWifi !== ''
      case 3:
        return true // Optional fields
      default:
        return true
    }
  }

  const saveToDatabase = async () => {
    if (!formData.email) return

    setIsSubmitting(true)
    try {
      await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          ispSelected: formData.isp,
          hasMeshWifi: formData.hasMeshWifi,
          uploadSpeed: formData.uploadSpeed,
          technicalLevel: formData.technicalComfort,
          recommendedTier: recommendation?.tier,
          canDiy: recommendation?.canDIY,
        }),
      })
    } catch (error) {
      console.error('Failed to save compatibility check:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRecommendedService = () => {
    if (!recommendation) return null
    return serviceTiers.find(s => s.id === recommendation.tier)
  }

  const recommendedService = getRecommendedService()

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{ minWidth: '20px' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`text-xs ${
                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step 1: ISP Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Who is your home internet provider?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              This helps us determine if you can host a VPN server at home.
            </p>
          </div>

          <div className="space-y-3">
            <Select value={formData.isp} onValueChange={(v) => updateField('isp', v)}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select your ISP" />
              </SelectTrigger>
              <SelectContent>
                {ispOptions.map((isp) => (
                  <SelectItem key={isp.value} value={isp.value}>
                    <div className="flex items-center gap-2">
                      {isp.label}
                      {isp.tier === 'remote_only' && (
                        <span className="text-xs text-amber-500 ml-1">(CGNAT)</span>
                      )}
                      {isp.tier === 'easy' && (
                        <span className="text-xs text-green-500 ml-1">(Compatible)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isCgnatIsp && (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-500">CGNAT Detected</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This ISP uses CGNAT, which means you can't host a VPN server at home.
                    Don't worry - our Remote VPN Access service is designed for exactly this situation!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Home Setup */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Tell us about your home network</h2>
            <p className="text-sm text-muted-foreground mt-1">
              This helps us recommend the right setup package.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Do you have a mesh WiFi system?</Label>
              <Select value={formData.hasMeshWifi} onValueChange={(v) => updateField('hasMeshWifi', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No, I use my ISP router only</SelectItem>
                  <SelectItem value="yes">Yes (Google Nest, Eero, Orbi, Deco, etc.)</SelectItem>
                  <SelectItem value="unknown">I'm not sure</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Mesh systems require additional configuration.
              </p>
            </div>

            <div className="space-y-2">
              <Label>What's your upload speed?</Label>
              <Select value={formData.uploadSpeed} onValueChange={(v) => updateField('uploadSpeed', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Check at speedtest.net" />
                </SelectTrigger>
                <SelectContent>
                  {uploadSpeedOptions.map((speed) => (
                    <SelectItem key={speed.value} value={speed.value}>
                      {speed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Almost done!</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Just a couple more questions to personalize your recommendation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>How comfortable are you with router settings?</Label>
              <Select value={formData.technicalComfort} onValueChange={(v) => updateField('technicalComfort', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your comfort level" />
                </SelectTrigger>
                <SelectContent>
                  {technicalComfortOptions.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Email (optional - to save your results)</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll send your personalized recommendation. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && recommendation && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Wifi className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Your Personalized Recommendation</h2>
          </div>

          {/* Recommendation Card */}
          <div className="p-6 rounded-xl border-2 border-primary bg-primary/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Recommended
                </span>
                <h3 className="text-2xl font-bold mt-2">{recommendedService?.name}</h3>
                <p className="text-sm text-muted-foreground">{recommendedService?.tagline}</p>
              </div>
              <div className="text-right">
                {recommendedService?.priceType === 'monthly' ? (
                  <div>
                    <span className="text-2xl font-bold">{formatPrice(recommendedService.price)}</span>
                    <span className="text-muted-foreground">/mo</span>
                    {'monthlyPrice' in recommendedService && (
                      <p className="text-xs text-muted-foreground">
                        + {formatPrice((recommendedService as any).setupPrice || 14900)} setup
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <span className="text-2xl font-bold">{formatPrice(recommendedService?.price || 0)}</span>
                    <span className="text-muted-foreground text-sm ml-1">one-time</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background/50 mb-4">
              <p className="text-sm">{recommendation.reason}</p>
            </div>

            {recommendation.canDIY !== null && (
              <p className="text-xs text-muted-foreground mb-4">
                {recommendation.canDIY ? (
                  <span className="flex items-center gap-1 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    You can host your own VPN server at home
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-500">
                    <AlertTriangle className="h-4 w-4" />
                    Connects to our managed infrastructure (no home setup needed)
                  </span>
                )}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1" variant="gradient" size="lg">
                <Link href={`/consultation?service=${recommendedService?.slug}`}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  View All Plans
                </Link>
              </Button>
            </div>
          </div>

          {/* Save Results */}
          {formData.email && (
            <div className="text-center">
              <Button
                onClick={saveToDatabase}
                disabled={isSubmitting}
                variant="ghost"
                size="sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save my results'
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      {currentStep < 4 && (
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button onClick={nextStep} disabled={!canProceed()}>
            {currentStep === 3 ? 'See My Results' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
