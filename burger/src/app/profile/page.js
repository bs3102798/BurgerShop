'use client'
import SuccessBox from "/src/components/layout/SuccessBox";
//burger/src/components/layout/InfoBox.js
import InfoBox from "/src/components/layout/InfoBox";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState('');

    const { status } = session

    console.log(session)

    console.log({ image })

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name)
            setImage(session?.data?.user?.image)
        }
    }, [session, status]);

    console.log('Image state:', image);
    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();

        //toast("Saving....")
        const savingPromise = new Promise(async (resolve, reject) => {


            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify({ name: userName, image }),
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

        // if (response.ok) {
        //     toast.success("Profile saved!!")


        // }

    }
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0])
            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: "POST",
                    body: data,
                });
                if (response.ok) {
                    const link = await response.json();
                    //console.log(link);
                    setImage(link);
                    resolve();
                } else {
                    reject();
                }
            })
            await toast.promise(uploadPromise, {
                loading: "Uploading",
                success: "Upload Complete",
                error: "Upload Error",
            })


        }

    }
    if (status === 'loading') {
        return 'Loading...'
    }
    if (status === "unauthenticated") {
        return redirect('/login')
    }

    return (
        <>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl">
                    Profile
                </h1>
                <div className="max-w-md mx-auto ">

                    <div className="flex gap-4 items-center" >
                        <div>
                            <div className=" p-2 rounded-lg relative max-w-{120px} ">


                                {image && (
                                    <Image
                                        className="rounded-lg w-full h-full max-w-[120px]"
                                        src={image}
                                        width={250}
                                        height={250}
                                        alt="avatar"
                                    />
                                )}


                                <label>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                    <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
                                        edit
                                    </span>

                                </label>



                            </div>

                        </div>
                        <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <input type="text" placeholder={"First and last name"}
                                value={
                                    userName
                                    //session.data.user.name
                                } onChange={ev => setUserName(ev.target.value)} />
                            <input type="email" disabled={true} value={session.data.user.email} />
                            <button type="submit">Save</button>

                        </form>

                    </div>

                </div>

            </section>
        </>
    )
}
