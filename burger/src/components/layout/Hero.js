import Image from "next/image";
import RightArrow from "../icons/Rightarrow";

export default function Hero() {
    return (
        <>
            <section className="hero mt-4">
                <div className="py-12" >
                    <h1 className="text-5xl font-semibold">
                        What a Great time for a <br />
                        <span className="text-primary">
                            Burger
                        </span>
                    </h1>
                    <p className="my-6 text-grey-500 text-sm">
                        After a long day a burger will be there to bright you day. <br />
                        Go to a shop that make you a burger to die for.
                    </p>
                    <div className="flex gap-4 text-sm">
                        <button className=" bg-primary uppercase flex items-center gap-2 text-white
                        px-4 py-2 rounded-full ">
                            Order now
                            <RightArrow />
                        </button>
                        <button className="flex gap-2 py-2 text-gray-700 font-semibold">
                            Learn more
                            <RightArrow />
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Image
                        className="rounded-xl"
                        src={'/stock_1.png'}
                        layout={'fill'}
                        alt={'burger'}
                    />

                </div>
            </section>
        </>
    )
}