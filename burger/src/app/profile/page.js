'use client'
import { useSession } from "next-auth/react"
//import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//import Link from "next/link";
//import UserTabs from "@/appcomponents/layout/UserTabs";
import UserTabs from "/src/components/layout/UserTabs";
import UserForm from "/src/components/layout/UserForm";
// import EditableImage from "/src/components/layout/EditableImage";

//burger/src/components/layout/UserTabs.js

export default function ProfilePage() {
    const session = useSession();
    // const [userName, setUserName] = useState("");
    // const [image, setImage] = useState("")
    // const [phone, setPhone] = useState('');
    // const [streetAddress, setStreetAddress] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    // const [city, setCity] = useState('');
    // const [country, setCountry] = useState('');
     const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetch, setProfileFetched] = useState(false)
    const [user, setUser] = useState(null)

    const { status } = session

    console.log(session)
    console.log("isAdmin in UserTabs:", isAdmin);

    useEffect(() => {
        if (status === 'authenticated') {

            // setUserName(session.data.user.name);
            // setImage(session?.data?.user?.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    // console.log(data)
                    // setPhone(data.phone);
                    // setStreetAddress(data.streetAddress);
                    // setPostalCode(data.postalCode);
                    // setCity(data.city);
                    // setCountry(data.country);
                    setUser(data)
                    setIsAdmin(data.admin)
                    setProfileFetched(true);


                })
            });

        }
    }, [session, status]);


    async function handleProfileInfoUpdate(ev,data) {
        ev.preventDefault();


        const savingPromise = new Promise(async (resolve, reject) => {


            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify(data),
            })
            if (response.ok)
                resolve()
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: "Profile saved!",
            error: "Error",
        })


    }

    if (status === 'loading' || !profileFetch) {
        return 'Loading...'
    }
    if (status === "unauthenticated") {
        return redirect('/login')
    }

    return (
        <>
            <section className="mt-8">
              
                  <UserTabs isAdmin={isAdmin} />
                
                <div className="max-w-xl mx-auto mt-8 ">
                    <UserForm user={user} onSave={handleProfileInfoUpdate} />

                    {/* <div className="flex gap-4" >
                        <div>
                            <div className=" p-2 rounded-lg relative max-w-{120px} ">
                                <EditableImage link={image} setLink={setImage} />
                            </div>
                        </div>
                        <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <label>
                                First and last name
                            </label>
                            <input type="text" placeholder={"First and last name"}
                                value={
                                    userName

                                } onChange={ev => setUserName(ev.target.value)} />
                            <label>
                                email
                            </label>
                            <input type="email" placeholder="Email" disabled={true} value={session.data.user.email} />
                            <label>
                                Phone
                            </label>
                            <input
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)}
                                type="tel"
                                placeholder="Phone Number"
                            />
                            <label>
                                street address
                            </label>
                            <input
                                type="text"
                                value={streetAddress}
                                onChange={ev => setStreetAddress(ev.target.value)}
                                placeholder="street address"
                            />
                            <div className="flex gap-2">
                                
                                <div>


                                    <label>Postal code</label>
                                    <input

                                        type="text"
                                        value={postalCode}
                                        onChange={ev => setPostalCode(ev.target.value)}
                                        placeholder="Postal code"
                                    />

                                </div>
                                <div>
                                    <label>city</label>
                                    <input

                                        type="text"
                                        value={city}
                                        onChange={ev => setCity(ev.target.value)}
                                        placeholder="City"
                                    />

                                </div>
                            </div>
                            <label>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={ev => setCountry(ev.target.value)}
                                placeholder="Country"
                            />
                            <button type="submit">Save</button>

                        </form>

                    </div>

                    */}
                </div>

            </section>
        </>
    )
}
