'use client'
//import { useEffect, useState } from "react";
import UserTabs from "/src/components/layout/UserTabs";
import { useProfilePage } from "/src/components/UseProfile";

export default function CategoriesPage() {

    const { loading: profileLoading, data: profileData } = useProfilePage();
    if(profileLoading) {
        return 'Loading user info....'
    }
    if(!profileData.admin) {
        return 'Not an admin';
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