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
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏢</text></svg>",
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