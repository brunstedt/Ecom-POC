import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {cartHeaders} from './helpers'
import { Cart, CartSession } from '@/types/cart'

export async function getCheckout(): Promise<Cart  | undefined> {

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

export async function createCheckoutSession(): Promise<any | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/checkout/start`, {
        method: 'POST',
        headers: {...cartHeaders(session)},
        body: JSON.stringify({
            shippingProvider: {
                name: 'Ingrid',
                id: 'brink_ingrid_test'
              },
              paymentProvider: {
                name: 'KlarnaCheckout',
                id: '39494421-a9b3-47a1-b1f7-a66fce93c840'              }
        })
    })

    const cart = await response.json()

    return cart.checkout
}