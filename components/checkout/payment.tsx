'use client'
import React from 'react'
import { replaceScriptNode } from '@/utils/script'
import { getKlarnaOrders } from '@/requests/checkout'

const localStorageSessionIDKey = 'klarna-session-id'

export default function KlarnaPayment({ checkoutSession, klarnaMarkup }: { checkoutSession: string, klarnaMarkup: string }) {
    const widgetWrapperRef = React.useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        handleIngridInitialize(klarnaMarkup)
    }, [])


    const handleIngridInitialize = (
        HTMLSnippet: string
    ) => {
        widgetWrapperRef.current!.innerHTML = HTMLSnippet
        replaceScriptNode(document.getElementById('klarna-checkout-container'))
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
