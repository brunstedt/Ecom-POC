import Header from './Header'
import { getCartAction } from '@/app/actions/cart'

export default async function HeaderWrapper() {
    const cart = await getCartAction()
    return (<Header cart={typeof cart !== 'string' ? cart : undefined } />)
}