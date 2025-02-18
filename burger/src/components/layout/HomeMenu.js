/* eslint-disable react/jsx-key */
'use client'

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([])
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const bestSellers = menuItems.slice(7, 10);

                //console.log(bestSellers)
                setBestSellers(bestSellers)
            })
        })

    }, [])
    return (
        <>
            <section className="mt-4">
                <div className="" >

                    <div className=" absolute left-0 text-left -z-10">
                        <Image src={'/lettues_1.png'} width={200} height={200} alt={"letuse"} />
                    </div>

                    <div className="absolute  right-11 -z-10 ">
                        <Image src={'/lettues_1.png'} width={200} height={200} alt={"letuse"} />
                    </div>
                </div>
                <div className="text-center mb-4">
                    <SectionHeaders
                        subHeader={'check out'}
                        MainHeader={'Our Best Sellers'}
                    />


                </div>
                <div className="grid grid-cols-3 gap-4">

                     {bestSellers?.length > 0 && bestSellers.map((item,index) => (
                        
                        <MenuItem key={item.id || index} {...item} />
                    ))} 


                </div>
            </section>
        </>
    )
}