import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Professional Services - Expert Solutions for Your Business',
  description: 'Leading provider of web development, digital marketing, and business consulting services. We help businesses thrive in the digital age with innovative solutions.',
  keywords: 'web development, digital marketing, business consulting, professional services',
  authors: [{ name: 'Professional Services Team' }],
  openGraph: {
    title: 'Professional Services - Expert Solutions for Your Business',
    description: 'Leading provider of web development, digital marketing, and business consulting services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}