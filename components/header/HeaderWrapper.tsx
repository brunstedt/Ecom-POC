import { createCartSession } from '@/requests/cart'
import Header from './Header'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function HeaderWrapper() {
    const session = await getServerSession(authOptions)
    const {cart} = await createCartSession(session)
    return (<Header cart={cart} />)
}