'use server'

import { addToCart } from '@/requests/cart'
import {revalidateTag} from 'next/cache'

export async function addToCartAction({productId, productVariantId, quantity}: {productId: string, productVariantId: string, quantity: number}) {
    try {
        await addToCart({productId, productVariantId, quantity})
        revalidateTag('cart')
    } catch(error) {
        return `There was an error adding the product to the cart ${error}`
    }
}   