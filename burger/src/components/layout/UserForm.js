'use client'
import { useState } from "react";
import EditableImage from "/src/components/layout/EditableImage";
import { useProfilePage } from "../UseProfile";
import DeleteButton from "../DeleteButton";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '')
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfilePage()

    return (
        <div className="flex gap-4" >
            <div>
                <div className=" p-2 rounded-lg relative max-w-{120px} ">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={ev => onSave(ev, {
                    name: userName, image, phone,
                    city, country, streetAddress, postalCode, admin

                })}>
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
                <input
                    type="email"
                    placeholder="Email"
                    disabled={true}
                    value={user.email} />
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
                <div className="flex gap-2 grid grid-cols-2">

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

                {/* {JSON.stringify(admin)} */}
                {loggedInUserData.admin && (
                    <div>

                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input
                                id="adminCb"
                                type="checkbox"
                                className="mr-2"
                                value={'1'}
                                checked={admin}
                                onClick={ev => setAdmin(ev.target.checked)} />
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button type="submit">Save</button>

                {/* <DeleteButton
                    label={'Delete'}
                    onDelete={() => handleDeleteClick(c._id)}
                /> */}

            </form>

        </div>
    )
}