/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

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
                    <SectionHeaders
                        subHeader={'check out'}
                        MainHeader={'Menu'}
                    />


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