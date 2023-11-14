import { addToCartAction } from '@/app/actions/cart'
import localeCurrency from '@/utils/currency'
import Image from 'next/image'
import { getProduct } from '@/requests/products'

type BookItemProps = {
    params: { id: string }
}

export default async function BookItem({params}: BookItemProps) {
    const id = params.id[0]
    const product = await getProduct(id)

    if (!product) {
        return <pre>Product not found: {params.id}</pre>
    }

    const hasDiscount = product.discountAmount > 0

    const addToCartActionWithId = addToCartAction.bind(null, {productId: product.id})

    return (
        <div className="flex flex-col gap-2 bg-gradient-to-t from-[rgba(255,255,255,.75)] via-white to-white p-6 rounded-md">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0">
                <div className="relative block h-44 md:h-64 w-full md:w-1/2">
                    <Image src={product.imageUrl} fill alt={product.displayName} className="object-contain" />
                </div>
                <div className='md:pl-6 w-full md:w-1/2 flex flex-col gap-4 '>
                    <div className="md:text-3xl text-xl tracking-wider">{product.displayName}</div>
                    <div className="md:text-lg font-semibold">{product.displayDescription}</div>
                    <div className="flex gap-8 items-center mt-4">
                        {hasDiscount ? (
                            <div>
                                <div className="line-through text-sm">{localeCurrency({amount: product.basePriceAmount})}</div>
                                <div className="font-bold text-xl text-red-400">{localeCurrency({amount: product.discountAmount})}</div>
                            </div>
                        ) : <div className="font-bold text-xl">{localeCurrency({amount: product.salePriceAmount})}</div>}
                        <form action={addToCartActionWithId}>
                            <button className="py-3 px-4 text-white bg-pink-500 font-bold rounded hover:bg-pink-600 tracking-wide" type="submit">Book now</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-4">{product.description}</div>
        </div>
    )
}