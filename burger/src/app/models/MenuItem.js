const { Schema, models, model, default: mongoose } = require("mongoose");
//const { type } = require("os");

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema ({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    basePrice: {type: Number},
    category: {type:mongoose.Types.ObjectId},
    sizes: {type:[ExtraPriceSchema]},
    extraTopPrices: {type: [ExtraPriceSchema]},


},{timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema)