'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {twMerge} from 'tailwind-merge'

export default function Header() {
    const pathName = usePathname()

    const routes = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Booking',
            path: '/booking',
        },
    ]

    const isActivePath = (path: string) => {
        const mainPath = pathName.split('/')[1].replaceAll('/', '')
        return path.replaceAll('/', '') === mainPath
    }
    
    return (
        <header>
            <div className="w-full max-w-5xl px-4 flex flex-col justify-between mx-auto z-10 relative py-8">
                <nav className="flex gap-8">
                    {routes.map((route) => (
                        <Link href={route.path} key={route.path} className={twMerge('text-white text-xl tracking-wider', isActivePath(route.path) && 'border-b border-b-white')}>
                            {route.name}
                        </Link>
                    ))}
                </nav>

            </div> 
        </header>
    )
}