import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { consultationStatusSchema } from '@/lib/validations'

// Simple auth check (replace with proper auth in production)
function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) return false

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  )
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where = status ? { status } : {}

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.consultation.count({ where }),
    ])

    return NextResponse.json({
      consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Consultation ID required' },
        { status: 400 }
      )
    }

    // Validate status if provided
    if (status) {
      consultationStatusSchema.parse(status)
    }

    const updateData: Record<string, any> = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const updatedConsultation = await prisma.consultation.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, consultation: updatedConsultation })
  } catch (error) {
    console.error('Error updating consultation:', error)
    return NextResponse.json(
      { error: 'Failed to update consultation' },
      { status: 500 }
    )
  }
}
