import CheckoutItem from '@/components/checkout/checkout'
import IngridDelivery from '@/components/checkout/delivery'
import KlarnaPayment from '@/components/checkout/payment'
import {
    createCheckoutSession,
    createIngridWidget,
    getCheckout,
    createKlarnaOrder,
} from '@/requests/checkout'
import { redirect } from 'next/navigation'

export default async function Checkout() {
    const checkoutSession = await createCheckoutSession()

    if (!checkoutSession) {
        redirect('/login?redirect=/booking')
    }

    const checkoutData = await getCheckout(checkoutSession)

    if (!checkoutData) {return null}

    const [ingridMarkup, klarnaMarkup] = await Promise.all([
        createIngridWidget(checkoutSession, '11240'),
        createKlarnaOrder(checkoutSession)
    ])

    const regularItems = checkoutData.checkout.items.filter(
        (item) => !item.options.RelatesTo
    )

    const additionItems = checkoutData.checkout.items.filter(
        (item) => !!item.options.RelatesTo
    )

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Bokning</h2>
                {regularItems.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        {...{
                            item,
                            additions: additionItems?.filter(
                                (additionItem) => additionItem.options.RelatesTo === item.id
                            ),
                        }}
                    />
                ))}
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Leverans</h2>
                {checkoutData?.checkout.capabilities?.shippingProvider.name ?? 'No Shipping'}
                <IngridDelivery checkoutSession={checkoutSession} markup={ingridMarkup}/>
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Betalning</h2>
                {checkoutData?.checkout.capabilities?.paymentProvider.name ?? 'No Payment'}
                <KlarnaPayment checkoutSession={checkoutSession} klarnaMarkup={klarnaMarkup}/>
            </div>
        </div>
    )
}