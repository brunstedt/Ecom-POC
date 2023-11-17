import CheckoutItem from '@/components/checkout/checkout';
import {getCheckout} from '@/requests/checkout';

export default async function Checkout() {
const checkoutData = await getCheckout();

    return (
        <div>
            {checkoutData.items.map((item: any)=> <CheckoutItem key={item.id} {...item}/>)}
        </div>
    )
}