'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfilePage } from "/src/components/UseProfile";
import EditableImage from "/src/components/layout/EditableImage";

import UserTabs from "/src/components/layout/UserTabs";

import toast from "react-hot-toast";
import LeftArrow from "/src/components/icons/Left.js";
import { redirect, useParams } from "next/navigation";
//import Parames from ""

export default function EditMenuItemPage() {
    const {id} = useParams()
    const [image, setImage] = useState("");
    const { loading, data } = useProfilePage();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectItem, setRedirectItem] = useState(false);
    useEffect(() =>{
        fetch('/api/menu-items').then(res => {
            
            res.json().then(items => {
                const item = items.find(i => i._id === id )
               setImage(item.image);
               setName(item.name);
               setDescription(item.description);
               setBasePrice(item.basePrice);

            })
        })
    },[])
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {
            image,
            name,
            description,
            basePrice,
            _id:id
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
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4 " style={{ gridTemplateColumns: '.3fr .7fr' }}>
                    <div className="">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Menu item name</label>
                        <input
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            type="text"
                        />
                        <label>Description</label>
                        <input

                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            type="text" />
                        <label


                        >Base price</label>
                        <input type="text"
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)}
                        />
                        <button type="submit">save</button>
                    </div>


                </div>

            </form>
        </section>

    )

}