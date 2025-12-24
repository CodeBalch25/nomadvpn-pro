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
  employerType?: string
  notes?: string
}) {
  const serviceNames: Record<string, string> = {
    essential: 'Essential Setup ($699)',
    premium: 'Premium + Support ($1,299)',
    remote: 'Remote VPN Access ($49/mo)',
  }

  const employerTypeNames: Record<string, string> = {
    employee: 'Employee (Remote / Hybrid)',
    freelance: 'Freelance / Self-Employed',
    consultant: 'Consultant / Contractor',
    other: 'Other',
  }

  const serviceName = serviceNames[data.serviceInterest] || data.serviceInterest
  const employerTypeName = data.employerType ? (employerTypeNames[data.employerType] || data.employerType) : null

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
                          ${data.homeIsp ? `
                          <tr>
                            <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Home ISP:</td>
                            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${data.homeIsp}</td>
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
