export default function AddressInfo({adressProps,setAddressProp}) {
    const {phone, streetAddress, postalCode,city,country} = adressProps
    return(
        <>
        <label>
                    Phone
                </label>
                <input
                    value={phone}
                    onChange={ev => setAddressProp('phone',ev.target.value)}
                    type="tel"
                    placeholder="Phone Number"
                />
                <label>
                    street address
                </label>
                <input
                    type="text"
                    value={streetAddress}
                    onChange={ev => setAddressProp('streetAddress',ev.target.value)}
                    placeholder="street address"
                />
                <div className="flex gap-2 grid grid-cols-2">

                    <div>


                        <label>Postal code</label>
                        <input

                            type="text"
                            value={postalCode}
                            onChange={ev => setAddressProp('postalCode',ev.target.value)}
                            placeholder="Postal code"
                        />

                    </div>
                    <div>
                        <label>city</label>
                        <input

                            type="text"
                            value={city}
                            onChange={ev => setAddressProp('city',ev.target.value)}
                            placeholder="City"
                        />

                    </div>
                </div>
                <label>Country</label>
                <input
                    type="text"
                    value={country}
                    onChange={ev => setAddressProp('country',ev.target.value)}
                    placeholder="Country"
                />

        </>
    )
}