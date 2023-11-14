import { CartItem } from '@/types/cart'

export default function MiniCartItem(props: CartItem) {
    return(<div className="">{props.displayName}</div>)
}