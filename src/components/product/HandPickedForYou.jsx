"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import useAllProducts from "@/hooks/useAllProducts";

const HandPickedForYou = () => {
  const { allProducts, isLoading } = useAllProducts(1, 100);
  const router = useRouter();
  const { addToCart } = useCart();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const productsArray = allProducts?.data?.products || [];
  const newArrivals = [...productsArray].reverse().slice(0, 4);

  return (
    <section className="section-padding container mx-auto">
      <div className="flex justify-between items-end mb-2 pb-4">
        <h2 className="section-title mb-0">Hand Picked For You</h2>
        <Link href="/all-products" className="btn-view-all inline-block">
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
            <div className="card-image-wrapper relative aspect-4/5 overflow-hidden bg-gray-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="card-overlay" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="btn-cart-center"
              >
                Add to Cart
              </button>
            </div>

            <p className="input-label mt-4">{product.category}</p>
            <h3 className="sub-section-title text-base truncate">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 mb-2">
              <Star
                size={10}
                className="fill-brand-primary text-brand-primary"
              />
              <span className="text-[10px] text-gray-400 ml-1">New</span>
            </div>

            <p className="text-xl font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HandPickedForYou;
