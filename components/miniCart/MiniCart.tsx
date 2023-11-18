'use client'
import { CartSessionsResponse } from '@/types/cart'
import Drawer from '@/components/drawer/Drawer'
import { useState } from 'react'
import Icon from '../icon/Icon'
import MiniCartItem from './MiniCartItem'
import Link from 'next/link'
import localeCurrency from '@/utils/currency'
import { twMerge } from 'tailwind-merge'

type MiniCartProps = {
  cart?: CartSessionsResponse;
};
export default function MiniCart({ cart }: MiniCartProps) {
    const [isOpen, setIsOpen] = useState(false)

    if (!cart) {
        return null
    }

    
    const regularItems = cart.cart.items.filter(
        (item) => !item.options.RelatesTo
    )

    const additionItems = cart.cart.items.filter(
        (item) => !!item.options.RelatesTo
    )

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white flex items-center gap-3 text-xl tracking-wider border-white border rounded-full px-4 py-1 md:-mb-2 md:mt-0 -mt-1 hover:bg-white hover:bg-opacity-20"
            >
                <Icon name="shopping-cart" size="small" />
                    Bokning
                {regularItems.length > 0 ? (
                    <div className="text-sm bg-pink-500 w-6 font-bold flex items-center justify-center h-6 rounded-full">
                        {regularItems.length}
                    </div>
                ) : null}
            </button>

            <Drawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Min bokning"
                backDrop
            >
                <div className="flex grow flex-col overflow-y-auto">
                    {regularItems.length > 0 ? (
                        <div className="">
                            {regularItems.map((item) => (
                                <MiniCartItem
                                    key={item.id}
                                    {...{
                                        item,
                                        additions: additionItems?.filter(
                                            (additionItem) => additionItem.options.RelatesTo === item.id
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center py-24 text-xl text-gray-700">
              Inga bokningar gjorda
                        </div>
                    )}
                </div>
                <div className="border-t-base-80 flex flex-col gap-3 border-t px-6 py-6 shadow-2xl justify-between">
                    <div>
                        {cart.cart.totals.discountTotal > 0 ? (
                            <>
                                <div className="font-semibold text-sm line-through">
                                    {localeCurrency({ amount: cart.cart.totals.subTotal })}
                                </div>
                                <div className="text-red-600 text-sm font-semibold mb-2">
                  Rabatt: -
                                    {localeCurrency({ amount: cart.cart.totals.discountTotal })}
                                </div>
                                <div className="font-semibold text-lg">
                  Totalt:{' '}
                                    {localeCurrency({ amount: cart.cart.totals.grandTotal })}
                                </div>
                            </>
                        ) : null}
                    </div>
                    <Link
                        className={twMerge(
                            'py-3 px-4 text-center text-white bg-pink-500 font-bold rounded hover:bg-pink-600 tracking-wide',
                            cart.cart.items.length <= 0 && 'bg-gray-300 pointer-events-none'
                        )}
                        onClick={() => setIsOpen(false)}
                        href="/checkout"
                    >
            Bekräfta bokning
                    </Link>
                </div>
            </Drawer>
        </>
    )
}
