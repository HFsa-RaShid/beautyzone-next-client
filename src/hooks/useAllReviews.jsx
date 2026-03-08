"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: reviews = null, isLoading, isError } = useQuery({
    queryKey: ["AllReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/reviews`);
      return res.data;
    },
    enabled: true,
  });

  return { reviews, refetch, isLoading, isError };
};

export default useAllReviews;