'use client'
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "/src/components/layout/SectionHeaders";
import { CartContext } from "/src/components/AppContext";
import Image from "next/image";
import Trash from "/src/components/icons/Trash";
import { cartProductPrice } from "/src/components/AppContext";
import AddressInfo from "/src/components/layout/AddressInput";
import { useProfilePage } from "/src/components/UseProfile";
import toast from "react-hot-toast";
//import { CartContext } from "../AppContext"

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext)


    const [address, setAddres] = useState({})
    const { data: profileData } = useProfilePage()


    useEffect(() => {
        if (typeof window !== 'undefind') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed')
            }
        }

    }, [])

    useEffect(() => {
        if (profileData.city) {
            const { phone, city, country, streetAddress, postalCode, } = profileData
            const AddressFromProfile = {
                phone,
                city,
                country,
                streetAddress,
                postalCode,
            }
            setAddres(AddressFromProfile)
        }



    }, [profileData])

    let subtotal = 0
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p)
    }

    function handleAddressChange(propName, value) {
        setAddres(prevAddress => ({ ...prevAddress, [propName]: value }))
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        const promise = new Promise((resolve, reject) => {

            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    address,
                    cartProducts,

                }),
            }).then(async (response) => {
                if (response.ok) {
                    window.location = await response.json();
                } else {
                    reject()
                }
            });
        });
        toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirectiong to payment...',
            error: 'Somthing went wrong...Please try again'
        })


    }
    //console.log({cartProducts})

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders MainHeader={'Cart'} />
                <p className="mt-4">your shoping cart is Empty</p>

            </section>
        )
    }
    return (
        <>
            <section className="mt-8">
                <div className="text-center">
                    <SectionHeaders MainHeader={'Checkout'} />

                </div>
                <div className="mt-8 grid gap-4 grid-cols-2">
                    <div>
                        {cartProducts?.length === 0 && (
                            <div>No products in your shopping cart</div>
                        )}
                        {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                            <>
                                <div className=" items-center flex mb-2 gap-4 py-2">

                                    <div className="h-24 w-24">
                                        <Image className="object-cover w-full h-full rounded-xl"
                                            width={256}
                                            height={256}
                                            src={product.image}
                                            alt={''} />
                                    </div>

                                    <div className="grow">
                                        <SectionHeaders subHeader={product.name} />
                                        {product.size && (
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    Size:
                                                    <span>{product.size.name}</span>
                                                </div>
                                            </div>
                                        )}
                                        {product.extras?.length > 0 && (
                                            <div className="text-sm text-gray-400">
                                                {product.extras.map(extra => (
                                                    // eslint-disable-next-line react/jsx-key
                                                    <div>{extra.name} ${extra.price}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {/* <SectionHeaders subHeader={'$12'} /> */}
                                        ${cartProductPrice(product)}

                                    </div>
                                    <div className="p-2">
                                        <button type="button"
                                            onClick={() => removeCartProduct(index)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ))}
                        <div className="py-2 pr-16 flex justify-end items-center">
                            <div className=" text-gray-500">
                                SubTotal:<br />
                                Delivery:<br />
                                Total:
                            </div>
                            <div className=" font-semibold pl-2 text-right">
                                ${subtotal}<br />
                                $5<br />
                                ${subtotal + 5}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h2>Checkout</h2>
                        <form onSubmit={proceedToCheckout}>

                            <AddressInfo
                                adressProps={address}
                                setAddressProp={handleAddressChange} />
                            <button type="submit">Pay ${subtotal + 5}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
} 