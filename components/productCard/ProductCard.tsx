import type { Product } from '@/types/product'
import localeCurrency from '@/utils/currency'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
    product: Product
}

/*

    COMPONENT NOT USED

*/

export default function ProductCard({product}: ProductCardProps) {
    const hasDiscount = product.discountAmount > 0

    return (
        <div className="flex flex-col shadow-xl hover:shadow-2xl duration-300 w-full bg-gradient-to-t from-[rgba(255,255,255,.75)] via-white to-white rounded-md md:hover:scale-105 transition-all duration-400">
            <Link href={`/booking/${product.id}`} className="grow flex flex-col">
                <div className="relative block h-40 w-full overflow-hidden">
                    <Image src={product.imageUrl} fill alt={product.displayName} className="mx-auto object-contain bg-white rounded-t-md" />
                </div>
                <div className="py-4 px-6 w-full flex-grow justify-between flex flex-col rounded-b-md">
                    <div className="mb-4">
                        <div className="font-bold">{product.displayName}</div>
                    </div>

                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <div className="line-through text-sm">{localeCurrency({amount: product.basePriceAmount})}</div>
                                <div className="font-bold text-xl text-red-600">{localeCurrency({amount: product.discountAmount})}</div>
                            </>
                        ) : <div className="font-bold text-xl text-red-600">{localeCurrency({amount: product.salePriceAmount})}</div>}
                    </div>
                </div>
            </Link>
        </div>
    )
}