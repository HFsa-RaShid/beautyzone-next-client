"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import useAllProducts from "@/hooks/useAllProducts";
import { useCart } from "@/context/CartContext";

const NewArrivals = () => {
  const { allProducts, isLoading } = useAllProducts(1, 100);
  const router = useRouter();
  const { addToCart } = useCart();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const productsArray = allProducts?.data?.products || [];
  const newArrivals = [...productsArray].reverse().slice(0, 4);

  return (
    <section className="container mx-auto py-16 px-10">
      <div className="flex justify-between items-end mb-8  pb-4">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <Link
          href="/all-products"
          className="text-sm font-semibold underline hover:text-gray-600"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="group cursor-pointer"
            onClick={() => router.push(`/product/${product._id}`)}
          >
            {/* Image Wrapper with next/image */}
            <div className="relative aspect-3/4 mb-4 overflow-hidden bg-gray-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              {/* Overlay with Add to Cart */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-black hover:text-white transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">
              {product.category || "General"}
            </p>
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>

            <div className="flex items-center gap-1 mb-2">
              <Star size={12} className="fill-yellow-500 text-yellow-500" />
              <span className="text-[10px] text-gray-400 ml-1">New</span>
            </div>

            <p className="text-xl font-bold text-black">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
