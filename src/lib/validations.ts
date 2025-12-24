import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
      'Please enter a valid phone number'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional(),
  preferredDate: z
    .string()
    .optional(),
  timezone: z
    .string()
    .optional(),
  homeIsp: z
    .string()
    .min(2, 'Please enter your internet provider')
    .max(100, 'ISP name must be less than 100 characters'),
  currentSetup: z
    .string()
    .max(500, 'Please keep your response under 500 characters')
    .optional(),
  travelPlans: z
    .string()
    .max(500, 'Please keep your response under 500 characters')
    .optional(),
  employerType: z
    .enum(['employee', 'freelance', 'consultant', 'other'])
    .optional(),
  serviceInterest: z
    .enum(['essential', 'premium', 'remote']),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
})

export type ConsultationFormData = z.infer<typeof consultationFormSchema>

export const leadStatusSchema = z.enum(['new', 'contacted', 'converted', 'closed'])
export type LeadStatus = z.infer<typeof leadStatusSchema>

export const consultationStatusSchema = z.enum(['pending', 'confirmed', 'completed', 'cancelled'])
export type ConsultationStatus = z.infer<typeof consultationStatusSchema>

export const orderStatusSchema = z.enum(['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'])
export type OrderStatus = z.infer<typeof orderStatusSchema>
