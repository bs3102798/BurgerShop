'use client'
import Link from "next/link";
import { useProfilePage } from "/src/components/UseProfile";
import EditableImage from "/src/components/layout/EditableImage";
//import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import RightArrow from "/src/components/icons/Rightarrow.js"
import LeftArrow from "/src/components/icons/Left.js";
import { redirect } from "next/navigation";
import MenuItemForm from "/src/components/layout/MenuItemForm";
//import { redirect } from "next/dist/server/api-utils";
export default function NewMenuItemPage() {

    //
    const { loading, data } = useProfilePage();

    const [redirectItem, setRedirectItem] = useState(false);
    async function handleFormSubmit(ev,data) {
        ev.preventDefault();
        // const data = {
        //     image,
        //     name,
        //     description,
        //     basePrice,
        // }
        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/menu-items', {
                method: 'POST',
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
    if(redirectItem) {
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
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>

    )
}
