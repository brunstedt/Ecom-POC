import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { productHeaders } from './helpers'
import { getServerSession } from 'next-auth'
import type { Hotel, Items, ItemPrices } from '@/types/Hotel'

export async function getHotel({ parentId }: { parentId: string }): Promise<Hotel | undefined> {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/product/product-parents/${parentId}`, {
        method: 'GET',
        cache: 'no-store',
        headers: { ...productHeaders(session) },
    })

    return await response.json()
}

export async function getProductByParentId({ parentId }: { parentId: string }): Promise<Items | undefined> {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/product/product-parents/${parentId}/variants`, {
        method: 'GET',
        cache: 'no-store',
        headers: { ...productHeaders(session) },
    })

    const data = await response.json()
    return data.productVariants
}

export async function getItemPrice({ variantId }: { variantId: string }): Promise<ItemPrices | undefined> {
    const session = await getServerSession(authOptions)
    if (!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/price/store-groups/${process.env.BRINK_STORE_GROUP_ID}/product-variants/${variantId}/prices`, {
        method: 'GET',
        cache: 'no-store',
        headers: { ...productHeaders(session) },
    })

    const data = await response.json()
    return data.productVariantPrices
}