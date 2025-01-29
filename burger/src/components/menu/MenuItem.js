import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast"
import MenuItemTile from "./MenuItemTile"
import Image from "next/image"

export default function MenuItem(menuItem) {
    const {
        image, name, description, basePrice,
        sizes, extraTopPrices,
    } = menuItem
    const { AddToCart } = useContext(CartContext)
    const [showPopup, setShowPopup] = useState(false)
    function handleAddToCartButtonClick() {
        if (sizes.length === 0 && extraTopPrices.length === 0) {
            AddToCart(menuItem);
            toast.success('added to cart')
        } else {
            setShowPopup(true)

        }

    }
    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-w-md">
                        <Image
                            src={image} alt={name}
                            width={200} height={200}
                            className="mx-auto" />
                        <h2 className="text-lg bold text-center mb-3">{name}</h2>
                        <p className="text-center text-gray-600 text-am mb-3">{description}</p>
                        {sizes?.length > 0 && (
                            <div className="bg-gray-200 rounded-md p-2">
                                <h3>Pick your size</h3>
                                {sizes.map(size => (
                                    <label>
                                        <input type="radio" />{size.name} {size.price}
                                    </label>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            )}

            <MenuItemTile
                onAddToCart={handleAddToCartButtonClick}
                {...menuItem} />
        </>
    )
}