import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/app/models/Order";
import {MenuItem} from "@/app/models/MenuItem";
//import { metadata } from "@/app/layout";
const stripe = require('stripe')(process.env.STRIPE_PS)

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    //console.log(req.headers)

    const { cartProducts, address } = await req.json()

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    })

    const stripe_line_items = [];
    for (const cartProduct of cartProducts) {

        const productInfo = await MenuItem.findById(cartProduct._id)

        let productsPrice = productInfo.basePrice;

        if (cartProduct.size) {
            const size = productInfo.sizes.
                find(size => size._id.toString() === cartProduct.size._id.toString())
            productsPrice += size.price;
        }
        if (cartProduct.extras?.length > 0) {
            for (const cartProductExtraThing of cartProduct.extras) {
                const extraThingInfo = productInfo.extraTopPrices
                    .find(extra => extra._id.toString() ===  cartProductExtraThing._id.toString())
                productsPrice += extraThingInfo.price
            }
        }

        const productName = cartProduct.name;


        stripe_line_items.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName,
                },
                unit_amount: productsPrice * 100,


            }
        })
    }
    //console.log({stripe_line_items})
    //return Response.json(null)

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripe_line_items,
        mode: 'payment',
        customer_email: userEmail,
        //success_url: process.env.NEXTAUTH_URL + 'order/' + orderDoc._id.toString() + '?clear-cart-1',
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString(),
        //success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString() },
        //metadata: { orderId: orderDoc._id},
        // payment_intent_data: {
        //     metadata:{orderId: orderDoc._id},

        // },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD' },
                },


            }
        ]

    })
    return Response.json(stripeSession.url)

}