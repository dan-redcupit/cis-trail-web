import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The CIS Trail',
  description: 'An Oregon Trail-style game for IT and Security professionals surviving the treacherous journey to CIS V8 IG1 & IG2 compliance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4">
        <main className="max-w-4xl w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
