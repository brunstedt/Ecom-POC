import {
    getHotel,
    getItemPrice,
    getProductByParentId,
} from '@/requests/products'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Tabs from '@/components/tabs/Tabs'
import type { Items } from '@/types/Hotel'
import RoomPicker from '@/components/roomPicker/RoomPicker'
import Icon from '@/components/icon/Icon'
import Link from 'next/link'

type PageProps = {
  params: { id: string };
};

export default async function Booking({ params }: PageProps) {
    const sessionData = await getServerSession(authOptions)

    if (!sessionData) {
        redirect('/login?redirect=/booking')
    }

    const id = params.id[0]
    // API
    // Hotel & rooms
    const [hotel, rooms] = await Promise.all([
        getHotel({ parentId: id }),
        getProductByParentId({ parentId: id }),
    ])

    // Room additions
    const beverages = await getProductByParentId({ parentId: 'beverages' })
    const beveragePrices =
    beverages &&
    (await Promise.all(
        beverages?.map((beverage) => getItemPrice({ variantId: beverage.id }))
    ))
    const additions = beverages?.map((beverage, index) => ({
        beverage,
        prices: beveragePrices ? beveragePrices[index] : undefined,
    }))

    function roomTabs(rooms: Items) {
        return rooms.map((room) => ({
            id: room.id,
            title: room.displayNames.SE,
            content: <RoomPicker {...{ item: room, additions }} />,
        }))
    }

    if (!hotel) {
        return null
    }

    return (
        <div className="shadow-xl bg-gradient-to-t from-[rgba(255,255,255,.9)] via-white to-white rounded-md flex flex-col gap-6">
            <div
                className="w-full items-center relative h-36 md:h-72 bg-cover bg-center flex justify-center rounded-t-md"
                style={{ backgroundImage: `url(${hotel.imageUrl})` }}
            ></div>

            <div className="px-4 md:px-6 flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    {hotel.tags.city.map((city) => (
                        <>
                            <Icon name="pin" size="small" />{' '}
                            <Link
                                href={`https://google.com/maps/place/${city}`}
                                target="_blank"
                            >
                                {city}
                            </Link>
                        </>
                    ))}
                </div>

                <div className="text-3xl text-gray-700 font-display">
                    {hotel.displayNames.SE}
                </div>

                <div className="md:w-2/3 w-full text-lg">
                    {hotel.displayDescriptions.SE}
                </div>

                {rooms ? (
                    <div className="mt-8">
                        <Tabs tabs={roomTabs(rooms)} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
