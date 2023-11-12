import {products as mockedProducts} from '@/fixtures/products.fixture'

export async function GET(request: Request) {
    return new Response(JSON.stringify(mockedProducts), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(request: Request) {
    const { productId } = await request.json()
    
    const response = mockedProducts.find(product => product.id === productId)
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
  