import { redirect } from 'next/navigation'
import Link from 'next/link'


export default function Booking() {
    return (
        <div>
            <div className="text-3xl mt-4 text-white text-center">
                <Link href="/booking/landsort">
                    Landsort
                </Link>
            </div>
            <div className="text-3xl mt-4 text-white text-center">
                <Link href="/booking/downtowncamper">
                    Downtown Camper
                </Link>
            </div>
        </div>
    )
}