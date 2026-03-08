"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllProducts = (page = 1, limit = 12) => {
  const axiosPublic = useAxiosPublic();
  
  const { refetch, data: allProducts = null, isLoading, isError } = useQuery({
    queryKey: ["AllProducts", page, limit], 
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/products`, {
        params: { page, limit }
      });
      return res.data;
    },
  });

  return { allProducts, refetch, isLoading, isError };
};

export default useAllProducts;