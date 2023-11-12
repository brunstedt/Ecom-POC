export async function POST(request: Request) {
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/session/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    })

    return new Response(JSON.stringify(response), {status: response.status})
}

export async function PUT(request: Request) {
    const { productId } = await request.json()
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/session/items/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({quantity: 1}),
    })

    return new Response(JSON.stringify(response), {status: response.status})
}