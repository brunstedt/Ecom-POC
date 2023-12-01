import SignOutButton from '@/components/signoutButton/SignoutButton'


export default function Home() {
    return (
        <div className="flex gap-6 flex-col justify-start">
            <h1 className="text-white font-bold text-3xl md:text-5xl mt-12 font-display">Top of Minds Go</h1>
            <SignOutButton />
        </div>
    )
}
