import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
  
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET 
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }


  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const { db } = await connectToDatabase();
    
 
    await db.collection('orders').updateOne(
      { stripeSessionId: session.id },
      { $set: { status: 'completed' } }
    );
  }

  return NextResponse.json({ received: true });
}