import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Simple auth check
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
    // Get date ranges
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalLeads,
      newLeads,
      convertedLeads,
      totalConsultations,
      pendingConsultations,
      recentLeads,
      recentConsultations,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: { status: 'new' },
      }),
      prisma.lead.count({
        where: { status: 'converted' },
      }),
      prisma.consultation.count(),
      prisma.consultation.count({
        where: { status: 'pending' },
      }),
      prisma.lead.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      prisma.consultation.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalLeads,
        newLeads,
        convertedLeads,
        totalConsultations,
        pendingConsultations,
        recentLeads,
        recentConsultations,
        conversionRate:
          totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
