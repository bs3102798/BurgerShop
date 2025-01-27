'use client'
import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/UserTabs";
import { useProfilePage } from "/src/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "/src/components/DeleteButton";


export default function CategoriesPage() {
    const [CategoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategroy, setEditedCategory] = useState(null);

    const { loading: profileLoading, data: profileData } = useProfilePage();
    useEffect(() => {
        fetchCategories()


    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);

            })
        })
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: CategoryName }
            if (editedCategroy) {
                data._id = editedCategroy._id
            }
            const response = await fetch('/api/categories', {
                method: editedCategroy ? 'PUT' : 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName("")
            fetchCategories();
            setEditedCategory(null)
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(creationPromise, {
            loading: editedCategroy ? "Udating category" : "Creating new category",
            success: editedCategroy ? "Udated category" : 'category created',
            error: 'error'

        })
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve()
            }
            else {
                reject
            }
        })

        await toast.promise(promise, {
            loading: 'Deleting....',
            success: 'Deleted',
            error: "error",
        });
        fetchCategories();
    }

    if (profileLoading) {
        return 'Loading user info....'
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <>
            <section className="mt-8 max-w-xl mx-auto">
                <UserTabs isAdmin={true} />
                <form className="mt-8" onSubmit={handleCategorySubmit}>
                    <div className="flex gap-2 items-end">
                        <div className="grow">
                            <label>
                                {editedCategroy ? "Update category" : "New category name"}
                                {editedCategroy && (
                                    <>: <b>{editedCategroy.name}</b></>
                                )}
                            </label>
                            <input
                                type="text"
                                value={CategoryName}
                                onChange={ev => setCategoryName(ev.target.value)}
                            />
                        </div>
                        <div className="pb-2 flex gap-2">
                            <button className="border border-primary px-8 py-2" type="submit">
                                {editedCategroy ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedCategory(null);
                                    setCategoryName('')
                                }}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </form>
                <div>
                    <h2 className="mt-5 text-sm text-gray-500">Catagories:</h2>
                    {categories?.length > 0 && categories.map(c => (
                        <div
                            key={c.name}
                            className="bg-gray-100 rounded-lg p-2 px-4 flex gap-1 mb-2 
                            cursor-pointer items-center" >
                            <div
                                className="grow curser-pointer"
                            >{c.name}</div>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditedCategory(c);
                                        setCategoryName(c.name);
                                    }}>
                                    Edit
                                </button>
                                {/* <button
                                    type="button"
                                    onClick={() => handleDeleteClick(c._id)}>
                                    Delete
                                </button> */}
                                <DeleteButton 
                                label={'Delete'}
                                 onDelete={() => handleDeleteClick(c._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}