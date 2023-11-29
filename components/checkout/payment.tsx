'use client'
import React from 'react'
import { replaceScriptNode } from '@/utils/script'
import { getKlarnaOrders } from '@/requests/checkout'

const localStorageSessionIDKey = 'klarna-session-id'

export default function KlarnaPayment({checkoutSession, klarnaMarkup}: {checkoutSession: string, klarnaMarkup: string}) {
    const widgetWrapperRef = React.useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        initDeliveryCheckout()
    }, [])

    const initDeliveryCheckout = async () => {
        const existingSessionID = window.localStorage.getItem(
            localStorageSessionIDKey,

        )
        console.log('Hallååå ?? existingSessionID', existingSessionID)
        if (existingSessionID) {
            setIsLoading(true)
            try {
                const getSessionResponse: {html_snippet: string, order_id: string} = await getKlarnaOrders(checkoutSession)
                handleIngridInitialize(
                    getSessionResponse.html_snippet
                )
            } finally {
                setIsLoading(false)
            }
        } else {
            handleCreateSession()
        }
    }

    const handleIngridInitialize = (
        HTMLSnippet: string
    ) => {
    // Injecting the HTMLSnippet into the dom will setup the app via iframes
    // and secure channels of communication between the iframes and the page
    widgetWrapperRef.current!.innerHTML = HTMLSnippet

    // Most browsers will not automatically run an injected script
    // We have to clone it, to trick the browser into runing it
    replaceScriptNode(document.getElementById('klarna-checkout-container'))
    // setupGeneralJSListeners()
    }

    const handleCreateSession = async () => {
        setIsLoading(true)
        try {
            window.localStorage.setItem(
                localStorageSessionIDKey,
                'klarna'
            )

            // const sessionResponse: {order_id: string, html_snippet: string} = await createKlarnaSession(checkoutSession)
            handleIngridInitialize(
                klarnaMarkup
            )
            // Save session ID in case user leaves the checkout without finishing the purchase
            // We will use it on next checkout init to GET session instead of CREATING a new one
        
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            style={{
                textAlign: 'center',
                width: '100vw',
                maxWidth: '610px',
                margin: 'auto',
                paddingBottom: '30px',
                paddingTop: '15px',
            }}
        >
            <div
                ref={widgetWrapperRef}
                style={{ width: '100vw', maxWidth: '610px' }}
            />
        </div>
    )
}
