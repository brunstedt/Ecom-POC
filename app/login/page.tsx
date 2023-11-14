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
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="grant_type" value="client_credentials" />
            <button type="submit">Log in</button>
        </form>
    )
}