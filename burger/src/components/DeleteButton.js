import { useState } from "react"

export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);
    if (showConfirm) {
        return (
            <div className="fixed bg-black/60 inset-0 flex items-center h-full justify-center ">
                <div className="bg-white p-4 rounded-lg">
                    <div>Are you sure you want to Delete Menu Item?</div>
                    <div className="flex gap-2 mt-1">
                        <button
                            type="button"
                            onClick={onDelete}
                            className="primary">Yes, delete
                        </button>
                        <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button>

                    </div>
                </div>
            </div>
        )
    }
    return (
        <>

            <button type="button" onClick={() => setShowConfirm(true)} >
                {label}
            </button>
        </>
    )
}