const { Schema, models, model } = require("mongoose");

const UserInfoSchema = new Schema({

    email: { type: String, required: true },

    city: { type: String },
    phone: { type: String },
    country: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    admin: { type: Boolean, default: false }
}, {timestamps:true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)