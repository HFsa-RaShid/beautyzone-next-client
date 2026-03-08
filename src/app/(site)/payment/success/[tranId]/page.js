"use client";

import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; 
import { useCart } from '@/context/CartContext';


const PaymentSuccessPage = () => {
 
    const params = useParams();
    const tranId = params.tranId;
    
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]); 

    return (
        <div className="container mx-auto min-h-screen px-6 flex flex-col items-center justify-center py-20 text-center">
            {/* Success Icon */}
            <div className="mb-8 text-green-600">
                <CheckCircle size={100} strokeWidth={1.5} />
            </div>

            {/* Message */}
            <h1 className="text-3xl md:text-4xl font-serif text-brand-black mb-4">
                Your payment has been <span className="text-green-600 italic">received!</span>
            </h1>
            
            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-2 uppercase tracking-widest font-bold">
                Transaction ID: {tranId}
            </p>
            
            <p className="text-gray-400 text-xs md:text-sm mb-10">
                Please check your email for a payment confirmation & invoice.
            </p>

            {/* Action Button */}
            <Link href="/all-products" className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2 group tracking-widest text-[11px] uppercase transition hover:bg-gray-800">
                Continue Shopping
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    );
};

export default PaymentSuccessPage;