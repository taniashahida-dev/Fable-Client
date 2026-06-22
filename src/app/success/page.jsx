import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail, Download, ShoppingBag } from 'lucide-react';
import { db } from '@/lib/mongodb'; 
import { getUserSession } from '@/lib/core/session';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
const user = await getUserSession()

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details, line_items } = session;
  const customerEmail = customer_details?.email;
  const purchasedItemName = line_items?.data?.[0]?.description || "your ebook";

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    try {
      
      await db.collection('purchased_books').updateOne(
        { stripeSessionId: session_id },
        { $set: { status: 'completed' } }
      );
    } catch (error) {
      console.error("Database status update failed:", error);
    }

    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#EAE6DF] p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-75 scale-75"></div>
              <CheckCircle2 className="relative w-16 h-16 text-[#1A4B58] mx-auto" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Thank you for your purchase!</h1>
            <p className="text-sm text-gray-500">Your transaction was completed successfully.</p>
          </div>

          <hr className="border-[#EAE6DF]" />

          <div className="bg-[#FAF9F5] border border-[#EAE6DF] rounded-xl p-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#EAE6DF] rounded-lg text-gray-700 mt-0.5"><ShoppingBag className="w-4 h-4" /></div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider block">Purchased Item</span>
                <span className="text-sm font-medium text-gray-900 line-clamp-1">{purchasedItemName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-[#EAE6DF]/60 pt-2.5">
              <div className="p-2 bg-[#EAE6DF] rounded-lg text-gray-700 mt-0.5"><Mail className="w-4 h-4" /></div>
              <div className="break-all">
                <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider block">Sent To</span>
                <span className="text-sm font-medium text-gray-900">{customerEmail}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
            A confirmation email along with access credentials has been sent to your inbox. Reach us at{' '}
            <a href="mailto:orders@example.com" className="text-[#1A4B58] hover:underline font-medium">orders@example.com</a>.
          </p>

          <div className="pt-2 space-y-2">
            <Link href="/dashboard/reader/purchase-history" className="w-full bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 group">
              <Download className="w-4 h-4" /> Go to Your Library
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/browse-books" className="w-full bg-[#f59e0b] hover:bg-gray-50 border border-[#E0DCD3] text-gray-700 py-3 px-4 rounded-lg font-medium text-sm transition-all block">Continue Browsing</Link>
          </div>
        </div>
      </div>
    );
  }
}