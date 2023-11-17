'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useSession } from 'next-auth/react'
import MiniCart from '../miniCart/MiniCart'
import { CartSessionsResponse } from '@/types/cart'

type HeaderProps = {
    cart?: CartSessionsResponse
}

export default function Header(props: HeaderProps) {
    const session = useSession()
    const pathName = usePathname()

    const isAuthenticated = session?.status === 'authenticated'

    const routes = [
        {
            name: 'Hem',
            path: '/',
        },
        {
            name: 'Boka',
            path: '/booking',
        },
    ]

    const isActivePath = (path: string) => {
        const mainPath = pathName.split('/')[1].replaceAll('/', '')
        return path.replaceAll('/', '') === mainPath
    }
    
    return (
        <header>
            <div className="w-full max-w-5xl px-4 flex justify-between mx-auto z-10 relative py-8">
                <nav className="flex gap-6 md:gap-8 flex-nowrap overflow-x-auto">
                    {routes.map((route) => (
                        <Link href={route.path} key={route.path} className={twMerge('text-white text-xl tracking-wider', isActivePath(route.path) && 'border-b border-b-white')}>
                            {route.name}
                        </Link>
                    ))}
                </nav>

                <div>
                    {isAuthenticated ? 
                        <div className="flex gap-6 items-start">
                            <MiniCart cart={props.cart} />
                        </div>
                        : <Link href="/login" className={twMerge('text-white text-xl tracking-wider', isActivePath('/login') && 'border-b border-b-white')}>Logga in</Link>
                    }
                </div>
            </div> 
        </header>
    )
}