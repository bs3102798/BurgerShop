import { Order } from '@/app/models/Order';

//import { buffer } from 'micro'
const stripe = require('stripe')(process.env.STRIPE_PS)
export async function POST(req) {
    const sig = req.headers.get('stripe-signature')
    let event;

    try {
        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch (e) {
        console.error('stripe error');
        console.log(e)
        return Response.json(e, { status: 400 });
    }


    if (event.type === 'checkout.session.completed') {
       // console.log(event);
        const orderId = event?.data?.object?.metadata?.orderId
        const isPaid = event?.data?.object?.payment_status === 'paid'
        //console.log({"orderId":event?.data?.object?.metadata?.orderId})
         if (isPaid) {
            await Order.updateOne({_id: orderId}, {paid:true})

         }
    }
    //console.log(event)
    return Response.json('ok', { status: 200 })
}
