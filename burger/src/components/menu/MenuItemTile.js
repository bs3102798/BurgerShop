export default function MenuItemTile({ onAddToCart,...item}) {
    const {image, description, name, basePrice, sizes, extraTopPrices} = item;
    return(
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-gray-200 hover:shadow-md hover:shadow-black/25">
                <div className="text-center">
                    <img src={image} alt="burger" className="h-64 w-48 block mx-auto object-cover block rounded-xl" />

                </div>
                <h4 className="font-semibold text-xl my-2">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3">
                    {description}
                </p>
                <button
                    type="button"
                    onClick={onAddToCart}
                    className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                        {(sizes?.length > 0 || extraTopPrices?.length > 0) ? (
                            <span>starting from ${basePrice}</span>
                        ): (
                            <span>Add to cart ${basePrice}</span>
                        )}
                    {/* Add to cart ${basePrice} */}
                </button>
            </div>

    )
}