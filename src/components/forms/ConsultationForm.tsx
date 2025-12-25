'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Calendar, CheckCircle, ArrowLeft, ArrowRight, AlertTriangle, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  consultationFormSchema,
  type ConsultationFormData,
  ispOptions,
  uploadSpeedOptions,
  technicalComfortOptions,
  getRecommendedTier,
  serviceTiers
} from '@/lib/validations'

const steps = [
  { id: 1, title: 'Contact Info' },
  { id: 2, title: 'Your Setup' },
  { id: 3, title: 'Recommendation' },
]

const timezones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'GMT/UTC' },
  { value: 'Europe/Paris', label: 'Central European Time' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time' },
  { value: 'Asia/Singapore', label: 'Singapore Time' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time' },
]

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      serviceInterest: 'consultation',
    },
  })

  const serviceInterest = watch('serviceInterest')
  const employerType = watch('employerType')
  const homeIsp = watch('homeIsp')
  const hasMeshWifi = watch('hasMeshWifi')
  const uploadSpeed = watch('uploadSpeed')
  const technicalComfort = watch('technicalComfort')

  // Get recommended tier based on current form values
  const recommendation = getRecommendedTier({
    isp: homeIsp,
    hasMeshWifi: hasMeshWifi,
    uploadSpeed: uploadSpeed,
    technicalComfort: technicalComfort,
  })

  // Auto-update service interest when recommendation changes
  useEffect(() => {
    if (homeIsp && recommendation.tier !== 'consultation') {
      setValue('serviceInterest', recommendation.tier)
    }
  }, [homeIsp, hasMeshWifi, uploadSpeed, technicalComfort, recommendation.tier, setValue])

  // Check if ISP is CGNAT (incompatible with self-hosted)
  const isCgnatIsp = ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless'].includes(homeIsp || '')

  const nextStep = async () => {
    let fieldsToValidate: (keyof ConsultationFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email']
    } else if (currentStep === 2) {
      fieldsToValidate = []
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit consultation request')
      }

      setIsSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Consultation Requested!</h3>
        <p className="text-muted-foreground mb-4">
          We'll reach out within 24 hours to schedule your consultation.
        </p>
        <p className="text-sm text-muted-foreground">
          Check your email for a confirmation message.
        </p>
      </div>
    )
  }

  return (
    <div>
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
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-1 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{ minWidth: '40px' }}
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
                currentStep >= step.id
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Contact Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register('phone')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Your Timezone</Label>
                <Select
                  onValueChange={(value) => setValue('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Your Setup */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="homeIsp">Home Internet Provider (ISP) *</Label>
              <Select
                value={homeIsp}
                onValueChange={(value) =>
                  setValue('homeIsp', value as ConsultationFormData['homeIsp'])
                }
              >
                <SelectTrigger className={errors.homeIsp ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select your ISP" />
                </SelectTrigger>
                <SelectContent>
                  {ispOptions.map((isp) => (
                    <SelectItem key={isp.value} value={isp.value}>
                      {isp.label}
                      {isp.tier === 'remote_only' && (
                        <span className="ml-2 text-xs text-amber-500">(CGNAT)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps us determine the best setup option for you.
              </p>
              {errors.homeIsp && (
                <p className="text-sm text-destructive">{errors.homeIsp.message}</p>
              )}
            </div>

            {/* CGNAT Warning */}
            {isCgnatIsp && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-500">CGNAT Detected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your ISP uses Carrier-Grade NAT, which prevents hosting a VPN server at home.
                      Our Remote VPN Access service is designed specifically for this situation -
                      we handle everything for you.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="hasMeshWifi">Do you have a mesh WiFi system?</Label>
              <Select
                value={hasMeshWifi}
                onValueChange={(value) =>
                  setValue('hasMeshWifi', value as 'yes' | 'no' | 'unknown')
                }
              >
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
                Mesh systems like Google Nest WiFi, Eero, or Orbi require additional configuration.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="uploadSpeed">Upload Speed</Label>
              <Select
                value={uploadSpeed}
                onValueChange={(value) =>
                  setValue('uploadSpeed', value as ConsultationFormData['uploadSpeed'])
                }
              >
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

            <div className="space-y-2">
              <Label htmlFor="technicalComfort">Technical Comfort Level</Label>
              <Select
                value={technicalComfort}
                onValueChange={(value) =>
                  setValue('technicalComfort', value as ConsultationFormData['technicalComfort'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="How comfortable are you with router settings?" />
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
              <Label htmlFor="employerType">Type of Employment</Label>
              <Select
                value={employerType}
                onValueChange={(value) =>
                  setValue('employerType', value as 'employee' | 'freelance' | 'consultant' | 'other')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee (Remote / Hybrid)</SelectItem>
                  <SelectItem value="freelance">Freelance / Self-Employed</SelectItem>
                  <SelectItem value="consultant">Consultant / Contractor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelPlans">Travel Plans (optional)</Label>
              <Textarea
                id="travelPlans"
                placeholder="Where are you planning to travel or work from?"
                rows={2}
                {...register('travelPlans')}
              />
            </div>
          </div>
        )}

        {/* Step 3: Recommendation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Show recommendation based on their setup */}
            {homeIsp && recommendation.tier !== 'consultation' && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex gap-3">
                  <Wifi className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Recommended for You</p>
                    <p className="text-sm text-muted-foreground mt-1">{recommendation.reason}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Select your preferred service *</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {[
                  { value: 'remote_vpn_access', label: 'Remote VPN Access', price: '$149 setup + $35/mo', desc: 'Works with ANY ISP' },
                  { value: 'easy_setup', label: 'Easy Setup', price: '$699', desc: 'For compatible ISPs', disabled: isCgnatIsp },
                  { value: 'complex_setup', label: 'Complex Setup', price: '$899', desc: 'For mesh WiFi setups', disabled: isCgnatIsp },
                  { value: 'premium_bundle', label: 'Premium Bundle', price: '$1,499', desc: 'Complete turnkey solution', disabled: isCgnatIsp },
                ].map((service) => (
                  <button
                    key={service.value}
                    type="button"
                    disabled={service.disabled}
                    onClick={() => setValue('serviceInterest', service.value as ConsultationFormData['serviceInterest'])}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      serviceInterest === service.value
                        ? 'border-primary bg-primary/10'
                        : service.disabled
                        ? 'border-border/50 opacity-50 cursor-not-allowed'
                        : 'border-border hover:border-primary/50'
                    } ${recommendation.tier === service.value ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {service.label}
                          {recommendation.tier === service.value && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Recommended</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{service.desc}</div>
                      </div>
                      <div className="text-sm font-medium text-primary">{service.price}</div>
                    </div>
                    {service.disabled && (
                      <p className="text-xs text-amber-500 mt-2">Not available for your ISP (requires Remote VPN Access)</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Anything else you'd like us to know?"
                rows={3}
                {...register('notes')}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Consultation
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
