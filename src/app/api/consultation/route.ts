import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { consultationFormSchema } from '@/lib/validations'
import { sendConsultationNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = consultationFormSchema.parse(body)

    // Create consultation request in database
    const consultation = await prisma.consultation.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        preferredDate: validatedData.preferredDate
          ? new Date(validatedData.preferredDate)
          : null,
        timezone: validatedData.timezone || null,
        homeIsp: validatedData.homeIsp || null,
        currentSetup: validatedData.currentSetup || null,
        travelPlans: validatedData.travelPlans || null,
        employerType: validatedData.employerType || null,
        serviceInterest: validatedData.serviceInterest,
        notes: validatedData.notes || null,
        status: 'pending',
      },
    })

    // Send email notification
    await sendConsultationNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      preferredDate: validatedData.preferredDate
        ? new Date(validatedData.preferredDate)
        : null,
      timezone: validatedData.timezone,
      homeIsp: validatedData.homeIsp,
      currentSetup: validatedData.currentSetup,
      travelPlans: validatedData.travelPlans,
      employerType: validatedData.employerType,
      serviceInterest: validatedData.serviceInterest,
      notes: validatedData.notes,
    })

    return NextResponse.json(
      { success: true, id: consultation.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Consultation form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    )
  }
}
