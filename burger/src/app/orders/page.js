'use client'
import { useEffect, useState } from "react";
import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";

export default function UsersPage() {

    const { loading, data } = useProfilePage();
    const [user, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(user => {
                setUsers(user)
                //console.log(user)
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
            <section className="max-w-xl mx-auto mt-8">
                <UserTabs isAdmin={true} />
                <div className="mt-8">

                </div>
                

            </section>
        </>
    )
}