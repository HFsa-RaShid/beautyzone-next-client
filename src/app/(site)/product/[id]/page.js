"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Minus, Plus } from "lucide-react";
import useAllProducts from "@/hooks/useAllProducts";
import { useCart } from "@/context/CartContext";
import HandPickedForYou from "@/components/product/HandPickedForYou";
import ProductReviews from "@/components/product/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { allProducts, isLoading } = useAllProducts(1, 100);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;

  const productsArray = allProducts?.data?.products || [];
  const product = productsArray.find((p) => p._id === id);

  if (!product)
    return <div className="py-20 text-center">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-3/5 flex gap-4">
            <div className="flex flex-col gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`w-20 h-28 cursor-pointer border-2 relative ${selectedImg === idx ? "border-black" : "border-transparent"}`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 relative aspect-4/5 bg-gray-100">
              <Image
                src={product.images[selectedImg]}
                alt="main"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-2/5">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-black" />
              ))}
              <span className="text-xs text-gray-400 ml-2">157 Reviews</span>
            </div>
            <p className="text-2xl font-bold mb-8">${product.price}</p>

            <div className="space-y-6">
              {[
                { label: "Details", val: product.details },
                { label: "Straight Up", val: product.STRAIGHT_UP },
                { label: "The Lowdown", val: product.THE_LOWDOWN },
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    {item.label}:
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex border border-gray-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-sm py-2 px-4">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="bg-black text-white flex-1 py-3 rounded-full font-bold uppercase text-[12px] hover:bg-gray-800 transition"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
      <HandPickedForYou></HandPickedForYou>
      <ProductReviews productId={id}></ProductReviews>
    </div>
  );
};

export default ProductDetails;
