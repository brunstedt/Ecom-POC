import NextAuth, { NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 12, // 12 hours
    },
    jwt: {
        maxAge: 60 * 60 * 12, // 12 hours
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
    },
    debug: true,
    providers: [
        CredentialsProvider({
            credentials: {
                'grant_type': {}
            },
            async authorize(credentials) {
                if(!credentials || !credentials.grant_type) {
                    throw new Error('Missing credentials')
                }

                const res = await fetch(`${process.env.BRINK_OAUTH_URL}`, {
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${process.env.BRINK_TOKEN}`,
                        'x-api-key': `${process.env.BRINK_API_KEY}`
                    },
                    body: new URLSearchParams({
                        grant_type: credentials.grant_type
                    })
                })
                console.log({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${process.env.BRINK_TOKEN}`,
                    // 'x-api-key': `${process.env.BRINK_API_KEY}`
                })
                const r = await res.json()
                console.log(r)
                return await res.json()
            }
        })
    ]

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }