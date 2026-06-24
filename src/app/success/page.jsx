import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail, ArrowLeft, ShoppingBag, Award } from 'lucide-react';
import { db } from '@/lib/mongodb'; 
import { getUserSession } from '@/lib/core/session';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const user = await getUserSession();

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details, line_items, metadata } = session;
  const customerEmail = customer_details?.email;
  const purchasedItemName = line_items?.data?.[0]?.description || "your item";

  if (status === 'open') {
    return redirect('/');
  }

 
  const isWriterFee = metadata?.paymentType === 'publishing_fee';

  if (status === 'complete') {
    try {
      if (isWriterFee) {
       
        await db.collection('all_transactions').updateOne(
          { stripeSessionId: session_id },
          { $set: { status: 'completed' } }
        );
        
        if (metadata?.writerEmail) {
          await db.collection('users').updateOne(
            { email: metadata.writerEmail },
            { $set: { isVerifiedWriter: true } }
          );
        }
      } else {
        
        await db.collection('purchased_books').updateOne(
          { stripeSessionId: session_id },
          { $set: { status: 'completed' } }
        );
      }
    } catch (error) {
      console.error("Database status update failed:", error);
    }

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-6">
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#6366F1]/10 animate-ping opacity-75 scale-75"></div>
              <CheckCircle2 className="relative w-16 h-16 text-[#6366F1] mx-auto" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-[#0F172A] tracking-tight">
              {isWriterFee ? "Verification Successful!" : "Thank you for your purchase!"}
            </h1>
            <p className="text-sm text-[#64748B]">
              {isWriterFee ? "Your creator profile has been fully verified." : "Your transaction was completed successfully."}
            </p>
          </div>

          <hr className="border-slate-200" />

          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white border border-slate-200 text-[#0F172A] rounded-lg mt-0.5">
                {isWriterFee ? <Award className="w-4 h-4 text-[#6366F1]" /> : <ShoppingBag className="w-4 h-4 text-[#6366F1]" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                  {isWriterFee ? "Privilege Dynamic" : "Purchased Item"}
                </span>
                <span className="text-sm font-semibold text-[#0F172A] line-clamp-1">{purchasedItemName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-slate-200/60 pt-2.5">
              <div className="p-2 bg-white border border-slate-200 text-[#0F172A] rounded-lg mt-0.5">
                <Mail className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <div className="break-all">
                <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">Account Email</span>
                <span className="text-sm font-medium text-[#0F172A]">{customerEmail}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
            {isWriterFee 
              ? "You can now publish unlimited ebooks, manage pricing, and track your global reader analytics network."
              : "A confirmation email along with access credentials has been sent to your inbox."
            }{' '}
            Reach us at <a href="mailto:support@fable.com" className="text-[#6366F1] hover:underline font-medium">support@fable.com</a>.
          </p>

          <div className="pt-2 space-y-2.5">
            {isWriterFee ? (
              
              <Link 
                href="/dashboard/writer" 
                className="w-full bg-[#0F172A] hover:bg-black text-white py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 group"
              >
                Go to Writer Dashboard
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
            
              <Link 
                href="/dashboard/reader/bookshelf" 
                className="w-full bg-[#0F172A] hover:bg-black text-white py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 group"
              >
                Go to Your Bookshelf
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            <Link 
              href="/browse-books" 
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }
}