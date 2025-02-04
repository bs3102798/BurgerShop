'use client'
import { useEffect, useState } from "react";
import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";
import Link from "next/link";

export default function OrderPage() {

    const { loading, data } = useProfilePage();
    const [orders, setOrders] = useState();
    const [loadingOrders, setLoadingOrder] = useState(true)

    useEffect(() => {
        fetchOrders();

    }, [])

    function fetchOrders() {
        setLoadingOrder(true)
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                console.log(orders);
                setOrders(orders.reverse());
                setLoadingOrder(false)
            })

        })

    }

    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return "Not an admin.";
    }
    return (
        <>
            <section className="max-w-xl mx-auto mt-8">
                <UserTabs isAdmin={true} />
                <div className="mt-8">
                    {loadingOrders && (
                        <div>Loading orders....</div>
                    )}
                    {orders?.lenght > 0 && orders.map(orders = (
                        <div key={orders._id}
                            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-8">
                            <div className="grow flex flex-col md:flex-row items-center gap-6">
                                <div>
                                    <div>
                                        <div className={(
                                            orders.paid ? 'bg-green-500 ' : 'bg-red-400'
                                        ) + 'p-2 rounded-md text-white w-24 text-center'
                                        }>
                                            {orders.paid ? 'Paid' : 'Not paid'}
                                        </div>
                                    </div>
                                    <div className="grow">
                                        <div className="flex gap-3 items-center mb-1">
                                            <div className="grow">{orders.userEmail}</div>
                                            <div className="text-gray-500 text-xs">{dbTimeForHuman(orders.createdAt)}</div>
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {orders.cartProducts?.map(p => p.name).join(',')}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Link herf={'/orders/' + order._id} className="button">
                                        show order
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}