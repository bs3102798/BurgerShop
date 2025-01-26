/* eslint-disable react/jsx-key */
"use client"

import Link from "next/link";
//import UserTabs from "@/appcomponents/layout/UserTabs";
import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";
//import RightArrow from "@/appcomponents/icons/Rightarrow";
import RightArrow from "/src/components/icons/Rightarrow.js"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
    const { loading, data } = useProfilePage([]);
    const [menuItems, setMenuItems] = useState('')

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })

    }, [])


    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return "Not an admin.";
    }
    return (
        <>
            <section className="mt-8 max-w-md mx-auto">
                <UserTabs isAdmin={true} />
                <div className="mt-8">
                    <Link
                        className="button "
                        href={"/menu-Items/new"}>
                        Create new menu item
                        <RightArrow />
                    </Link>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500 mt-8">Edit menu item</h2>
                    <div className="grid grid-cols-4 gap-2">

                        {menuItems?.length > 0 && menuItems.map(item => (
                            <Link href={'/menu-Items/edit/' + item._id} 
                            className="bg-gray-300 rounded-lg p-4">
                                <div className="relative ">
                                    <Image className="rounded-md"
                                     src={item.image} alt={''} width={100} height={100} />

                                </div>
                                <div className="text-center">
                                {item.name}

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </section>


        </>
    )

}