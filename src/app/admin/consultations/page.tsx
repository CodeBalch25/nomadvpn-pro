'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Calendar, Globe, Briefcase, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDateTime } from '@/lib/utils'

interface Consultation {
  id: string
  name: string
  email: string
  phone: string | null
  preferredDate: string | null
  timezone: string | null
  currentSetup: string | null
  travelPlans: string | null
  employerType: string | null
  serviceInterest: string
  notes: string | null
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'secondary',
}

const serviceLabels: Record<string, string> = {
  essential: 'Essential Setup ($699)',
  premium: 'Premium + Support ($1,299)',
  rental: 'Remote VPN Access ($49/mo)',
  enterprise: 'Enterprise Custom',
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const fetchConsultations = async () => {
    setLoading(true)
    try {
      const credentials = btoa('admin:nomadvpn_admin_2024')
      const url = filter === 'all'
        ? '/api/admin/consultations'
        : `/api/admin/consultations?status=${filter}`

      const response = await fetch(url, {
        headers: { Authorization: `Basic ${credentials}` },
      })

      if (response.ok) {
        const data = await response.json()
        setConsultations(data.consultations)
      }
    } catch (err) {
      console.error('Error fetching consultations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConsultations()
  }, [filter])

  const updateStatus = async (id: string, status: string) => {
    try {
      const credentials = btoa('admin:nomadvpn_admin_2024')
      const response = await fetch('/api/admin/consultations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        setConsultations(consultations.map((c) =>
          c.id === id ? { ...c, status } : c
        ))
      }
    } catch (err) {
      console.error('Error updating consultation:', err)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Consultations</h1>
              <p className="text-muted-foreground mt-1">
                Manage consultation requests and scheduling.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={fetchConsultations}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Consultations List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : consultations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No consultations found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{consultation.name}</h3>
                        <Badge variant={statusColors[consultation.status] as any}>
                          {consultation.status}
                        </Badge>
                        <Badge variant="outline">
                          {serviceLabels[consultation.serviceInterest] || consultation.serviceInterest}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${consultation.email}`} className="hover:text-primary">
                            {consultation.email}
                          </a>
                        </span>
                        {consultation.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${consultation.phone}`} className="hover:text-primary">
                              {consultation.phone}
                            </a>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateTime(consultation.createdAt)}
                        </span>
                        {consultation.timezone && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {consultation.timezone}
                          </span>
                        )}
                        {consultation.employerType && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {consultation.employerType}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        {consultation.currentSetup && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <span className="font-medium text-foreground">Current Setup:</span>{' '}
                            <span className="text-muted-foreground">{consultation.currentSetup}</span>
                          </div>
                        )}
                        {consultation.travelPlans && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <span className="font-medium text-foreground">Travel Plans:</span>{' '}
                            <span className="text-muted-foreground">{consultation.travelPlans}</span>
                          </div>
                        )}
                        {consultation.notes && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <span className="font-medium text-foreground">Notes:</span>{' '}
                            <span className="text-muted-foreground">{consultation.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Select
                        value={consultation.status}
                        onValueChange={(value) => updateStatus(consultation.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
