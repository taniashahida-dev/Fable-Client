import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe' // আপনার সঠিক পাথ দিন

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // ফর্ম থেকে আসা ডাটা রিড করা হচ্ছে
    const formData = await request.formData()
    const bookId = formData.get('bookId')
    const bookName = formData.get('bookName')
    const price = formData.get('price')
    const userEmail = formData.get('userEmail')
    const writerId = formData.get('writerId') 

    // ডাটাবেজের ড্যাশবোর্ড ট্র্যাকিং এর জন্য মেটাডাটা অবজেক্ট তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail || undefined,
      mode: 'payment',
      
      // এই ডাটাগুলো দিয়ে পরবর্তীতে রিডার, রাইটার ও এডমিনের ড্যাশবোর্ড আপডেট হবে
      metadata: {
        bookId: bookId,
        bookName: bookName,
        price: price,
        buyerEmail: userEmail || '',
        writerId: writerId || '' 
      },

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: bookName || 'Ebook',
              metadata: { bookId: bookId }
            },
            unit_amount: Math.round(Number(price) * 100), // সেন্টে কনভার্ট ($34.44 = 3444)
          },
          quantity: 1,
        },
      ],
      
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/browse-books/${bookId}?canceled=true`,
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}