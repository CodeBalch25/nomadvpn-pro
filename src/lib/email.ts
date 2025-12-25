import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use Resend's test address until domain is verified
// Change to 'NomadVPN Pro <hello@nomadvpn.pro>' after domain verification
const FROM_EMAIL = 'NomadVPN Pro <onboarding@resend.dev>'
// Using Gmail for testing until domain is verified in Resend
// Change back to: process.env.NOTIFY_EMAIL || 'timudai@outlook.com' after domain verification
const NOTIFY_EMAIL = 'timbalchtb@gmail.com'

export async function sendContactAutoReply(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  try {
    // Send auto-reply to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Thanks for reaching out, ${data.name.split(' ')[0]}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        NomadVPN Pro
                      </div>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <h1 style="color: #fafafa; font-size: 24px; font-weight: 600; margin: 0 0 20px; text-align: center;">
                        Message Received!
                      </h1>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Hi ${data.name.split(' ')[0]},
                      </p>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Thanks for reaching out! I've received your message and will get back to you within 24 hours.
                      </p>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Here's what NomadVPN Pro offers:
                      </p>

                      <!-- Features Box -->
                      <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #06b6d4; font-size: 16px;">&#10003;</span>
                              <span style="color: #fafafa; font-size: 14px; margin-left: 12px;">Secure VPN access through your home network</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #06b6d4; font-size: 16px;">&#10003;</span>
                              <span style="color: #fafafa; font-size: 14px; margin-left: 12px;">Pre-configured travel routers shipped to your door</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #06b6d4; font-size: 16px;">&#10003;</span>
                              <span style="color: #fafafa; font-size: 14px; margin-left: 12px;">Work remotely with reliable, consistent connectivity</span>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
                        Need faster help? Call or text me directly:
                      </p>

                      <p style="margin: 0 0 32px;">
                        <a href="tel:+12133218300" style="color: #06b6d4; font-size: 18px; font-weight: 600; text-decoration: none;">(213) 321-8300</a>
                      </p>

                      <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0;">
                        Talk soon,<br>
                        <span style="color: #fafafa; font-weight: 500;">NomadVPN Pro Team</span>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid #2a2a3e;">
                      <p style="color: #71717a; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                        NomadVPN Pro &bull; Secure Remote Work Solutions<br>
                        <a href="https://nomadvpn.pro" style="color: #06b6d4; text-decoration: none;">nomadvpn.pro</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    // Send notification to business owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `New Contact Request: ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50px; padding: 12px 24px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">New Contact Request</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 80px;">Name:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${data.name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Email:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;"><a href="mailto:${data.email}" style="color: #06b6d4; text-decoration: none;">${data.email}</a></td>
                          </tr>
                          ${data.phone ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Phone:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;"><a href="tel:${data.phone}" style="color: #06b6d4; text-decoration: none;">${data.phone}</a></td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>

                      <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 12px;">Message:</p>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;">
                        <p style="color: #fafafa; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
                      </div>

                      <p style="color: #71717a; font-size: 12px; margin: 24px 0 0; text-align: center;">
                        Reply directly to this email to respond to ${data.name.split(' ')[0]}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send contact emails:', error)
    return { success: false, error }
  }
}

export async function sendConsultationAutoReply(data: {
  name: string
  email: string
  phone?: string
  serviceInterest: string
  preferredDate?: Date | null
  timezone?: string
  homeIsp?: string
  hasMeshWifi?: string
  uploadSpeed?: string
  technicalComfort?: string
  employerType?: string
  notes?: string
}) {
  const serviceNames: Record<string, string> = {
    remote_vpn_access: 'Remote VPN Access ($35/mo + $149 setup)',
    easy_setup: 'Easy Setup ($699)',
    complex_setup: 'Complex Setup ($899)',
    premium_bundle: 'Premium Bundle ($1,499)',
    consultation: 'Consultation Request',
    // Legacy values for backwards compatibility
    essential: 'Easy Setup ($699)',
    premium: 'Premium Bundle ($1,499)',
    remote: 'Remote VPN Access ($35/mo)',
  }

  const ispNames: Record<string, string> = {
    xfinity: 'Xfinity/Comcast',
    spectrum: 'Spectrum',
    att_fiber: 'AT&T Fiber',
    verizon_fios: 'Verizon Fios',
    cox: 'Cox',
    google_fiber: 'Google Fiber',
    frontier_fiber: 'Frontier Fiber',
    centurylink: 'CenturyLink',
    optimum: 'Optimum/Altice',
    tmobile_5g: 'T-Mobile Home Internet',
    verizon_5g: 'Verizon 5G Home',
    starlink: 'Starlink',
    fixed_wireless: 'Fixed Wireless',
    other: 'Other',
  }

  const employerTypeNames: Record<string, string> = {
    employee: 'Employee (Remote / Hybrid)',
    freelance: 'Freelance / Self-Employed',
    consultant: 'Consultant / Contractor',
    other: 'Other',
  }

  const uploadSpeedNames: Record<string, string> = {
    under_10: 'Under 10 Mbps',
    '10_25': '10-25 Mbps',
    '25_100': '25-100 Mbps',
    over_100: 'Over 100 Mbps',
    unknown: 'Not sure',
  }

  const technicalComfortNames: Record<string, string> = {
    beginner: 'Beginner - Need full guidance',
    moderate: 'Intermediate - Can follow instructions',
    expert: 'Advanced - Manages own network',
  }

  // CGNAT ISPs that require Remote VPN Access tier
  const cgnatIsps = ['tmobile_5g', 'verizon_5g', 'starlink', 'fixed_wireless']

  const serviceName = serviceNames[data.serviceInterest] || data.serviceInterest
  const employerTypeName = data.employerType ? (employerTypeNames[data.employerType] || data.employerType) : null
  const ispName = data.homeIsp ? (ispNames[data.homeIsp] || data.homeIsp) : null
  const meshWifiStatus = data.hasMeshWifi === 'yes' ? 'Yes' : data.hasMeshWifi === 'no' ? 'No' : data.hasMeshWifi === 'unknown' ? 'Not sure' : null
  const uploadSpeedName = data.uploadSpeed ? (uploadSpeedNames[data.uploadSpeed] || data.uploadSpeed) : null
  const technicalComfortName = data.technicalComfort ? (technicalComfortNames[data.technicalComfort] || data.technicalComfort) : null
  const isCgnatCustomer = data.homeIsp ? cgnatIsps.includes(data.homeIsp) : false

  console.log('Sending consultation emails to:', data.email)
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)

  try {
    // Send auto-reply to customer
    const result1 = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Consultation Request Confirmed - NomadVPN Pro`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        NomadVPN Pro
                      </div>
                    </td>
                  </tr>

                  <!-- Success Badge -->
                  <tr>
                    <td style="padding: 0 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50px; padding: 12px 24px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">&#10003; Consultation Requested</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <h1 style="color: #fafafa; font-size: 24px; font-weight: 600; margin: 0 0 20px; text-align: center;">
                        You're All Set, ${data.name.split(' ')[0]}!
                      </h1>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Thanks for requesting a consultation! I'm excited to help you set up secure remote work access.
                      </p>

                      <!-- Request Summary -->
                      <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <h3 style="color: #8b5cf6; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">Your Request Summary</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 140px;">Service Interest:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${serviceName}</td>
                          </tr>
                          ${data.preferredDate ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Preferred Date:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>

                      <!-- What's Next -->
                      <h3 style="color: #fafafa; font-size: 16px; font-weight: 600; margin: 0 0 16px;">What Happens Next?</h3>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px;">
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">1</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">I'll Review Your Setup</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">I'll check your ISP and current setup for compatibility</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">2</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Schedule Our Call</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">I'll reach out within 24 hours to confirm a time</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">3</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Get You Set Up</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">We'll discuss your needs and get your VPN solution started</p>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
                        Can't wait? Call or text me now:
                      </p>

                      <p style="margin: 0 0 32px;">
                        <a href="tel:+12133218300" style="color: #06b6d4; font-size: 18px; font-weight: 600; text-decoration: none;">(213) 321-8300</a>
                      </p>

                      <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0;">
                        Looking forward to helping you work from anywhere,<br>
                        <span style="color: #fafafa; font-weight: 500;">NomadVPN Pro Team</span>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid #2a2a3e;">
                      <p style="color: #71717a; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                        NomadVPN Pro &bull; Secure Remote Work Solutions<br>
                        <a href="https://nomadvpn.pro" style="color: #06b6d4; text-decoration: none;">nomadvpn.pro</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('Customer auto-reply result:', result1)

    // Send notification to business owner
    const result2 = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject: `New Consultation Request: ${data.name} - ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50px; padding: 12px 24px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">New Consultation Request</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <!-- Contact Info -->
                      <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <h3 style="color: #06b6d4; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Name:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${data.name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Email:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;"><a href="mailto:${data.email}" style="color: #06b6d4; text-decoration: none;">${data.email}</a></td>
                          </tr>
                          ${data.phone ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Phone:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;"><a href="tel:${data.phone}" style="color: #06b6d4; text-decoration: none;">${data.phone}</a></td>
                          </tr>
                          ` : ''}
                          ${data.timezone ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Timezone:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${data.timezone}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>

                      ${isCgnatCustomer ? `
                      <!-- CGNAT Warning -->
                      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px 24px; margin: 0 0 24px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="width: 30px; vertical-align: top;">
                              <span style="color: #ef4444; font-size: 18px;">&#9888;</span>
                            </td>
                            <td>
                              <p style="color: #fca5a5; font-size: 14px; font-weight: 600; margin: 0 0 4px;">CGNAT Customer - Remote VPN Access Required</p>
                              <p style="color: #d4d4d8; font-size: 13px; margin: 0;">This ISP uses CGNAT. Customer cannot host their own VPN server - must use our infrastructure ($35/mo + $149 setup).</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                      ` : ''}

                      <!-- Setup Details (Technical Pre-Qual) -->
                      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <h3 style="color: #10b981; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">Setup Details</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          ${ispName ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Home ISP:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${ispName}${isCgnatCustomer ? ' <span style="color: #ef4444; font-weight: 600;">(CGNAT)</span>' : ''}</td>
                          </tr>
                          ` : ''}
                          ${meshWifiStatus ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Mesh WiFi:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${meshWifiStatus}${meshWifiStatus === 'Yes' ? ' <span style="color: #f59e0b;">(Double NAT likely)</span>' : ''}</td>
                          </tr>
                          ` : ''}
                          ${uploadSpeedName ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Upload Speed:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${uploadSpeedName}${data.uploadSpeed === 'under_10' ? ' <span style="color: #f59e0b;">(May need Remote VPN)</span>' : ''}</td>
                          </tr>
                          ` : ''}
                          ${technicalComfortName ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Tech Level:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${technicalComfortName}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>

                      <!-- Service Details -->
                      <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <h3 style="color: #8b5cf6; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">Service Details</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Service:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${serviceName}</td>
                          </tr>
                          ${data.preferredDate ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Preferred Date:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                          </tr>
                          ` : ''}
                          ${employerTypeName ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Employment:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${employerTypeName}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>

                      ${data.notes ? `
                      <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 12px;">Additional Notes:</p>
                      <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; margin: 0 0 24px;">
                        <p style="color: #fafafa; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.notes}</p>
                      </div>
                      ` : ''}

                      <p style="color: #71717a; font-size: 12px; margin: 0; text-align: center;">
                        Reply directly to this email to respond to ${data.name.split(' ')[0]}
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })
    console.log('Owner notification result:', result2)

    return { success: true }
  } catch (error) {
    console.error('Failed to send consultation emails:', error)
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
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(data.amount / 100)

  try {
    // Send confirmation to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.customerEmail,
      subject: `Order Confirmed - ${data.serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                        NomadVPN Pro
                      </div>
                    </td>
                  </tr>

                  <!-- Success Badge -->
                  <tr>
                    <td style="padding: 0 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50px; padding: 12px 24px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">&#10003; Payment Successful</span>
                      </div>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <h1 style="color: #fafafa; font-size: 24px; font-weight: 600; margin: 0 0 20px; text-align: center;">
                        Thank You, ${data.customerName.split(' ')[0]}!
                      </h1>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Your order has been confirmed and we're getting started on your VPN setup right away.
                      </p>

                      <!-- Order Summary -->
                      <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <h3 style="color: #8b5cf6; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Order ID:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500; text-align: right;">${data.orderId}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Service:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500; text-align: right;">${data.serviceName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; border-top: 1px solid #2a2a3e;">Total Paid:</td>
                            <td style="padding: 8px 0; color: #10b981; font-size: 18px; font-weight: 600; text-align: right; border-top: 1px solid #2a2a3e;">${formattedAmount}</td>
                          </tr>
                        </table>
                      </div>

                      <!-- Next Steps -->
                      <h3 style="color: #fafafa; font-size: 16px; font-weight: 600; margin: 0 0 16px;">What Happens Next?</h3>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px;">
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">1</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Router Configuration</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">I'll configure your routers with your specific settings</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">2</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Shipping</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">Your pre-configured routers will ship within 2-3 business days</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; vertical-align: top;">
                            <div style="display: inline-block; width: 28px; height: 28px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; text-align: center; line-height: 28px; color: #fff; font-size: 12px; font-weight: 600;">3</div>
                          </td>
                          <td style="padding: 12px 0 12px 16px; vertical-align: top;">
                            <p style="color: #fafafa; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Setup Call</p>
                            <p style="color: #d4d4d8; font-size: 13px; margin: 0;">I'll schedule a call to walk you through the simple plug-and-play setup</p>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #fafafa; font-size: 16px; line-height: 1.6; margin: 0 0 8px;">
                        Questions? Call or text me:
                      </p>

                      <p style="margin: 0 0 32px;">
                        <a href="tel:+12133218300" style="color: #06b6d4; font-size: 18px; font-weight: 600; text-decoration: none;">(213) 321-8300</a>
                      </p>

                      <p style="color: #d4d4d8; font-size: 14px; line-height: 1.6; margin: 0;">
                        Thanks for choosing NomadVPN Pro!<br>
                        <span style="color: #fafafa; font-weight: 500;">NomadVPN Pro Team</span>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid #2a2a3e;">
                      <p style="color: #71717a; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                        NomadVPN Pro &bull; Secure Remote Work Solutions<br>
                        <a href="https://nomadvpn.pro" style="color: #06b6d4; text-decoration: none;">nomadvpn.pro</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    // Send notification to owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: data.customerEmail,
      subject: `New Order: ${data.serviceName} - ${formattedAmount}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #111118 0%, #1a1a24 100%); border-radius: 16px; border: 1px solid #2a2a3e; overflow: hidden;">

                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50px; padding: 12px 24px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">New Order Received!</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 24px; margin: 0 0 24px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 100px;">Order ID:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${data.orderId}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Customer:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${data.customerName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Email:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${data.customerEmail}" style="color: #06b6d4; text-decoration: none;">${data.customerEmail}</a></td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Service:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px; font-weight: 500;">${data.serviceName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; border-top: 1px solid #2a2a3e;">Amount:</td>
                            <td style="padding: 8px 0; color: #10b981; font-size: 18px; font-weight: 600; border-top: 1px solid #2a2a3e;">${formattedAmount}</td>
                          </tr>
                        </table>
                      </div>

                      <p style="color: #71717a; font-size: 12px; margin: 0; text-align: center;">
                        Reply directly to this email to contact the customer
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send order confirmation emails:', error)
    return { success: false, error }
  }
}
