import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {cartHeaders, checkoutHeaders} from './helpers'
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

export async function createIngridWidget(checkoutToken: string, postalCode: string): Promise<any | undefined> {
    if(!checkoutToken) { return }
 
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper-ingrid/sessions/create`, {
        method: 'POST',
        headers: {...checkoutHeaders(checkoutToken)},
        body: JSON.stringify({
            ingrid: {
                locales: [
                    'sv-SE'
                ],
                postalCode: postalCode,
            }
        })
    })

    const ingrid = await response.json()

    return  ingrid.htmlSnippet
}

const BRINK_SHOPPER_URL='https://shopper.eu-west-1.playground1.brinkcommerce.io'

export async function syncIngridSession(checkoutToken: string): Promise<any | undefined> {
    if(!checkoutToken) { return }
 
    const response = await fetch(`${BRINK_SHOPPER_URL}/shopper-ingrid/sessions/sync`, {
        method: 'POST',
        headers: {...checkoutHeaders(checkoutToken)},
        body: JSON.stringify({})
    })

    const ingrid = await response.json()

    return  ingrid
}

export async function createKlarnaOrder(checkoutToken?: string) {
    if(!checkoutToken) { return }

    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper-kco/orders`, {
        method: 'POST',
        headers: {...checkoutHeaders(checkoutToken)},
        body: JSON.stringify({
            'klarna': {
                'merchant_urls': {
                    'terms': 'https://merchant.com/terms',
                    'confirmation': 'https://example.com/confirmation',
                    'cancellation_terms': 'https://merchant.com/terms',
                    'checkout': 'https://merchant.com/checkout'
                },
                'options': {
                    'additional_checkbox': {
                        'text': 'Subscribe to newsletter',
                        'checked': false,
                        'required': false
                    }
                }
            }
        })
    })

    const klarna = await response.json()

    return  klarna.klarna.html_snippet
}

export async function getKlarnaOrders(checkoutToken: string): Promise<{html_snippet: string, order_id: string}> {

    const response = await fetch(`${BRINK_SHOPPER_URL}/shopper-kco/orders`, {
        method: 'GET',
        cache: 'no-store',
        headers: {...checkoutHeaders(checkoutToken)}
    })

    const klarna = await response.json()

    return klarna.klarna
}