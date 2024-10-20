import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'

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
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Toaster position="top-right" toastOptions={{
            className: 'bg-background text-foreground',
            style: {
              border: '1px solid var(--border)',
              padding: '16px',
              color: 'var(--foreground)',
            },
          }} />
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}