import ProductCard from '@/components/productCard/ProductCard'
import { getProducts } from '@/requests/products'
import { Product } from '@/types/product'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Booking() {
    const sessionData = await getServerSession(authOptions)

    if(!sessionData) {
        redirect('/login?redirect=/booking')
    }

    const products: Product[] = await getProducts()

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4 flex-wrap">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}