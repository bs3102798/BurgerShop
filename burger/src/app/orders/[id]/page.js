'use client'

import SectionHeaders from "/src/components/layout/SectionHeaders"
import { useEffect, useState } from "react"


export default function OrderPage() {

    const[order, setOrder] = useState();
    const[loadingOrder, setLoadingOrder] = useState();
    useEffect(() =>{

    },[])
    return(
        <> 
        <section className="max-w-xl text-center mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders MainHeader={'Your Order'} />
                <div className="mt-4">
                    <p>Thanks for your order</p>
                    <p>We will text you when the order is on its way</p>
                </div>
            </div>

        </section>

        </>
    )
}