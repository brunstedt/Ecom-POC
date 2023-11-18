import CheckoutItem from '@/components/checkout/checkout'
import {createCheckoutSession, createIngridWidget, getCheckout} from '@/requests/checkout'
import { CartItem } from '@/types/cart'

export default async function Checkout() {
    const checkoutSession = await createCheckoutSession()
    const checkoutData = await getCheckout(checkoutSession)
    const ingridMarkup = await createIngridWidget(checkoutSession)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Bokning</h2>
                {checkoutData?.items.map((item: CartItem)=> <CheckoutItem key={item.id} {...item}/>)}
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Leverans</h2>
                {checkoutData?.capabilities?.shippingProvider.name ?? 'No Shipping'}
                <div dangerouslySetInnerHTML={ingridMarkup}></div>
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Betalning</h2>
                {checkoutData?.capabilities?.paymentProvider.name ?? 'No Payment'}
            </div>
        </div>
    )
}