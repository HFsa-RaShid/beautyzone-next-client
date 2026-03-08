import Hero from "@/components/Pages/LandingPage/Hero";
import Bestsellers from "@/components/Pages/LandingPage/Bestsellers";
import NewArrival from "@/components/Pages/LandingPage/NewArrival";
import ShopByCategory from "@/components/Pages/LandingPage/ShopByCategory";
import SkincarePhilosophy from "@/components/Pages/LandingPage/SkincarePhilosophy";
import Testimonials from "@/components/Pages/LandingPage/Testimonials";
import Newsletter from "@/components/shared/Newsletter";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Bestsellers />
      <ShopByCategory></ShopByCategory>
      <NewArrival />
      <SkincarePhilosophy />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
