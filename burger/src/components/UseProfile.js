import { useEffect, useState } from "react";

export function useProfilePage() {
    const [data, setdata] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setdata(data)
                setLoading(false)

            })
        })
    }, [])
    return { loading, data }
}