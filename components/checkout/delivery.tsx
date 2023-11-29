'use client'
import React from 'react'
import { replaceScriptNode } from '@/utils/script'
import { syncIngridSession } from '@/requests/checkout'

const localStorageSessionIDKey = 'ingrid-session-id'

export default function IngridDelivery({
    checkoutSession,
    markup
}: {
    checkoutSession: string;
    markup: string
}) {
    const widgetWrapperRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        initDeliveryCheckout()
    }, [])

    const initDeliveryCheckout = async () => {
        const existingSessionID = window.localStorage.getItem(
            localStorageSessionIDKey
        )
        if (existingSessionID) {
            try {
                const getSessionResponse: { htmlSnippet: string; id: string } =
                    await syncIngridSession(checkoutSession)
                handleIngridInitialize(getSessionResponse.htmlSnippet)
            } finally {}
        } else {
            handleCreateSession()
        }
    }

    const handleIngridInitialize = (HTMLSnippet: string) => {
        widgetWrapperRef.current!.innerHTML = HTMLSnippet
        replaceScriptNode(document.getElementById('shipwallet-container'))
    }

    const handleCreateSession = async () => {
        try {
            handleIngridInitialize(markup)
            window.localStorage.setItem(localStorageSessionIDKey, 'ingrid')
        } finally {}
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
