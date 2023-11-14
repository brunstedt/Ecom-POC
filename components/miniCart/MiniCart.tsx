'use client'
import { CartSession } from '@/types/cart'

type MiniCartProps = {
    cart?: Pick<CartSession, 'cart'>
}
export default function MiniCart(props: MiniCartProps) {
    if(!props.cart) {
        return null
    }
    console.log('cart', props.cart)
    return (<>MiniCart</>)
}