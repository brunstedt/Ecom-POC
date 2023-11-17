import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {cartHeaders} from './helpers'
import { CartItem } from '@/types/cart'

export async function getCheckout(): Promise<CartItem[]  | undefined> {

    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...cartHeaders(session)}
    })

    const cart = await response.json()

    return cart.cart
}