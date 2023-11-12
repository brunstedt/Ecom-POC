export async function POST(request: Request) {
    const response = await fetch(`${process.env.BRINK_SHOPPER_URL}/sessions/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeGroupId: process.env.BRINK_STORE_GROUP_ID,
            countryCode: process.env.BRINK_COUNTRY_CODE,
            languageCode: process.env.BRINK_LANGUAGE_CODE,
        }),
    })

    if(response.status !== 200) {
        return new Response(JSON.stringify({error: `Error creating cart session (${response.status})`}), {status: response.status})
    }

    return new Response(JSON.stringify(response), {status: response.status})
}