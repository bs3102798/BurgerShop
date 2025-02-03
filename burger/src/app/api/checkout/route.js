import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/appapp/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)

    const { cartProducts, address } = await req.json()

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

   const orderDoc =  await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    })

    const stripe_line_items = [];
    for(const product of cartProducts) {
        const productName = product.name;
        const productInfo = await MenuItem.findById(product._id)
        let productsPrice = 0;


        stripe_line_items.push ({
            quantity: 1,
            price_data: {
                currencey: 'USD',
                product_data: {
                    name: productName,
                },
                unit_amount: productsPrice * 100,


            }
        })
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripe_line_items,
        mode: 'payment',
        custermer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: { orderId: orderDoc._id },
        shipping_options: [
            {
                shipping_rate_data:{
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount:{amount: 500, currency: 'USD'},
                },
               

            }
        ]

    })

}