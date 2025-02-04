import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    let isAdmin = false

    const url = URL(requestAnimationFrame.url);
    const _id = url.searchParams.get('_id')
}