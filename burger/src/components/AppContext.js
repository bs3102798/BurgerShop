'use client'
import { SessionProvider } from "next-auth/react";
import { useState, createContext, useEffect } from "react";
//import { createContext } from "vm";

export const CartContext = createContext({})

export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null


    useEffect(() => {
        if(ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
        
    },[])

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

 

    function AddToCart(product, size = null, extras = []) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras }
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts
        })

    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, AddToCart,
            }}>
                {children}

            </CartContext.Provider>
        </SessionProvider>
    )
}