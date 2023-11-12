import { createCartSession, getCart } from '@/requests/cart'
import Header from './Header'

export default async function HeaderWrapper() {

    // ToDo - create session and pass cart to header
    const cartSession = await createCartSession()
    console.log(cartSession)

    return (<Header />)
}