'use client'
import UserForm from "/src/components/layout/UserForm";
import { useProfilePage } from "/src/components/UseProfile";
import UserTabs from "/src/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage() {
    const {loading, data} = useProfilePage();
    const {id} = useParams()
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => {
                // const user = users.find(u =>u._id === id)
                setUser(user)
            })
        })
    }, [])

    function handleSaveButtonClick(ev,data) {
        ev.preventDefault()
        fetch('/api/profile', {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, _id:id}),
        })
    }

    
    
    if (loading) {
        return 'Loading user info'
    }
    if (!data.admin) {
        return 'Not an admin'
    }
    
    return(
        <section className="mt-8 mx-auto max-2-xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">user info form</div>
            <UserForm user={user} onSave={handleSaveButtonClick} />

        </section>
    )
}