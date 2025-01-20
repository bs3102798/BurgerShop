
'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatedingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)
    async function handleFormSubmit(ev) {

        ev.preventDefault();
        setCreatedingUser(true)
        setError(false);
        setUserCreated(false)


        const response = await fetch('/api/register',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
        if (response.ok) {
            setUserCreated(true);
        }
        else {
            setError(true);
        }

        setCreatedingUser(false)




    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created.  <br />Now you can <Link href={'/login'}>Login &raquo; </Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    User Allready Created.  <br />Please try again later or create new user
                </div>

            )}
            <form className="block max-w-lg mx-auto" onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    disabled={creatingUser}
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button
                    type="submit"
                    disabled={creatingUser}
                >
                    Register
                </button>
                <p className="text-center my-4 text-grey-400">
                    or Login with provider
                </p>
                <button className="flex gap-4  justify-center">
                    <Image src={'/free-google.png'} alt={""} width={30} height={30} />
                    Register with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? <Link className="underline" href={'/login'}>Login here &raquo; </Link>
                </div>
            </form>
        </section>
    )
}