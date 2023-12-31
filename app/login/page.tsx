'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Login() {
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const [isLoading, setIsLoading] = React.useState(false)
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        setIsLoading(true)

        signIn('credentials', {
            ...formJson,
            callbackUrl: redirect
        })
    }
    return (
        <div className="w-full pt-24">
            <div className="bg-white bg-opacity-90 p-8 md:w-1/2 mx-auto rounded-md shadow-2xl">
                <div className="mb-4">(No credentials needed)</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="hidden" name="grant_type" value="client_credentials" />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm" htmlFor="username">Användarnamn</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="bg-white py-3 px-4 rounded-md shadow-sm" disabled />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm" htmlFor='password'>Lösenord</label>
                        <input type="password" id="password" name="password" placeholder="Password" className="bg-white py-3 px-4 rounded-md shadow-sm" disabled />
                    </div>
                    <button className="text-white mt-2 py-3 px-4 bg-pink-500 font-bold rounded hover:bg-pink-600 tracking-wide" disabled={isLoading} type="submit">Logga in</button>
                </form>
            </div>
        </div>
    )
}