import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice, sizes, extraTopPrices } = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraTopPrices?.length > 0
    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-gray-200 hover:shadow-md hover:shadow-black/25">
            <div className="text-center">
                <img src={image} alt="burger" className="h-64 w-48 block mx-auto object-cover block rounded-xl" />

            </div>
            <h4 className="font-semibold text-xl my-2">{name}</h4>
            <p className="text-gray-500 text-sm line-clamp-3">
                {description}
            </p>
            <AddToCartButton
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                basePrice={basePrice} />
          
        </div>

    )
}