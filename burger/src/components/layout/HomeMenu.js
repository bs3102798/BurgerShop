/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import MenuItem from "../menu/MenuItem";

export default function HomeMenu() {
    return (
        <>
            <section className="mt-4">
                <div className="" >

                    <div className=" absolute left-0 text-left -z-10">
                        <Image src={'/lettues_1.png'} width={200} height={200} alt={"letuse"} />
                    </div>

                    <div className="absolute  right-11 -z-10 ">
                        <Image src={'/lettues_1.png'} width={200} height={200} alt={"letuse"} />
                    </div>
                </div>
                <div className="text-center mb-4">
                    <h3 className="uppercase text-gray-600 font-semibold leading-4">
                        Check out
                    </h3>
                    <h2 className="text-primary font-bold text-4xl italic">Menu</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                </div>
            </section>
        </>
    )
}