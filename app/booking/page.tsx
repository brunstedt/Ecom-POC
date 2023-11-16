import { redirect } from 'next/navigation'

export default function Booking() {
    redirect('/booking/downtowncamper')

    return(
        <div className="text-3xl mt-4 text-white text-center">
            Only one hotel available, redirecting...
        </div>
    )
}