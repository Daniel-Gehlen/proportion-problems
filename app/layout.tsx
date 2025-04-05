import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'proportion problems App',
  description: 'Next',
  generator: 'danielgehlen.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
