import { User } from "/src/app/models/User.js";
//burger/src/app/models/User.js
import mongoose from "mongoose";

export async function  POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const createdUser = await User.create(body);

    return Response.json(createdUser);  

}