// /* eslint-disable react/jsx-key */
'use client'

import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "/src/components/layout/SectionHeaders"
import { useContext, useEffect, useState } from "react"
import { useParams } from "next/navigation";
import CartProduct from "@/components/menu/CartProduct";
import AddressInfo from "@/components/layout/AddressInput";
// import AddressInfo from "@/components/layout/AddressInput";


export default function OrderPage() {

    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState();
    const { id } = useParams();
    const { clearCart } = useContext(CartContext)
    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            setLoadingOrder(true)
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setLoadingOrder(false);
                })
            })
        }
    }, [])

        let subtotal = 0;
        if (order?.cartProducts) {
            for (const product of order?.cartProducts) {
                subtotal += cartProductPrice(product)
            }
        }
    return (
        <>
            <section className="max-w-xl text-center mx-auto mt-8">
                <div className="text-center">
                    <SectionHeaders MainHeader={'Your Order'} />
                    <div className="mt-4">
                        <p>Thanks for your order</p>
                        <p>We will text you when the order is on its way.</p>
                    </div>
                </div>
                {loadingOrder && (
                    <div>Loading order....</div>
                )}
                {order && (
                    <>
                        <div className="md:grid grid-cols-2 md:gap-16">
                            <div>
                                {order.cartProducts.map(product => (
                                    <CartProduct key={product._id} product={product} />

                                ))}
                            </div>
                            <div className="text-right py-2 text-gray-500">
                                Subtotal:
                                <span className="text-black font-bold inline-block w-8">{subtotal}</span>
                                <br />
                                Delivery:
                                <span className="text-black font-bold inline-block w-8">$5</span>
                                <br />
                                Total:
                                <span className="text-black font-bold inline-block w-8">${subtotal + 5}</span>
                                <br />
                            </div>
                        </div>
                        <div>
                            {/* <div className="bg-gray-100 p-4 rounded-lg">
                                <AddressInfo disabled={true} addressProps={order} />

                            </div> */}

                        </div>
                    </>

                )}



            </section>
        </>
    )
}