import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { db } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const writerEmail = formData.get('writerEmail');
    const writerId = formData.get('writerId');
    const writerName = formData.get('writerName');

    if (!writerEmail) {
      return NextResponse.json({ error: 'Unauthorized writer payload' }, { status: 400 });
    }

    const origin = request.headers.get('origin');

   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      customer_email: writerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Fable One-Time Writer Verification Fee',
              description: 'Unlocks lifetime publishing access for creators.',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/writer`,
      metadata: {
        paymentType: 'publishing_fee',
        writerEmail,
        writerId,
        writerName,
      },
    });

   
    await db.collection('all_transactions').insertOne({
      stripeSessionId: session.id,
      type: 'publishing_fee',
      email: writerEmail,
      writerId: writerId,
      amount: 10,
      status: 'pending',
      date: new Date(),
    });

  
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Writer Stripe session configuration failure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}