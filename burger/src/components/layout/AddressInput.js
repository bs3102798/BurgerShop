export default function AddressInfo({ adressProps, setAddressProp, disabled = false }) {
    const { phone, streetAddress, postalCode, city, country, userEmail } = adressProps
    return (
        <>
            {/* <label>
                Email
            </label>
            <input
                disabled={disabled}
                type='text'
                placeholder="Email"
                value={userEmail || ''}
                onChange={ev => setAddressProp('userEmail', ev.target.value)}
            /> */}
            <label>
                Phone
            </label>
            <input
                disabled={disabled}
                value={phone}
                onChange={ev => setAddressProp('phone', ev.target.value)}
                type="tel"
                placeholder="Phone Number"
            />
            <label>
                street address
            </label>
            <input
                disabled={disabled}
                type="text"
                value={streetAddress}
                onChange={ev => setAddressProp('streetAddress', ev.target.value)}
                placeholder="street address"
            />
            <div className="flex gap-2 grid grid-cols-2">

                <div>


                    <label>Postal code</label>
                    <input
                        disabled={disabled}
                        type="text"
                        value={postalCode}
                        onChange={ev => setAddressProp('postalCode', ev.target.value)}
                        placeholder="Postal code"
                    />

                </div>
                <div>
                    <label>city</label>
                    <input
                        disabled={disabled}
                        type="text"
                        value={city}
                        onChange={ev => setAddressProp('city', ev.target.value)}
                        placeholder="City"
                    />

                </div>
            </div>
            <label>Country</label>
            <input
                disabled={disabled}
                type="text"
                value={country}
                onChange={ev => setAddressProp('country', ev.target.value)}
                placeholder="Country"
            />

        </>
    )
}