'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Stats {
  totalLeads: number
  newLeads: number
  convertedLeads: number
  totalConsultations: number
  pendingConsultations: number
  recentLeads: number
  recentConsultations: number
  conversionRate: string | number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const credentials = btoa(
          `${process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'}:${
            process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nomadvpn_admin_2024'
          }`
        )

        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }

        const data = await response.json()
        setStats(data.stats)
      } catch (err) {
        setError('Failed to load dashboard stats. Make sure the database is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Dashboard Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      description: `${stats?.newLeads || 0} new`,
      href: '/admin/leads',
    },
    {
      title: 'Consultations',
      value: stats?.totalConsultations || 0,
      icon: Calendar,
      description: `${stats?.pendingConsultations || 0} pending`,
      href: '/admin/consultations',
    },
    {
      title: 'This Week',
      value: (stats?.recentLeads || 0) + (stats?.recentConsultations || 0),
      icon: Clock,
      description: 'New inquiries',
      href: '/admin/leads',
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      description: 'Leads to converted',
      href: '/admin/leads',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage leads, consultations, and view business metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="bg-card hover:bg-card/80 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {stats?.newLeads || 0} new leads waiting for follow-up.
              </p>
              <Button asChild>
                <Link href="/admin/leads">
                  View All Leads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {stats?.pendingConsultations || 0} consultations need scheduling.
              </p>
              <Button asChild>
                <Link href="/admin/consultations">
                  View Consultations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
