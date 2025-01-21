'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session
    //console.log(session)
    if(status === 'loading') {
        return 'Loading...'
    }
    if(status === "unauthenticated") {
        return redirect('/login')
    }
    return (
        <>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl">
                    Profile
                </h1>

            </section>
        </>
    )
}