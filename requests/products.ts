import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { productHeaders } from './helpers'
import { getServerSession } from 'next-auth'
import { Hotel, RoomPrices, Rooms } from '@/types/Hotel'

export async function getHotel({parentId}: {parentId: string}): Promise<Hotel | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/product/product-parents/${parentId}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...productHeaders(session)},
    })

    return await response.json()
}

export async function getRooms({parentId}: {parentId: string}): Promise<Rooms | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/product/product-parents/${parentId}/variants`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...productHeaders(session)},
    })

    const data = await response.json()
    return data.productVariants
}

export async function getRoomPrice({variantId}: {variantId: string}): Promise<RoomPrices | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_MANAGEMENT_URL}/price/store-groups/${process.env.BRINK_STORE_GROUP_ID}/product-variants/${variantId}/prices`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...productHeaders(session)},
    })

    const data = await response.json()
    return data.productVariantPrices
}