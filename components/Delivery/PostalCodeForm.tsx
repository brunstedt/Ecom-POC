'use client'
import { createIngridWidget } from '@/requests/checkout'
import React, { useState } from 'react'
import CheckoutSection from '../checkout/delivery'

export default function PostalCodeForm({
    checkoutSession,
}: {
  checkoutSession: string;
}) {
    const [data, setData] = useState<string>('')
    const [ingridMarkup, setIngridMarkup] = useState<null | {
    __html: string | TrustedHTML;
  }>(null)

    const handleChange = (event: { target: { value: any } }) => {
        const { value } = event.target

        setData(value.toString())
    }

    async function loadIngrid(data: string) {
        const response = await createIngridWidget(checkoutSession, data)
        setIngridMarkup(response)
    }

    return (
        <div>
            {ingridMarkup ? (
                <CheckoutSection markup={ingridMarkup} />
            ) : (
                <div className="max-w-xs md:max-w-lg mx-auto">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-10">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="postal-code"
                            >
                                Postnummer
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="postal-code"
                                id="postal-code"
                                type="text"
                                value={data?.toString()}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                    <button onClick={() => loadIngrid(data)}>Visa leverans</button>
                </div>
            )}
        </div>
    )
}
