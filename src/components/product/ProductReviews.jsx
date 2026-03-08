"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import useProductReviews from "@/Hooks/useProductReviews";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useAuth } from "@/context/AuthContext";

const ProductReviews = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { reviews = [], totalPages, refetch, totalReviews } = useProductReviews(id, currentPage);

  const handleWriteReview = () => {
    if (!user) {
      router.push("/signin");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;

    const reviewData = {
      productId: id,
      userName: user?.name,
      userEmail: user?.email,
      userPhoto: user?.photoURL || "https://i.ibb.co/qMxMC6bL/human.jpg",
      rating,
      comment: reviewText,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post("/api/reviews", reviewData);
      if (res.data._id) {
        setIsModalOpen(false);
        refetch();
        Swal.fire("Success", "Review submitted!", "success");
        e.target.reset();
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="bg-[#f5e9da] py-20 px-6 font-sans">
      <div className="container mx-auto flex flex-col md:flex-row gap-16 justify-between px-10">
        {/* Left Side */}
        <div className="md:w-2/5">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Ratings and Reviews</h2>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-sm font-medium text-gray-600">{totalReviews || 0} Reviews</span>
          </div>
          <button
            onClick={handleWriteReview}
            className="border border-white bg-white text-[#FF3777] px-8 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-all shadow-sm"
          >
            Write a Review
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-3/5">
          <div className="space-y-0">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div key={review._id || idx} className="border-b border-gray-300 py-10 first:pt-0 last:border-0">
                  <div className="flex gap-4 items-start">
                    <div className="relative w-12 h-12">
                      <Image 
                        src={review.userPhoto} 
                        alt={review.userName} 
                        fill 
                        className="rounded-full object-cover" 
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex text-black mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 italic">&quot;{review.comment}&quot;</p>
                      <h4 className="font-bold text-sm uppercase tracking-widest">{review.userName}</h4>
                      <p className="text-xs text-gray-400 mt-1">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No reviews yet for this product.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-4 mt-12 justify-start border-t border-gray-300 pt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-6 py-2 border border-black text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 hover:bg-black hover:text-white transition-all"
              >
                Prev
              </button>
              <span className="self-center text-[10px] font-bold uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-6 py-2 border border-black text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 hover:bg-black hover:text-white transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-sm w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-serif mb-6 border-b pb-4 text-[#1a1a1a]">Share Your Experience</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={24}
                      className="cursor-pointer"
                      fill={num <= rating ? "#1a1a1a" : "none"}
                      onClick={() => setRating(num)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">Your Review</label>
                <textarea name="review" required className="w-full border border-gray-200 p-4 text-sm focus:outline-none focus:border-black min-h-[120px]"></textarea>
              </div>
              <div className="flex gap-6 justify-end items-center">
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cancel</button>
                <button type="submit" className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em]">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;