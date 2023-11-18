import CheckoutItem from '@/components/checkout/checkout'
import {createCheckoutSession, createIngridWidget, getCheckout} from '@/requests/checkout'

export default async function Checkout() {
    const checkoutSession = await createCheckoutSession()
    const checkoutData = await getCheckout(checkoutSession)
    const ingridMarkup = await createIngridWidget(checkoutSession)
    if(!checkoutData) {return null}

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
                {regularItems.map((item)=> <CheckoutItem                                  
                    key={item.id}
                    {...{
                        item,
                        additions: additionItems?.filter(
                            (additionItem) => additionItem.options.RelatesTo === item.id
                        ),
                    }}/>)}
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Leverans</h2>
                {checkoutData?.checkout.capabilities?.shippingProvider.name ?? 'No Shipping'}
                <div dangerouslySetInnerHTML={ingridMarkup}></div>
            </div>
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Betalning</h2>
                {checkoutData?.checkout.capabilities?.paymentProvider.name ?? 'No Payment'}
            </div>
        </div>
    )
}