"use client"; 

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Raleway } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";


const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={raleway.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              
                {children}
                
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}