import { redirect } from 'next/navigation'
import Link from 'next/link'
import Icon from '@/components/icon/Icon'

export default function Booking() {
    return (
        <div className="px-4 md:px-6 flex flex-col gap-2">
            <div className="text-3xl mt-4 flex items-center justify-center text-white gap-2">
                <>
                    <Link href="/booking/landsort">
                        Landsort
                    </Link>
                    <Icon name="tv" size="medium" />
                    <Icon name='wifi'/>
                </>
            </div>
            <div className="text-3xl mt-4 flex items-center justify-center text-white gap-2">
                <>
                    <Link href="/booking/downtowncamper">
                        Downtown Camper
                    </Link>
                    <Icon name="tv" size="medium" />
                    <Icon name="phone"/>
                    <Icon name="hairdryer"/>
                </>
            </div>
        </div>
    )
}