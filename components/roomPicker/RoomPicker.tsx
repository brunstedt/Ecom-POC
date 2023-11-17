import type { Item, ItemPrices } from '@/types/Hotel'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getItemPrice } from '@/requests/products'
import localeCurrency from '@/utils/currency'
import { addToCartAction } from '@/actions/cart'
import BookRoomButton from './BookRoomButton'
import Icon from '../icon/Icon'
import React, { useState } from 'react'
import RoomPickerActions from './RoomPickerActions'

type Props = {
  item: Item;
  additions?: { beverage: Item; prices?: ItemPrices }[];
};

export default async function RoomPicker(props: Props) {
    const sessionData = await getServerSession(authOptions)

    if (!sessionData) {
        redirect('/login?redirect=/booking')
    }

    const prices = await getItemPrice({ variantId: props.item.id })
    const currentPrice = prices?.find(
        (price) => price.productVariantId === props.item.id
    )


    if (!currentPrice) return <>No price found</>

    return (
        <div className="pb-8 px-2 flex gap-4 md:flex-row mt-4 flex-col-reverse">
            <div className="w-full md:w-1/2">
                <div className="relative block h-56 md:h-80 w-full mb-2">
                    <Image
                        src={props.item.imageUrl}
                        fill
                        alt={props.item.name}
                        objectFit="contain"
                    />
                </div>
                {props.item.displayDescriptions.SE}
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-6">
                <RoomPickerActions {...{currentPrice, ...props}}/>

                <div className="flex flex-col gap-2 pl-4">
                    <div className="flex gap-6">
                        {props.item.customAttributes.roomFor ? (
                            <div className="flex gap-2 items-center">
                                <Icon name="user" size="small" />{' '}
                                <div>
                  Rum för {props.item.customAttributes.roomFor} (
                                    {props.item.customAttributes.roomSize})
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {props.item.customAttributes.salesArgument1 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="tv" size="small" />{' '}
                            <div>{props.item.customAttributes.salesArgument1}</div>
                        </div>
                    ) : null}
                    {props.item.customAttributes.salesArgument2 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="check-circle" size="small" />{' '}
                            <div>{props.item.customAttributes.salesArgument2}</div>
                        </div>
                    ) : null}
                    {props.item.customAttributes.salesArgument3 ? (
                        <div className="flex gap-2 items-center">
                            <Icon name="check-circle" size="small" />{' '}
                            <div>{props.item.customAttributes.salesArgument3}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
