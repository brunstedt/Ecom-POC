'use client'
import React from 'react'
import { replaceScriptNode } from '@/utils/script'

export default function Widget({
    HTMLmarkup,
    elementId,
}: {
  HTMLmarkup: string;
  elementId: string;
}) {
    const widgetWrapperRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        handleInitialize(HTMLmarkup)
    }, [])

    const handleInitialize = (HTMLSnippet: string) => {
    widgetWrapperRef.current!.innerHTML = HTMLSnippet
    replaceScriptNode(document.getElementById(elementId))
    }

    return (
        <div className="text-center w-full max-w-screen-md mx-auto pb-10 pt-5">
            <div ref={widgetWrapperRef} className="w-full max-w-screen-md" />
        </div>
    )
}
