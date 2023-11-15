import SignOutButton from '@/components/signoutButton/SignoutButton'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
    return (
        <div className="flex gap-6 flex-col justify-start">
            <h1 className="text-white font-bold text-3xl md:text-5xl mt-12">Top of minds GO</h1>
            <SignOutButton />
        </div>
    )
}
