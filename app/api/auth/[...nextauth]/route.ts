import NextAuth, { NextAuthOptions } from 'next-auth'
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
    providers: [
        CredentialsProvider({
            credentials: {
                'grant_type': {}
            },
            async authorize(credentials) {
                if(!credentials || !credentials.grant_type) {
                    throw new Error('Missing credentials')
                }
                const qs = new URLSearchParams()
                qs.set('grant_type', credentials.grant_type)
                qs.set('client_id', process.env.BRINK_CLIENT_ID ?? '')
                qs.set('client_secret', process.env.BRINK_CLIENT_SECRET ?? '')

                const res = await fetch(`${process.env.BRINK_OAUTH_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: qs.toString()
                })
                
                return await res.json()
            }
        })
    ],

    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token}) {            
            return {...token, ...session} as any
        }
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }