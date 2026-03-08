"use client";

import { createContext, useEffect, useState, useContext } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosPublic.get("/api/auth/current-user");
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    registerUser: async (name, email, password) => {
      const res = await axiosPublic.post("/api/auth/register", { name, email, password });
      setUser(res.data.user);
      return res.data;
    },
    loginUser: async (email, password) => {
      const res = await axiosPublic.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return res.data;
    },
    logout: async () => {
      await axiosPublic.post("/api/auth/logout");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};