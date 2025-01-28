import { useContext } from "react"
import { CartContext } from "../AppContext"

export default function MenuItem(menuItem) {
    const {
        image, name, description, basePrice,
        sizes, extraTopPrices,
    } = menuItem
    const {AddToCart} = useContext(CartContext)
    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-gray-200 hover:shadow-md hover:shadow-black/25">
            <div className="text-center">
                <img src={image} alt="burger" className="h-64 w-48 block mx-auto object-cover block rounded-xl" />

            </div>
            <h4 className="font-semibold text-xl my-2">{name}</h4>
            <p className="text-gray-500 text-sm line-clamp-3">
               {description}
            </p>
            <button
            onClick={()=> AddToCart(menuItem)}
                className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                Add to cart ${basePrice}
            </button>
        </div>
    )
}