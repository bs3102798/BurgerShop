'use client'
import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/UserTabs";

export default function CategoriesPage() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setIsAdmin(data.admin)

            })
        })
    })
    if (!isAdmin) {
        return 'Not a Admin'
    }
    return (
        <>
            <section className="mt-8 max-w-lg mx-auto">
                <UserTabs isAdmin={true} />
                categories
            </section>

        </>
    )
}