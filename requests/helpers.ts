import type { Session } from 'next-auth'

export type BrinkHeaders = {
    'x-api-key': string | null,
    'Authorization': string | null
    'Content-Type': string
}

export function cartHeaders(session: Session): BrinkHeaders & HeadersInit | undefined {
    if(!session) { return }
    // @ts-ignore The token_type and access_token are not defined in the Session type
    const authorization = `Bearer ${session.cartToken}`
    return ({
        'x-api-key': `${process.env.BRINK_API_KEY}`,
        'Authorization': authorization,
        'Content-Type': 'application/json',
    })
}

export function productHeaders(session: Session): BrinkHeaders & HeadersInit | undefined {
    if(!session) { return }
    // @ts-ignore The token_type and access_token are not defined in the Session type
    const authorization = `Bearer ${session.access_token}`
    return ({
        'x-api-key': `${process.env.BRINK_API_KEY}`,
        'Authorization': authorization,
        'Content-Type': 'application/json',
    })
}