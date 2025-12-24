import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { contactFormSchema } from '@/lib/validations'
import { sendContactAutoReply } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactFormSchema.parse(body)

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
        source: 'contact_form',
        status: 'new',
      },
    })

    // Send auto-reply to customer + notification to owner
    await sendContactAutoReply({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    })

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
