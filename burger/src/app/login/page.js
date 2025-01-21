'use client'
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react"
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false)
    //const [] = useState(true);
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true)
        await signIn('credentials', {email,password, callbackUrl:'/'})

    
        setLoginInProgress(false)
        

    }
    return (
        <>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl">
                    Login
                </h1>

                <form className="block max-w-lg mx-auto" onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        disabled={loginInProgress}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        name= 'password'
                        placeholder="password"
                        disabled={loginInProgress}
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button
                        type="submit"
                        disabled={loginInProgress}
                    >
                        Login
                    </button>
                    <p className="text-center my-4 text-grey-400">
                        or Login with provider
                    </p>
                    <button type="button" onClick={()=> signIn('google', {callbackUrl:'/'})} 
                    className="flex gap-4  justify-center">
                        <Image src={'/free-google.png'} alt={""} width={30} height={30} />
                        Login with Google
                    </button>
                    <div className="text-center my-4 text-gray-500 border-t pt-4">
                        No account <Link className="underline" href={'/register'}>Register here &raquo; </Link>
                    </div>


                </form>

            </section>
        </>
    )
}