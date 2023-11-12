'use server'

import { addToCart } from '@/requests/cart'
import {revalidateTag} from 'next/cache'

export async function addToCartAction({productId}: {productId: string}) {
    try {
        addToCart({productId})
    } catch(error) {
        return `There was an error adding the product to the cart ${error}`
    }
}