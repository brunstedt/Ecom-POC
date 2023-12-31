'use client'
import { addToCartAction } from '@/actions/cart'
import type { Item, ItemPrice, ItemPrices } from '@/types/Hotel'
import localeCurrency from '@/utils/currency'
import React, { useState } from 'react'
import BookRoomButton from './BookRoomButton'
import { Cart } from '@/types/cart'

type Props = {
  currentPrice: ItemPrice;
  item: Item;
  additions?: { beverage: Item; prices?: ItemPrices }[];
};

const isCart = (
    response: { cart: Cart } | string | undefined
): response is { cart: Cart } =>
    typeof response === 'object' && Object.hasOwn(response, 'cart')

export default function RoomPickerActions(props: Props) {
    // STATE
    const [additions, setAdditions] = useState<string[]>([])

    // HANDLERS
    const addOrRemoveAddition = (id: string) => {
        setAdditions((prev) => {
            const newArr = [...prev]
            const index = newArr.findIndex((itemId) => itemId === id)
            if (index > -1) {
                newArr.splice(index, 1)
            } else {
                newArr.push(id)
            }

            return newArr
        })
    }

    const addToCartActionWithId = async () => {
        const response = await addToCartAction({
            productId: props.item.productParentId,
            quantity: 1,
            productVariantId: props.item.id,
        })

        if (!isCart(response)) {
            return
        }

        await Promise.all([
            props.additions
                ?.filter((addition) => additions.includes(addition.beverage.id))
                .map((filteredAddition) =>
                    addToCartAction({
                        productId: filteredAddition.beverage.id,
                        quantity: 1,
                        productVariantId: filteredAddition.beverage.id,
                        options: {
                            RelatesTo: response.cart.items[response.cart.items.length - 1].id,
                        },
                    })
                ),
        ])
    }

    const hasDiscount = props.currentPrice.discountAmount > 0

    return (
        <div className="bg-white rounded-md shadow-md p-4 md:p-6 flex gap-4 justify-between">
            <div className="flex flex-col">
                {hasDiscount ? (
                    <>
                        <div className="line-through text-sm">
                            {localeCurrency({ amount: props.currentPrice.basePriceAmount })}
                        </div>
                        <div className="font-bold text-xl">
                            {localeCurrency({ amount: props.currentPrice.salePriceAmount })}
                        </div>
                    </>
                ) : (
                    <div className="font-bold text-xl ">
                        {localeCurrency({ amount: props.currentPrice.salePriceAmount })}
                    </div>
                )}
                {props.additions?.map((addition, index) => (
                    <React.Fragment key={`addition-${index}`}>
                        {addition.prices?.map((price, priceIndex) => (
                            <div
                                key={`addition-${priceIndex}`}
                                className="inline-flex items-center gap-3 text-sm"
                            >
                                <div className="relative inline-flex justify-center items-center w-[20px] h-[20px] border border-solid border-black rounded-sm">
                                    <input
                                        className="opacity-0 cursor-pointer"
                                        type="checkbox"
                                        onChange={() => addOrRemoveAddition(addition.beverage.id)}
                                        checked={additions.includes(addition.beverage.id)}
                                    />
                                    <span
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[12px] border-b-[2px] border-r-[2px] border-solid border-black rotate-45 pointer-events-none ${
                                            !additions.includes(addition.beverage.id) ? 'hidden' : ''
                                        }`}
                                    ></span>
                                </div>
                                <span className="font-bold">{`+${localeCurrency({
                                    amount: price.basePriceAmount,
                                })}`}</span>
                                <span>{addition.beverage.displayNames.SE}</span>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <form action={addToCartActionWithId}>
                <BookRoomButton />
            </form>
        </div>
    )
}
