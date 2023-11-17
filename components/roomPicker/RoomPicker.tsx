import type { Room } from '@/types/Hotel'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getRoomPrice } from '@/requests/products'
import localeCurrency from '@/utils/currency'
import { addToCartAction } from '@/actions/cart'
import BookRoomButton from './BookRoomButton'
import Icon from '../icon/Icon'

export default async function RoomPicker(props: Room) {
    const sessionData = await getServerSession(authOptions)

    if(!sessionData) {
        redirect('/login?redirect=/booking')
    }

    const addToCartActionWithId = addToCartAction.bind(null, {productId: props.productParentId, quantity: 1, productVariantId: props.id})

    const prices = await getRoomPrice({variantId: props.id})
    const currentPrice = prices?.find((price) => price.productVariantId === props.id)
    if(!currentPrice) return <>No price found</>

    const hasDiscount = currentPrice.discountAmount > 0

    return (
        <div className="pb-8 px-2 flex gap-4 md:flex-row mt-4 flex-col-reverse">
            <div className="w-full md:w-1/2">
                <div className="relative block h-56 md:h-80 w-full mb-2">
                    <Image src={props.imageUrl} fill alt={props.name} objectFit='contain' />
                </div>
                {props.displayDescriptions.SE}
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-6">

                <div className="bg-white rounded-md shadow-md p-4 md:p-6 flex gap-4 justify-between">
                
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <div className="line-through text-sm">{localeCurrency({amount: currentPrice.basePriceAmount})}</div>
                                <div className="font-bold text-xl">{localeCurrency({amount: currentPrice.salePriceAmount})}</div>
                            </>
                        ) : <div className="font-bold text-xl ">{localeCurrency({amount: currentPrice.salePriceAmount})}</div>}
                    </div>

                    <form action={addToCartActionWithId}>
                        <BookRoomButton />
                    </form>
                </div>

                <div className="flex flex-col gap-2 pl-4">
                    <div className="flex gap-6">
                        {props.customAttributes.roomFor ? (
                            <div className="flex gap-2 items-center">
                                <Icon name="user" size='small' /> <div>Rum för {props.customAttributes.roomFor} ({props.customAttributes.roomSize})</div>
                            </div>) : null }
                    </div>
                    {props.customAttributes.salesArgument1 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="tv" size='small' /> <div>{props.customAttributes.salesArgument1}</div>
                        </div>) : null }
                    {props.customAttributes.salesArgument2 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="check-circle" size='small' /> <div>{props.customAttributes.salesArgument2}</div>
                        </div>) : null }
                    {props.customAttributes.salesArgument3 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="check-circle" size='small' /> <div>{props.customAttributes.salesArgument3}</div>
                        </div>) : null }
                </div>

            </div>
        </div>
    )
}