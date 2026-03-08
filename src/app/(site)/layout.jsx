// src/app/(site)/layout.jsx

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}