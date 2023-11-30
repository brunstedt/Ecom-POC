import type { Metadata } from 'next'

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
