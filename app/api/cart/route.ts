export async function POST(request: Request) {
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/sessions/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.BRINK_TOKEN}`
        },
        cache: 'no-store',
    })

    const {status} = response
    
    if(response.status !== 200) {
        return new Response(JSON.stringify({error: `Error creating cart (${response.status})`}), {status})
    }

    return new Response(JSON.stringify(response), {status: response.status})
}

export async function PUT(request: Request) {
    const { productId } = await request.json()
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/sessions/items/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.BRINK_TOKEN}`
        },
        cache: 'no-store',
        body: JSON.stringify({quantity: 1}),
    })

    const {status} = response
    
    if(response.status !== 200) {
        return new Response(JSON.stringify({error: `Error adding to cart (${response.status})`}), {status})
    }

    return new Response(JSON.stringify(response), {status: response.status})
}