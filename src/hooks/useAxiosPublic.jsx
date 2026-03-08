"use client";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://beautyzone-nextjs-server.vercel.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
