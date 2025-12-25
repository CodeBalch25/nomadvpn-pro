import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      email,
      ispSelected,
      hasMeshWifi,
      uploadSpeed,
      technicalLevel,
      recommendedTier,
      canDiy,
    } = body

    // Save compatibility check to database
    const compatibilityCheck = await prisma.compatibilityCheck.create({
      data: {
        email: email || null,
        ispSelected,
        hasMeshWifi: hasMeshWifi || null,
        uploadSpeed: uploadSpeed || null,
        technicalLevel: technicalLevel || null,
        recommendedTier,
        canDiy: canDiy ?? null,
        convertedToLead: false,
      },
    })

    return NextResponse.json(
      { success: true, id: compatibilityCheck.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to save compatibility check:', error)
    return NextResponse.json(
      { error: 'Failed to save compatibility check' },
      { status: 500 }
    )
  }
}
