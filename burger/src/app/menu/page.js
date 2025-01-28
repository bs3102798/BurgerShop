/* eslint-disable react/jsx-key */
"use client"
import MenuItem from "/src/components/menu/MenuItem"
import MenuItemForm from "/src/components/layout/MenuItemForm"
import SectionHeaders from "/src/components/layout/SectionHeaders"
import { useEffect, useState } from "react"

export default function MenuPage() {
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories =>
               // console.log('Fetched categories:', categories),
                setCategories(categories))
        });
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems =>
                //console.log('Fetched menu items:', menuItems),
                setMenuItems(menuItems))
        })

    }, []);
    return (

        <section>


            {categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                    <SectionHeaders MainHeader= {c.name} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-8 mt-4">

                    {menuItems.filter(m => m.category === c._id).map(item => (
                        <MenuItem {...item} />
                    ))}
                     
                    </div>
                </div>
            ))}
        </section>



    )
}