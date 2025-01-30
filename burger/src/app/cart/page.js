'use client'
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "/src/components/layout/SectionHeaders";
import { CartContext } from "/src/components/AppContext";
import Image from "next/image";
import Trash from "/src/components/icons/Trash";
import { cartProductPrice } from "/src/components/AppContext";
import AddressInfo from "/src/components/layout/AddressInput";
import { useProfilePage } from "/src/components/UseProfile";
//import { CartContext } from "../AppContext"

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext)


    const [address, setAddres] = useState({})
    const { data: profileData } = useProfilePage()

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

    let total = 0
    for (const p of cartProducts) {
        total += cartProductPrice(p)
    }

    function handleAddressChange(propName, value) {
        setAddres(prevAddress => ({ ...prevAddress, [propName]: value }))
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
                                    <div className="w-30 h-30">
                                        <Image width={120} height={100} src={product.image} alt={''} />
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
                        {/* <div className="flex w-full gap-12 justify-end ml-auto border">
                            <SectionHeaders MainHeader={"Total"} />
                            <SectionHeaders MainHeader={total} />
                            
                        </div> */}
                        <div className="py-4 gap-2 text-right pr-24 text-gray-500">
                            Total:&nbsp;
                            <span className="text-lg font-semibold pl-2">${total}</span>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-4">
                        <h2>Checkout</h2>
                        <form>

                            <AddressInfo
                                adressProps={address}
                                setAddressProp={handleAddressChange} />
                            <button type="submit">Pay ${total}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
} 