'use client'
import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

export default function BookRoomButton() {

    const { pending } = useFormStatus()

    return (
        <button disabled={pending} className={twMerge(
            'py-3 px-4 text-white bg-pink-500 font-bold rounded hover:bg-pink-600 tracking-wide transition-opacity duration-200',
            pending && 'opacity-50 pointer-events-none'
        )} type="submit">Book now</button>
    )
}