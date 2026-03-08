import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProductReviews = (productId, page = 1) => {
  const axiosPublic = useAxiosPublic();

  // queryKey-তে productId এবং page রাখা হয়েছে যাতে পেজ চেঞ্জ হলে ডেটা নতুন করে ফেচ হয়
  const { refetch, data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews", productId, page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/reviews/${productId}`, {
        params: { page } 
      });
      return res.data;
    },
    enabled: !!productId, 
    keepPreviousData: true, 
  });

  return { 
    reviews: data?.reviews || [], 
    totalPages: data?.totalPages || 1, 
    totalReviews: data?.totalReviews || 0, 
    refetch, 
    isLoading,
    isError,
    error 
  };
};

export default useProductReviews;