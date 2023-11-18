import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {cartHeaders, checkoutHeaders} from './helpers'
import { Cart, CartSessionsResponse } from '@/types/cart'
import { CheckoutSessionResponse } from '@/types/checkout'

export async function getCheckout(checkoutToken?: string): Promise<CheckoutSessionResponse  | undefined> {

    if(!checkoutToken) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/checkout`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...checkoutHeaders(checkoutToken)}
    })

    const cart = await response.json()

    return cart
}

export async function createCheckoutSession(): Promise<string | undefined> {
    const session = await getServerSession(authOptions)
    if(!session) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/checkout/start`, {
        method: 'POST',
        headers: {...cartHeaders(session)},
        body: JSON.stringify({
            shippingProvider: {
                name: 'Ingrid',
                id: 'brink_ingrid_test'
            },
            paymentProvider: {
                name: 'KlarnaCheckout',
                id: '39494421-a9b3-47a1-b1f7-a66fce93c840'              
            }
        })
    })

    const cart = await response.json()

    return cart.token
}

export async function createIngridWidget(checkoutToken?: string): Promise<any | undefined> {
    if(!checkoutToken) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper-ingrid/sessions/create`, {
        method: 'POST',
        headers: {...checkoutHeaders(checkoutToken)},
        body: JSON.stringify({
            'ingrid': {
                'locales': [
                    'sv-SE'
                ],
                'postalCode': '16935',
                'search_address': {
                    'address_lines': [
                        'Idrottsgatan'
                    ],
                    'postal_code': '16935'
                }
            }
        })
    })

    const ingrid = await response.json()

    return  { __html: ingrid.htmlSnippet }
}