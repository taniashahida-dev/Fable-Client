import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getUserSession } from '@/lib/core/session';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/mongodb';


export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

   
    const currentUser = await getUserSession();
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const formData = await request.formData();
    const bookId = formData.get('bookId');
    const bookName = formData.get('bookName');
    const price = formData.get('price');
    const writerId = formData.get('writerId'); 
    const writerName = formData.get('writerName'); 
    const bookCover = formData.get('bookCover');

    const session = await stripe.checkout.sessions.create({
    
      customer_email: currentUser.email, 
      mode: 'payment',
      metadata: {
        bookId,
        bookName,
        price,
        buyerEmail: currentUser.email, // 👈 সিকিউরড ইমেইল
        writerId: writerId || '' ,
        writerName: writerName || '', // মেটাডাটা
        bookCover: bookCover || ''
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: bookName || 'Ebook' ,
              images: bookCover ? [bookCover] : []
            },
            unit_amount: Math.round(Number(price) * 100), 
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/browse-books/${bookId}?canceled=true`,
    });

    await db.collection('purchased_books').insertOne({
      stripeSessionId: session.id,
      bookId,
      bookName,
      price: Number(price),
      buyerEmail: currentUser.email,
      writerId,
      writerName, 
      bookCover,
      purchasedAt: new Date(),
      status: 'pending' 
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}