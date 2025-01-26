'use client'
import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/UserTabs";
import { useProfilePage } from "/src/components/UseProfile";
import toast from "react-hot-toast";
// import { resolve } from "path";
// import { error } from "console";

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
            success: editedCategroy ? "Udated category" :'category created',
            error: 'error'

        })
    }

    if (profileLoading) {
        return 'Loading user info....'
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <>
            <section className="mt-8 max-w-lg mx-auto">
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
                        <div className="pb-2">
                            <button className="border border-primary px-8 py-2" type="submit">
                                {editedCategroy ? 'Update' : 'Create'}
                            </button>
                        </div>

                    </div>
                </form>
                <div>
                    <h2 className="mt-5 text-sm text-gray-500">Edit category:</h2>
                    {categories?.length > 0 && categories.map(c => (
                        <button
                            onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name);
                            }
                            }
                            key={c.name}
                            className="rounded-lg p-2 px-4 flex gap-1 mb-2 cursor-pointer" >

                            <span className="">{c.name}</span>

                        </button>
                    ))}
                </div>


            </section>

        </>
    )
}