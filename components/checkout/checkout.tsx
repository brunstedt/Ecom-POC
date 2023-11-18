import { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'
import localeCurrency from '@/utils/currency'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
    product: Product
}

export default function CheckoutItem(props: CartItem) {

    const hasDiscount = props.discountAmount > 0

    return (
        <div className="flex flex-col w-full bg-white border-b border-gray-300 last:border-0 py-2">
            <div className="grow flex gap-4">
                <div className="relative h-46 w-56">
                    <Image src={props.imageUrl} fill alt={props.displayName} className="object-contain" />
                </div>
                <div className="w-full flex-grow justify-between flex flex-col rounded-b-md">
                    <div className="mb-4">
                        <div className="font-bold">{props.displayName}</div>
                        <div className="text-sm">{props.displayDescription}</div>
                    </div>

                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <div className="line-through text-gray-400 text-sm">{localeCurrency({amount: props.basePriceAmount})}</div>
                                <div className="font-bold">{localeCurrency({amount: props.salePriceAmount})}</div>
                            </>
                        ) : <div className="font-bold ">{localeCurrency({amount: props.salePriceAmount})}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}