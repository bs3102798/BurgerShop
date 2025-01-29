/* eslint-disable react/jsx-key */
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
    const [
        selectedSize, setSelectedSize
    ] = useState(sizes?.[0] || null)
    const [selectedExtras, setSelectedExtras] = useState([])
    const [showPopup, setShowPopup] = useState(false)

    function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 && extraTopPrices.length > 0
        if (hasOptions) {
            setShowPopup(true)
        } else {
            if(showPopup) {
                AddToCart(menuItem, selectedSize, selectedExtras)
            } else{
                AddToCart(menuItem);
            }
            setShowPopup(false)
            toast.success('added to cart')
        }
    }
    
    function handleExtraThing(ev, extraTopPrices) {
        //console.log(ev)
        const checked = ev.target.checked
        if (checked) {
            setSelectedExtras(prev => [...prev, extraTopPrices])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraTopPrices.name)
            })
        }
    }
    let selectedPrice = basePrice

    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }

    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }
    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div
                        onClick={(ev) => ev.stopPropagation()}
                        className=" my-8 bg-white p-3 rounded-lg max-w-md max-h-screen ">
                        <div className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px' }}>

                            <Image
                                src={image} alt={name}
                                width={200} height={200}
                                className="mx-auto" />
                            <h2 className="text-lg bold text-center mb-3">{name}</h2>
                            <p className="text-center text-gray-600 text-am mb-3">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="  py-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label className="flex items-center gap-3 p-4 border rounded-md mb-1">
                                            <input
                                                onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type="radio"
                                                name="size" />{size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraTopPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Extra Topping?</h3>
                                    {JSON.stringify(selectedExtras)}
                                    {extraTopPrices.map(extraTopPrices => (
                                        <label className="flex items-center gap-3 p-4 border rounded-md mb-1">
                                            <input
                                                onClick={ev => handleExtraThing(ev, extraTopPrices)}
                                                type="checkbox"
                                                name={extraTopPrices} />{extraTopPrices.name}
                                            ${extraTopPrices.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                className="primary sticky bottom-2"
                                onClick={handleAddToCartButtonClick}
                                type="button">
                                Add to chart ${selectedPrice}
                            </button>
                            <button className="mt-2" onClick={() => setShowPopup(false)}>Cancel</button>

                        </div>
                    </div>
                </div>
            )}

            <MenuItemTile
                onAddToCart={handleAddToCartButtonClick}
                {...menuItem} />
        </>
    )
}