import Trash from "/src/components/icons/Trash.js";
import Plus from "/src/components/icons/Plus.js";
import DownArrow from "../icons/DownArrow";
import { useState } from "react";
import UpArrow from "../icons/UpArrow";
//import { useState } from "react";
export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    // const [sizes, setSizes] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        })

    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes;
        })

    }
    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))

    }
    return (
        <>
            <div className="bg-gray-200 p-2 rounded-md mb-2">
                <button
                onClick={() => setIsOpen(prev => !prev)}
                    className="inline-flex p-1 border-0 justify-start"
                    type="button">
                    {isOpen && (
                        <UpArrow />
                    )}
                    {!isOpen && (
                        <DownArrow />

                    )}
                    <span>{name}</span>
                    <span>({props?.length})</span>
                </button>
                <div className={isOpen ? 'block' : 'hidden'}>
                    {props?.length > 0 && props.map((size, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div key={size.id || index} className="flex items-end gap-2">
                            <div>
                                <label>name</label>
                                <input type="text" placeholder="Size name"
                                    value={size.name}
                                    onChange={ev => editProp(ev, index, 'name')}

                                />
                            </div>
                            <div>
                                <label>Extra price</label>
                                <input type="text" placeholder="Extra price"
                                    value={size.price}
                                    onChange={ev => editProp(ev, index, 'price')}
                                />

                            </div>
                            <div>
                                <button
                                    onClick={() => removeProp(index)}
                                    type="button"
                                    className="bg-white px-2 mb-2">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white items-center">
                    <Plus />
                    <span>
                        {addLabel}
                    </span>
                </button>
            </div>

        </>
    )
}