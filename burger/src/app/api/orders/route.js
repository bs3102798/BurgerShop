import mongoose from "mongoose";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
}