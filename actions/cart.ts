'use server'

import { addToCart, getCart, removeFromCart } from '@/requests/cart'
import { revalidateTag } from 'next/cache'

export async function addToCartAction({ productId, productVariantId, quantity, options }: { productId: string, productVariantId: string, quantity: number, options?: { RelatesTo: string } }) {
    try {
        const response = await addToCart({ productId, productVariantId, quantity, options })
        revalidateTag('cart')

        return response
    } catch (error) {
        return `There was an error adding the product to the cart ${error}`
    }
}

export async function getCartAction() {
    try {
        return await getCart()
    } catch (error) {
        return `There was an error getting the cart ${error}`
    }
}

export async function removeFromCartAction({ productId }: { productId: string }) {
    try {
        await removeFromCart({ productId })
        revalidateTag('cart')
    } catch (error) {
        return `There was an error removing the product from the cart ${error}`
    }
}