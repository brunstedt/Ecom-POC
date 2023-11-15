import { removeFromCartAction } from '@/actions/cart'
import { CartItem } from '@/types/cart'
import Image from 'next/image'
import RemoveFromCartButton from './RemoveFromCart'


export default function MiniCartItem(props: CartItem) {
    const actionWithId = removeFromCartAction.bind(null, {productId: props.id})
    return(
        <div className="flex px-6 py-3 first:mt-3 border-b gap-4 justify-between items-center">
            <div className='flex gap-4'>
                <Image src={props.imageUrl} alt={props.displayName} width={90} height={60} />
                <div className="font-semibold text-sm">{props.quantity} x {props.displayName}</div>
            </div>
            <form action={actionWithId}>
                <RemoveFromCartButton />
            </form>
        </div>
    )
}