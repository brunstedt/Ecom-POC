import CheckoutItem from '@/components/checkout/checkout';
import {createCheckoutSession, createIngridWidget, getCheckout} from '@/requests/checkout';
import { CartItem } from '@/types/cart';

export default async function Checkout() {
    const checkoutSession = await createCheckoutSession()
    const checkoutData = await getCheckout(checkoutSession);
    const ingridMarkup = await createIngridWidget(checkoutSession);7

    return (
        <div>
            {checkoutData?.items.map((item: CartItem)=> <CheckoutItem key={item.id} {...item}/>)}
            <div>SHIPPING {checkoutData?.capabilities?.shippingProvider.name ?? 'No Shipping'} </div>
            <div dangerouslySetInnerHTML={ingridMarkup}></div>
            <div>PAYMENTS {checkoutData?.capabilities?.paymentProvider.name ?? 'No Payment'} </div>
        </div>
    )
}