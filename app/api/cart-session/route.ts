import { NextRequest } from 'next/server'


export async function POST() {
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/shopper/sessions/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'x-api-key': `${process.env.BRINK_TOKEN}`
            // 'Authorization': `Bearer ${process.env.BRINK_TOKEN}`
        },
        body: JSON.stringify({
            storeGroupId: process.env.BRINK_STORE_GROUP_ID,
            countryCode: process.env.BRINK_COUNTRY_CODE,
            languageCode: process.env.BRINK_LANGUAGE_CODE,
        }),
    })

    // ToDo: Set headers with cart-token from response

    const {status} = response
    const jsonResponse = await response.json()
    
    if(response.status !== 200) {
        return new Response(JSON.stringify({error: `Error creating cart session (${response.status})`}), {status})
    }
    return new Response(JSON.stringify(jsonResponse), {status})
}