"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const useAllOrders = (page = 1, limit = 10) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: orderResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AllOrders", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/payment?page=${page}&limit=${limit}`,
      );
      return res.data;
    },

    staleTime: 5000,
  });

  return {
    orders: orderResponse?.data?.orders || [],
    pagination: orderResponse?.data?.pagination || {
      totalPages: 1,
      currentPage: 1,
    },
    refetch,
    isLoading,
    isError,
  };
};

export default useAllOrders;
