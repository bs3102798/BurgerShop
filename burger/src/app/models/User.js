const { Schema, model, models } = require("mongoose");
import bcrypt from "bcrypt"
//onst { unique } = require("next/dist/build/utils");

const UserSchema = new Schema({
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String },
   
}, { timestamps: true });







export const User = models?.User || model('User', UserSchema)
