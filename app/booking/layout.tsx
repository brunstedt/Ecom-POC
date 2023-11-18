import type { Metadata } from 'next'
import Header from '@/components/header/Header'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Top of Minds Go BOS',
    description: 'Top of Minds Go BOS',
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="mx-auto max-w-5xl w-full">{children}</div>
    )
}
