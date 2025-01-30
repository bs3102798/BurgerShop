export default function AddToCartButton({hasSizesOrExtras,onClick, basePrice}) {
    return(
        <button
        type="button"
        onClick={onClick}
        className="bg-primary text-white rounded-full px-8 py-2 mt-4">
            {(hasSizesOrExtras) ? (
                <span>starting from ${basePrice}</span>
            ): (
                <span>Add to cart ${basePrice}</span>
            )}
        {/* Add to cart ${basePrice} */}
    </button>
    )
}