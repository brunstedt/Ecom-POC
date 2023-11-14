import { createCartSession } from '@/requests/cart'
import Header from './Header'

export default async function HeaderWrapper() {
    const cart = await createCartSession()

    return (<Header cart={cart} />)
}