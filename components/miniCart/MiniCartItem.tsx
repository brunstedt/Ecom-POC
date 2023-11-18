import { removeFromCartAction } from '@/actions/cart'
import { CartItem } from '@/types/cart'
import Image from 'next/image'
import RemoveFromCartButton from './RemoveFromCart'
import localeCurrency from '@/utils/currency'
import { useCallback } from 'react'

type Props = {
  item: CartItem;
  additions?: CartItem[];
};

export default function MiniCartItem(props: Props) {
    // HANDLERS
    const handleRemoveFromCart = useCallback(async () => {
        await Promise.all([
            removeFromCartAction({
                productId: props.item.id,
            }),
            ...(props.additions
                ? props.additions.map((addition) =>
                    removeFromCartAction({
                        productId: addition.id,
                    })
                )
                : []),
        ])
    }, [props])

    const hasDiscount = props.item.discountAmount > 0

    const additionalPrice =
    props.additions?.reduce(
        (prev, curr) => (prev += curr.basePriceAmount),
        0
    ) || 0

    return (
        <div className="flex px-6 py-3 first:mt-3 border-b gap-4 justify-between items-center">
            <div className="flex gap-4">
                <div className="relative w-14 h-14">
                    <Image
                        src={props.item.imageUrl}
                        alt={props.item.displayName}
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="font-semibold text-sm">
                        {props.item.quantity} x {props.item.displayName}
                    </div>
                    {props.additions &&
            props.additions.length > 0 &&
            props.additions.map((item, index) => (
                <div
                    key={`addition-${index}`}
                    className="text-sm text-pink-500"
                >{`+ ${item.quantity} x ${item.displayName}`}</div>
            ))}
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <div className="line-through text-xs">
                                    {localeCurrency({
                                        amount: props.item.basePriceAmount + additionalPrice,
                                    })}
                                </div>
                                <div className="font-bold">
                                    {localeCurrency({
                                        amount: props.item.salePriceAmount + additionalPrice,
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="font-bold">
                                {localeCurrency({
                                    amount: props.item.salePriceAmount + additionalPrice,
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <form action={handleRemoveFromCart}>
                <RemoveFromCartButton />
            </form>
        </div>
    )
}
