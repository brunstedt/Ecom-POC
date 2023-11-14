'use client'
import { PageProps } from '@/types/page'
import { signIn } from 'next-auth/react'

export default function Login({searchParams}: PageProps) {

    const redirect = `${searchParams.redirect}` || '/'

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        
        signIn('credentials', {
            ...formJson,
            callbackUrl: redirect,
        })
    }
    return (
        <div className="w-full pt-24">
            <div className="bg-white bg-opacity-70 p-8 md:w-1/2 mx-auto rounded-md shadow-2xl">
                <div className="mb-4">(No credentials needed)</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="hidden" name="grant_type" value="client_credentials" />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm" htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" className="bg-white py-3 px-4 rounded-md shadow-sm" disabled />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm" htmlFor='password'>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className="bg-white py-3 px-4 rounded-md shadow-sm" disabled />
                    </div>
                    <button className="text-white mt-2 py-3 px-4 bg-pink-500 font-bold rounded hover:bg-pink-600 tracking-wide" type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}