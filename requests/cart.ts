import type { CartSession } from '@/types/cart'

export async function addToCart({productId}: {productId: string}) {    
    const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({productId}),
    })

    return await response.json()
}

export async function getCart() {
    const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: {
            tags: ['cart']
        }
    })

    return await response.json()
}

export async function createCartSession() {
    const response = await fetch(`${process.env.BASE_URL}/api/cart-session`, {
        method: 'POST',
        cache: 'no-store',
    })

    const cart: CartSession = await response.json()

    return cart
}