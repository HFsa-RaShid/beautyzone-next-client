"use client";

import React from 'react';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

const PaymentCancelPage = () => {
    return (
        <div className="min-h-screen container mx-auto px-6 flex flex-col items-center justify-center py-20 text-center bg-white">
            {/* Cancel Icon */}
            <div className="mb-8 text-[#b06d72]">
                <XCircle size={100} strokeWidth={1.5} />
            </div>

            {/* Message */}
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">
                Oops! Your Payment Wasn&apos;t <span className="text-[#b06d72] italic">Completed!</span>
            </h1>
            
            <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto mb-10">
                It looks like your transaction was canceled—please double-check your details and try again.
            </p>

            {/* Action Button */}
            <Link 
                href="/checkout" 
                className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2 group tracking-widest text-[11px] uppercase transition hover:bg-gray-800"
            >
                Back to Checkout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    );
};

export default PaymentCancelPage;