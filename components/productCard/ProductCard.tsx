import type { Product } from '@/types/product'
import localeCurrency from '@/utils/currency'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const hasDiscount = product.discountAmount > 0

    return (
        <div className="flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full">
            <Link href={`/booking/${product.id}`} className="relative block h-40 w-full overflow-hidden">
                <Image src={product.imageUrl} fill alt={product.displayName} className="mx-auto object-contain hover:scale-105 transition-all duration-700 bg-white" />
            </Link>
            <div className="py-4 px-6 w-full border-t border-t-slate-100 bg-opacity-60 bg-black flex-grow justify-between flex flex-col text-white">
                <div className="mb-4">
                    <div className="font-bold">{product.displayName}</div>
                    <div>{product.displayDescription}</div>
                </div>

                <div className="flex flex-col">
                    {hasDiscount ? (
                        <>
                            <div className="line-through text-sm text-gray-300">{localeCurrency({amount: product.basePriceAmount})}</div>
                            <div className="font-bold text-xl text-red-400">{localeCurrency({amount: product.discountAmount})}</div>
                        </>
                    ) : <div className="font-bold text-xl text-red-400">{localeCurrency({amount: product.salePriceAmount})}</div>}
                </div>
            </div>
        </div>
    )
}