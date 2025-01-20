
'use client'

import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleFormSubmit(ev) {
        ev.preventDefault();
        fetch('/api/register',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {'Content-Type': 'application/json'},
            },

        )

    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            <form className="block max-w-lg mx-auto" onSubmit={handleFormSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button type="submit">Register</button>
                <p className="text-center my-4 text-grey-400">
                    or Login with provider
                </p>
                <button className="flex gap-4  justify-center">
                    <Image src={'/free-google.png'} alt={""} width={30} height={30} />
                    Login with Google
                </button>
            </form>
        </section>
    )
}