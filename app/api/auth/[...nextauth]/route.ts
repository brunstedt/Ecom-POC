import NextAuth, { Awaitable, NextAuthOptions, Session, User } from 'next-auth'

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: 'brinkCommerce',
            name: 'BrinkCommercePlayground',
            type: 'oauth',
            version: '2.0',
            clientId: process.env.BRINK_CLIENT_ID ?? '',
            clientSecret: process.env.BRINK_CLIENT_SECRET ?? '',
            httpOptions: { 
                headers: { 'x-api-key': process.env.BRINK_API_KEY, 'Authorization': `Bearer ${process.env.BRINK_TOKEN}`}
            },
            authorization: {
                
                params: {
                    scope: '',
                },
                url: process.env.BRINK_OAUTH_URL,
            },
            
            profile(profile) {
                return {
                    id: process.env.BRINK_TOKEN ?? '',
                    token: process.env.BRINK_TOKEN
                }
            }
        },
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }