import { getHotel, getRooms } from '@/requests/products'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Tabs from '@/components/tabs/Tabs'
import { Room } from '@/types/Hotel'
import RoomPicker from '@/components/roomPicker/RoomPicker'
import Icon from '@/components/icon/Icon'

type PageProps = {
    params: { id: string }
}

export default async function Booking({params}: PageProps) {
    const sessionData = await getServerSession(authOptions)

    if(!sessionData) {
        redirect('/login?redirect=/booking')
    }

    const id = params.id[0]
    const hotel = await getHotel({parentId: id})
    const rooms = await getRooms({parentId: id})

    function roomTabs(rooms: Room[]) {
        return rooms.map((room) => ({
            id: room.id,
            title: room.displayNames.SE,
            content: <RoomPicker {...room} />
        }))
    }

    if(!hotel) {
        return null
    }
    
    return (
        <div className="shadow-xl bg-gradient-to-t from-[rgba(255,255,255,.9)] via-white to-white rounded-md flex flex-col gap-6">
            <div className="w-full items-center relative h-36 md:h-72 bg-cover bg-center flex justify-center rounded-t-md"
                style={{backgroundImage: `url(${hotel.imageUrl})`}}
            >
            </div>

            <div className="px-4 md:px-6 flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <Icon name="pin" /> <div>{hotel.tags.city.map((city) => <>{city}</>)}</div>
                </div>
                
                <div className="text-3xl text-gray-700">
                    {hotel.displayNames.SE}
                </div>
                
                <div className="md:w-2/3 w-full text-lg">
                    {hotel.displayDescriptions.SE}
                </div>
                
                {rooms ? <div className="mt-8">
                    <Tabs tabs={roomTabs(rooms)} />
                </div> : null}
                
            </div>


        </div>
    )
}