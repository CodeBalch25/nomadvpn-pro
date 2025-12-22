'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Calendar, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
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
import { consultationFormSchema, type ConsultationFormData } from '@/lib/validations'

const steps = [
  { id: 1, title: 'Contact Info' },
  { id: 2, title: 'Your Situation' },
  { id: 3, title: 'Service Interest' },
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
      serviceInterest: 'premium',
    },
  })

  const serviceInterest = watch('serviceInterest')
  const employerType = watch('employerType')

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

        {/* Step 2: Your Situation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employerType">Type of Employment</Label>
              <Select
                value={employerType}
                onValueChange={(value: 'enterprise' | 'startup' | 'freelance' | 'other') =>
                  setValue('employerType', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise / Large Company</SelectItem>
                  <SelectItem value="startup">Startup / Small Business</SelectItem>
                  <SelectItem value="freelance">Freelance / Contractor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeIsp">Home Internet Provider (ISP) *</Label>
              <Input
                id="homeIsp"
                placeholder="e.g., Comcast, AT&T, Verizon, Spectrum, etc."
                {...register('homeIsp')}
                className={errors.homeIsp ? 'border-destructive' : ''}
              />
              <p className="text-xs text-muted-foreground">
                This helps us ensure your home internet is compatible with the VPN setup.
              </p>
              {errors.homeIsp && (
                <p className="text-sm text-destructive">{errors.homeIsp.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSetup">Current VPN/Router Setup</Label>
              <Textarea
                id="currentSetup"
                placeholder="What VPN or router solutions are you currently using, if any?"
                rows={3}
                {...register('currentSetup')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelPlans">Travel Plans</Label>
              <Textarea
                id="travelPlans"
                placeholder="Where are you planning to travel or work from? Any specific countries or regions?"
                rows={3}
                {...register('travelPlans')}
              />
            </div>
          </div>
        )}

        {/* Step 3: Service Interest */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Which service interests you most? *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {[
                  { value: 'essential', label: 'Essential Setup', price: '$699' },
                  { value: 'premium', label: 'Premium + Support', price: '$1,299' },
                  { value: 'remote', label: 'Remote VPN Access', price: '$49/mo' },
                ].map((service) => (
                  <button
                    key={service.value}
                    type="button"
                    onClick={() => setValue('serviceInterest', service.value as ConsultationFormData['serviceInterest'])}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      serviceInterest === service.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium">{service.label}</div>
                    <div className="text-sm text-muted-foreground">{service.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Anything else you'd like us to know before our consultation?"
                rows={4}
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
