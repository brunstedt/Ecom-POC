import Header from './Header'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function HeaderWrapper() {
    // const sessionData = await getServerSession(authOptions)
    // console.log('sessionData', sessionData)

    return (<Header />)
}