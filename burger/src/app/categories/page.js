'use client'
import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/UserTabs";
import { useProfilePage } from "/src/components/UseProfile";
import toast from "react-hot-toast";
// import { resolve } from "path";
// import { error } from "console";

export default function CategoriesPage() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categories, setCategories] = useState([])

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
    async function handleNewCategorySubmit(ev) {
        ev.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ name: newCategoryName }),
            });
            setNewCategoryName("")
            fetchCategories();
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(creationPromise, {
            loading: "Creating new category",
            success: 'category created',
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
                <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                    <div className="flex gap-2 items-end">
                        <div className="grow">
                            <label>New category name</label>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={ev => setNewCategoryName(ev.target.value)}
                            />
                        </div>
                        <div className="pb-2">
                            <button className="border border-primary px-8 py-2" type="submit">create</button>
                        </div>

                    </div>
                </form>
                <div>
                    <h2 className="mt-5 text-sm text-gray-500">Edit category:</h2>
                    {categories?.length > 0 && categories.map(c => (
                        <div key={c.name}
                            className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 mb-2 cursor-pointer" >
                            
                            <span>{c.name}</span>

                        </div>
                    ))}
                </div>


            </section>

        </>
    )
}