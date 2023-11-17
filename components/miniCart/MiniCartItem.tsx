import { removeFromCartAction } from '@/actions/cart'
import { CartItem } from '@/types/cart'
import Image from 'next/image'
import RemoveFromCartButton from './RemoveFromCart'
import localeCurrency from '@/utils/currency'


export default function MiniCartItem(props: CartItem) {
    const hasDiscount = props.discountAmount > 0
    const actionWithId = removeFromCartAction.bind(null, {productId: props.id})
    return(
        <div className="flex px-6 py-3 first:mt-3 border-b gap-4 justify-between items-center">
            <div className='flex gap-4'>
                <div className="flex-[0_0_33%] relative aspect-[9/13] inline-flex justify-center items-center">
                    <Image className='object-center object-contain max-w-full max-h-full' src={props.imageUrl} alt={props.displayName} width={900} height={1300} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-semibold text-sm">{props.quantity} x {props.displayName}</div>
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <div className="line-through text-xs">{localeCurrency({amount: props.basePriceAmount})}</div>
                                <div className="font-bold">{localeCurrency({amount: props.salePriceAmount})}</div>
                            </>
                        ) : <div className="font-bold">{localeCurrency({amount: props.salePriceAmount})}</div>}
                    </div>
                </div>
            </div>
            <form action={actionWithId}>
                <RemoveFromCartButton />
            </form>
        </div>
    )
}