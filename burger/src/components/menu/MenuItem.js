export default function MenuItem() {
    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-gray-200 hover:shadow-md hover:shadow-black/25">
            <div className="text-center">
                <img  src="/stock_2.png" alt="burger" className="max-h-48 max-w-48 block mx-auto" />

            </div>
            <h4 className="font-semibold text-xl my-2">cheese burger</h4>
            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
                ed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
                className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                Add to cart $12
            </button>
        </div>
    )
}