import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'Manage your school with ease',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/static/ii.jpeg" />
      </head>
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Toaster position="top-right" toastOptions={{
            className: 'bg-background text-foreground',
            style: {
              border: '1px solid var(--border)',
              padding: '16px',
              color: 'var(--foreground)',
            },
          }} />
          <TooltipProvider>
            {children}
          </TooltipProvider>
          </main>
        </div>
      </body>
    </html>
  )
}