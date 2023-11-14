import type { CartSession, CartSessionsResponse } from '@/types/cart'
import {authHeaders} from './helpers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function addToCart({productId, quantity, productVariantId}: {productId: string, quantity: number, productVariantId: string}) {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/items`, {
        method: 'POST',
        cache: 'no-store',
        headers: {...authHeaders(session)},
        body: JSON.stringify({
            quantity,
            productVariantId
        }),
    })

    return await response.json()
}

export async function removeFromCart({productId}: {productId: string}) {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/items/${productId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {...authHeaders(session)},
    })

    return await response.json()
}

export async function getCart(): Promise<CartSessionsResponse  | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...authHeaders(session)},
        next: {
            tags: ['cart']
        }
    })

    const cart = await response.json()

    return cart
}

export async function createCartSession(session: any): Promise<CartSession> {
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/start`, {
        method: 'POST',
        headers: {...authHeaders(session)},
        body: JSON.stringify({
            storeGroupId: process.env.BRINK_STORE_GROUP_ID,
            countryCode: process.env.BRINK_COUNTRY_CODE,
            languageCode: process.env.BRINK_LANGUAGE_CODE,
        })
    })

    const cart = await response.json()

    return cart
}