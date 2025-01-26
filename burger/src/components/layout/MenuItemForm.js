
import { useEffect, useState } from "react";

import EditableImage from "/src/components/layout/EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";
// import Trash from "/src/components/icons/Trash.js";
// import Plus from "/src/components/icons/Plus.js";


export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [extraTopPrices, setExtraTopPrices] = useState(menuItem?.extraTopPrices || [])


    return (

        <form
            onSubmit={ev => onSubmit(ev, {
                image, name, description, basePrice,
                sizes, extraTopPrices
            })}
            className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4 " style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div className="">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Menu item name</label>
                    <input
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        type="text"
                    />
                    <label>Description</label>
                    <input

                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        type="text" />
                    <label


                    >Base price</label>
                    <input type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                    />

                    <MenuItemPriceProps
                        name={'Sizes'}
                        addLabel={'Add size'}
                        props={sizes}
                        setProps={setSizes} />
                    <MenuItemPriceProps
                        name={'Extra toppings'}
                        addLabel={'Add topping prices'}
                        props={extraTopPrices}
                        setProps={setExtraTopPrices}
                    />
                    <button type="submit">save</button>
                </div>


            </div>

        </form>

    )
}