import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  message: string
}

interface EmailTemplateProps {
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  message: string
}

const AdminEmailTemplate = ({ name, email, company, phone, service, budget, message }: EmailTemplateProps) => (
  `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e293b; margin-bottom: 5px; display: block; }
    .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #cbd5e1; }
    .footer { background: #1e293b; color: #cbd5e1; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 New Contact Form Submission</h1>
    <p>A potential client has submitted a contact form on your website</p>
  </div>
  
  <div class="content">
    <div class="field">
      <span class="label">📝 Name:</span>
      <div class="value">${name}</div>
    </div>
    
    <div class="field">
      <span class="label">📧 Email:</span>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    
    ${company ? `
    <div class="field">
      <span class="label">🏢 Company:</span>
      <div class="value">${company}</div>
    </div>
    ` : ''}
    
    ${phone ? `
    <div class="field">
      <span class="label">📞 Phone:</span>
      <div class="value"><a href="tel:${phone}">${phone}</a></div>
    </div>
    ` : ''}
    
    <div class="field">
      <span class="label">🎯 Service Interest:</span>
      <div class="value">${service}</div>
    </div>
    
    ${budget ? `
    <div class="field">
      <span class="label">💰 Budget:</span>
      <div class="value">${budget}</div>
    </div>
    ` : ''}
    
    <div class="field">
      <span class="label">💬 Message:</span>
      <div class="value">${message}</div>
    </div>
  </div>
  
  <div class="footer">
    <p>This message was sent from your website's contact form.</p>
    <p>Please respond within 24 hours for the best client experience.</p>
  </div>
</body>
</html>
  `
)

const ConfirmationEmailTemplate = ({ name }: { name: string }) => (
  `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Us</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
    .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; }
    .footer { background: #1e293b; color: #cbd5e1; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; }
    .contact-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ Thank You for Reaching Out!</h1>
    <p>We've received your message and will be in touch soon</p>
  </div>
  
  <div class="content">
    <p>Hi ${name},</p>
    
    <p>Thank you for contacting us! We've successfully received your message and our team is already reviewing your inquiry.</p>
    
    <div class="highlight">
      <h3>⏰ What happens next?</h3>
      <ul>
        <li><strong>Within 2 hours:</strong> We'll send you a preliminary response acknowledging your specific needs</li>
        <li><strong>Within 24 hours:</strong> You'll receive a detailed response from our team with next steps</li>
        <li><strong>If urgent:</strong> Feel free to call us at (123) 456-7890</li>
      </ul>
    </div>
    
    <p>In the meantime, feel free to explore more about our services and recent work:</p>
    
    <div class="contact-info">
      <h3>📞 Contact Information</h3>
      <p><strong>Email:</strong> <a href="mailto:tony@cosmicjs.com">tony@cosmicjs.com</a></p>
      <p><strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a></p>
      <p><strong>Office Hours:</strong> Monday - Friday, 9AM - 6PM EST</p>
    </div>
    
    <p>We're excited about the possibility of working together and helping you achieve your business goals!</p>
    
    <p>Best regards,<br>
    <strong>The Professional Services Team</strong></p>
  </div>
  
  <div class="footer">
    <p>This is an automated confirmation. Please do not reply to this email.</p>
    <p>If you need immediate assistance, please call us at (123) 456-7890</p>
  </div>
</body>
</html>
  `
)

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service is not configured. Please contact us directly at tony@cosmicjs.com' 
        },
        { status: 500 }
      )
    }

    const body: ContactFormData = await request.json()
    const { name, email, company, phone, service, budget, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please fill in all required fields (Name, Email, Service, and Message)' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid email address' 
        },
        { status: 400 }
      )
    }

    // Format service name for display
    const serviceNames: { [key: string]: string } = {
      'web-development': 'Web Development',
      'digital-marketing': 'Digital Marketing', 
      'business-consulting': 'Business Consulting',
      'mobile-app-development': 'Mobile App Development',
      'brand-strategy': 'Brand Strategy',
      'e-commerce-solutions': 'E-commerce Solutions',
      'other': 'Other Services'
    }

    // Format budget for display
    const budgetNames: { [key: string]: string } = {
      'under-10k': 'Under $10,000',
      '10k-25k': '$10,000 - $25,000',
      '25k-50k': '$25,000 - $50,000', 
      '50k-100k': '$50,000 - $100,000',
      'over-100k': 'Over $100,000'
    }

    const formattedService = serviceNames[service] || service
    const formattedBudget = budget ? budgetNames[budget] || budget : ''

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Website Contact <tony@cosmicjs.com>',
      to: ['tony@cosmicjs.com'],
      subject: `🎯 New Contact Form Submission from ${name}`,
      html: AdminEmailTemplate({
        name,
        email,
        company,
        phone,
        service: formattedService,
        budget: formattedBudget,
        message
      }),
      replyTo: email,
    })

    if (adminEmailResult.error) {
      console.error('Failed to send admin email:', adminEmailResult.error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send notification. Please contact us directly at tony@cosmicjs.com' 
        },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const confirmationEmailResult = await resend.emails.send({
      from: 'Professional Services Team <tony@cosmicjs.com>',
      to: [email],
      subject: `✅ Thank you for contacting us, ${name}!`,
      html: ConfirmationEmailTemplate({ name }),
    })

    if (confirmationEmailResult.error) {
      console.error('Failed to send confirmation email:', confirmationEmailResult.error)
      // Still return success since the main notification was sent
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! Check your email for confirmation and we\'ll get back to you within 24 hours.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again or contact us directly at tony@cosmicjs.com' 
      },
      { status: 500 }
    )
  }
}