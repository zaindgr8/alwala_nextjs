import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Testimonials from "@/components/home/Testimonials";
import WhyInvestOman from "@/components/home/WhyInvestOman";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import TopCommunities from "@/components/home/TopCommunities";
import WhoWeAre from "@/components/home/WhoWeAre";
import BuySellSection from "@/components/home/BuySellSection";
import OurPartners from "@/components/home/OurPartners";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar  />

      <Hero />
      <TrustBar />
      
      <WhyInvestOman />
      <TopCommunities />
      <FeaturedProperties />
      
      <WhoWeAre />
      <BuySellSection />

      <OurPartners />
      <Testimonials />
      <FinalCTA />

      <Footer />
    </main>
  );
}

