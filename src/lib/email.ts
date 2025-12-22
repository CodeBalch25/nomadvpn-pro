import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'NomadVPN Pro <noreply@nomadvpn.pro>'
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'timudai@outlook.com'

export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Contact Form: ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This lead has been saved to your database. Reply directly to this email to respond to ${data.name}.
        </p>
      `,
      replyTo: data.email,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send contact notification:', error)
    return { success: false, error }
  }
}

export async function sendConsultationNotification(data: {
  name: string
  email: string
  phone?: string
  preferredDate?: Date | null
  timezone?: string
  homeIsp?: string
  currentSetup?: string
  travelPlans?: string
  employerType?: string
  serviceInterest: string
  notes?: string
}) {
  const serviceNames: Record<string, string> = {
    essential: 'Essential Setup ($699)',
    premium: 'Premium + Support ($1,299)',
    remote: 'Remote VPN Access ($49/mo)',
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Consultation Request: ${data.name}`,
      html: `
        <h2>New Consultation Request</h2>

        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.timezone ? `<p><strong>Timezone:</strong> ${data.timezone}</p>` : ''}
        ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}

        <h3>Service Interest</h3>
        <p><strong>Package:</strong> ${serviceNames[data.serviceInterest] || data.serviceInterest}</p>
        ${data.employerType ? `<p><strong>Employer Type:</strong> ${data.employerType}</p>` : ''}

        <h3>Home Internet & Setup</h3>
        ${data.homeIsp ? `<p><strong>Home ISP:</strong> ${data.homeIsp}</p>` : '<p><strong>Home ISP:</strong> Not provided</p>'}
        ${data.currentSetup ? `<p><strong>Current Setup:</strong> ${data.currentSetup}</p>` : ''}
        ${data.travelPlans ? `<p><strong>Travel Plans:</strong> ${data.travelPlans}</p>` : ''}
        ${data.notes ? `<p><strong>Additional Notes:</strong> ${data.notes}</p>` : ''}

        <hr>
        <p style="color: #666; font-size: 12px;">
          This consultation request has been saved to your database. Reply directly to schedule the call with ${data.name}.
        </p>
      `,
      replyTo: data.email,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send consultation notification:', error)
    return { success: false, error }
  }
}

export async function sendOrderConfirmation(data: {
  customerEmail: string
  customerName: string
  serviceName: string
  amount: number
  orderId: string
}) {
  try {
    // Send confirmation to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Order Confirmed: ${data.serviceName} - NomadVPN Pro`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #06b6d4;">Thank You for Your Order!</h1>

          <p>Hi ${data.customerName},</p>

          <p>Your order has been confirmed. Here are the details:</p>

          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Service:</strong> ${data.serviceName}</p>
            <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}</p>
          </div>

          <h2>What's Next?</h2>
          <p>I'll reach out within 24 hours to:</p>
          <ul>
            <li>Confirm your shipping address</li>
            <li>Schedule your setup walkthrough call</li>
            <li>Answer any questions you have</li>
          </ul>

          <p>If you have any immediate questions, reply to this email or call/text me at <strong>(213) 321-8300</strong>.</p>

          <p>Looking forward to helping you stay connected from anywhere!</p>

          <p>Best,<br>NomadVPN Pro</p>
        </div>
      `,
    })

    // Send notification to business owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `💰 New Order: ${data.serviceName} - $${(data.amount / 100).toFixed(2)}`,
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Customer:</strong> ${data.customerName}</p>
        <p><strong>Email:</strong> ${data.customerEmail}</p>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}</p>
        <p><strong>Order ID:</strong> ${data.orderId}</p>
        <hr>
        <p>Reply to reach the customer directly, or call/text them to schedule the setup call.</p>
      `,
      replyTo: data.customerEmail,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send order confirmation:', error)
    return { success: false, error }
  }
}
