import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'CV Builder SA | Create Your Professional CV in Minutes',
  description: 'Build a professional, ATS-friendly CV for the South African job market. Our AI-powered CV builder helps you create standout resumes that get noticed by employers.',
  keywords: ['CV builder', 'resume builder', 'South Africa jobs', 'ATS-friendly CV', 'professional CV'],
  authors: [{ name: 'CV Builder SA' }],
  openGraph: {
    title: 'CV Builder SA | Create Your Professional CV in Minutes',
    description: 'Build a professional, ATS-friendly CV for the South African job market.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
