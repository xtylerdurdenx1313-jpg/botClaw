import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'botClaw Trading Command Center',
  description: 'Professional Trading Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  )
}
