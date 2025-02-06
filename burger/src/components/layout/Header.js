'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import Cart from "../icons/Cart";

export default function Header() {
    const session = useSession()
    console.log(session)
    //const status = session.status
    const status = session?.status;
    const userData = session.data?.user
    let userName = userData?.name || userData?.email
    const { cartProducts } = useContext(CartContext)
    if (userName && userName?.includes(' ')) {
        userName = userName.split(' ')[0]
    }
    return (
        <>
            <header className="flex items-center justify-between">

                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    <Link
                        className="text-primary font-semibold text-2xl"
                        href={'/'}>
                        Burger Shop
                    </Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>

                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold" >
                    {status === "authenticated" && (
                        <>
                            <Link
                                className="whitespace-nowrap"
                                href={'/profile'}>
                                Hello,{userName}
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-primary rounded-full text-white px-8 py-2">
                                logout
                            </button>
                        </>

                    )}
                    {status === 'unauthenticated' && (
                        <>
                            <Link href={'/login'}>Login</Link>
                            <Link href={'/register'}
                                className="bg-primary rounded-full text-white px-8 py-2">
                                Register
                            </Link>

                        </>
                    )}
                    <Link href={'/cart'}>
                        <div className="relative">

                            <Cart />
                            {cartProducts?.length > 0 &&(

                                <span 
                                className=" absolute -top-2 -right-2 bg-primary p-1 rounded-full text-sm text-white leading-3 ">
                                {cartProducts.length}
                            </span>
                            )}
                        </div>
                    </Link>




                </nav>
            </header>

        </>
    )
}