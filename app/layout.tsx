import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderWrapper from '@/components/header/HeaderWrapper'
import SessionProvider from './SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Top of minds GO BOS',
    description: 'Top of minds GO BOS',
}

export default async function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
            <SessionProvider session={session}>
                <body className={`${inter.className}`}>
                    <div className="min-h-screen relative h-full flex flex-col pb-24">
                        <HeaderWrapper />
                        <video autoPlay loop muted playsInline className="w-full h-full max-h-screen object-cover fixed">
                            <source src="/hero.mp4" type="video/mp4" />
                        </video>

                        <main className="z-10 relative mx-auto max-w-5xl px-4 w-full max-h-screen h-full flex grow justify-center">
                            {children}
                        </main>
                    </div>
                </body>
            </SessionProvider>
        </html>
    )
}
