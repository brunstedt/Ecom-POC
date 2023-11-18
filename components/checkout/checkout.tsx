import { CartItem } from '@/types/cart'
import localeCurrency from '@/utils/currency'
import Image from 'next/image'
import {
    CheckoutItem,
    type CheckoutItem as CheckoutItemType,
} from '@/types/checkout'

type CheckoutItemProps = {
  item: CheckoutItemType;
  additions?: CheckoutItemType[];
};

export default function CheckoutItem(props: CheckoutItemProps) {
    const hasDiscount = props.item.discountAmount > 0
    const additionalPrice =
    props.additions?.reduce(
        (prev, curr) => (prev += curr.basePriceAmount),
        0
    ) || 0

    return (
        <div className="flex flex-col w-full bg-white border-b border-gray-300 last:border-0 py-2">
            <div className="grow flex gap-4">
                <div className="relative h-46 w-56">
                    <Image
                        src={props.item.imageUrl}
                        fill
                        alt={props.item.displayName}
                        className="object-contain"
                    />
                </div>
                <div className="w-full flex-grow justify-between flex flex-col rounded-b-md">
                    <div className="mb-4">
                        <div className="font-bold">{props.item.displayName}</div>
                        <div className="text-sm">{props.item.displayDescription}</div>
                    </div>

                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                {props.additions &&
                  props.additions.length > 0 &&
                  props.additions.map((item, index) => (
                      <div
                          key={`addition-${index}`}
                          className="text-sm font-bold text-pink-500"
                      >{`+ ${item.quantity} x ${item.displayName}`}</div>
                  ))}
                                <div className="line-through text-gray-400 text-sm">
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
                            <div className="font-bold ">
                                {localeCurrency({
                                    amount: props.item.salePriceAmount + additionalPrice,
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
