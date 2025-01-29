'use client'
import { SessionProvider } from "next-auth/react";
import { useState, createContext, useEffect } from "react";
//import { createContext } from "vm";

export const CartContext = createContext({})

export function AppProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null


    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }

    }, [])

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
                .filter((v, index) => index !== indexToRemove)
                saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts
        })
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
                removeCartProduct, clearCart,
            }}>
                {children}

            </CartContext.Provider>
        </SessionProvider>
    )
}