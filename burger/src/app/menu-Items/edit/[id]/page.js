'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";
import toast from "react-hot-toast";
import LeftArrow from "/src/components/icons/Left.js";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "/src/components/layout/MenuItemForm";
import { resolve } from "path";
import DeleteButton from "/src/components/DeleteButton";

export default function EditMenuItemPage() {
    const { id } = useParams()
    const { loading, data } = useProfilePage();
    const [redirectItem, setRedirectItem] = useState(false);
    const [menuItem, setMenuItem] = useState(null)
    useEffect(() => {
        fetch('/api/menu-items').then(res => {

            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setMenuItem(item)

            })
        })
    }, [])
    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {
            ...data,

            _id: id
        }
        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
            if (response.ok)
                resolve()
            else
                reject()
        })
        await toast.promise(savingPromise, {
            loading: 'Saving menu item',
            success: "Item saved",
            error: 'error',
        })
        //return redirect('/menu-Items');
        setRedirectItem(true)

    }
    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {

            const response = await fetch("/api/menu-items?_id=" + _id, {
                method: "DELETE",
            })
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
        setRedirectItem(true)
    }
    if (redirectItem) {
        return redirect('/menu-Items')
    }
    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return "Not an admin."
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={"/menu-Items"} className="button">
                    <LeftArrow />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-4">
                <div className=" max-w-xs ml-auto pl-4">
                    <DeleteButton
                     label="Delete this menu item22"
                     onDelete={() => handleDeleteClick(menuItem._id)} />

                
                </div>
            </div>

        </section>

    )

}