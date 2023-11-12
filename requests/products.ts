export async function getProducts() {

    const response = await fetch(`${process.env.BASE_URL}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getProduct(productId: string) {
    const response = await fetch(`${process.env.BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId}),
    })
    return await response.json()
}