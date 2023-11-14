'use client'
import { Cart } from '@/types/cart'
import Drawer from '@/components/drawer/Drawer'
import { useState } from 'react'
import Icon from '../icon/Icon'
import MiniCartItem from './MiniCartItem'

type MiniCartProps = {
    cart?: Cart
}
export default function MiniCart(props: MiniCartProps) {
    const [isOpen, setIsOpen] = useState(false)

    if(!props.cart) {
        return null
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="text-white flex gap-2 text-xl tracking-wider">
                <Icon name='shopping-cart' /> My reservation
            </button>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="My reserveation" backDrop>
                {props.cart?.items.length > 0 ? 
                    <>{props.cart.items.map(item => <MiniCartItem key={item.id} {...item} />)}</> : 
                    <div className="flex justify-center py-24 text-xl text-gray-700">No reservations made</div>}
            </Drawer>
        </>
    )
}