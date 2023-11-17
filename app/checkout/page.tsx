import CheckoutItem from '@/components/checkout/checkout';
import {createCheckoutSession, getCheckout} from '@/requests/checkout';
import { CartItem } from '@/types/cart';

export default async function Checkout() {
    const checkoutSession = await createCheckoutSession()
const checkoutData = await getCheckout();

    return (
        <div>
            {checkoutSession?.items.map((item: CartItem)=> <CheckoutItem key={item.id} {...item}/>)}
            <div>SHIPPING {checkoutSession?.capabilities?.shippingProvider.name ?? 'No Shipping'} </div>
            <div>PAYMENTS {checkoutSession?.capabilities?.paymentProvider.name ?? 'No Payment'} </div>
        </div>
    )
}