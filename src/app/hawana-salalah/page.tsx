'use client';

import React from 'react';
import LuxHero from '@/components/communities/primitives/LuxHero';
import LuxEditorial from '@/components/communities/primitives/LuxEditorial';
import LuxStatGrid from '@/components/communities/primitives/LuxStatGrid';
import LuxInvestmentCard from '@/components/communities/primitives/LuxInvestmentCard';
import LuxGallery from '@/components/communities/primitives/LuxGallery';
import LuxTimeline from '@/components/communities/primitives/LuxTimeline';
import LuxFAQ from '@/components/communities/primitives/LuxFAQ';
import LuxLocationMap from '@/components/communities/primitives/LuxLocationMap';
import LuxCTA from '@/components/communities/primitives/LuxCTA';
import LuxFeaturedProperties from '@/components/communities/primitives/LuxFeaturedProperties';
import LuxRelatedCommunities from '@/components/communities/primitives/LuxRelatedCommunities';
import { Anchor, Palmtree, TrendingUp, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function HawanaSalalahPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Hawana Salalah"
        tagline="SOVEREIGN SHORES • THE JEWEL OF THE SOUTH"
        description=" Hawana Salalah offers luxury villas, beachfront apartments, and lagoon homes in Oman's leading resort community, perfect for holiday homes, family living, and long-term property investment. "
        image="/communities/Hawana Salalah/1 (1).jpg"
        primaryCta={{ text: "View Waterfront Estates", href: "/property-search?communities=Hawana%20Salalah" }}
        secondaryCta={{ text: "Request Exclusive Brochure", href: "#contact" }}
      />

      <LuxEditorial
        badge="The Southern Prestige"
        title="Why Invest in Hawana Salalah"
        content="Hawana Salalah is more than a resort, it's a fully integrated community with strong investment potential. The real estate market here is rapidly growing due to its luxurious amenities, modern infrastructure, and high tourism demand. From Hawana Salalah resort homes to luxury villas, every property is crafted for quality and comfort. If you’re planning to buy a house in Oman, Hawana Salalah offers a safe, luxurious, and high-return option in one of the country’s most beautiful coastal zones."
        image="/communities/Hawana Salalah/1 (1).png"
      />

      <LuxStatGrid
        title="The Metrics of the South"
        subtitle="Analyzing the potential of Oman's premier southern destination."
        stats={[
          { label: "Beachfront", value: "Prime", unit: "" },
          { label: "ROI Potential", value: "8.5", unit: "%" },
          { label: "Luxury Units", value: "1,000+", unit: "Units" },
          { label: "Investment Score", value: "9.0", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Why Hawana is a <span className="text-gold italic">Strategic Asset</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="Tourism-Driven Growth"
              description="The exponential rise of luxury tourism in Salalah ensures a constant stream of high-end rental demand throughout the year."
            />
            <LuxInvestmentCard
              icon={Anchor}
              title="Waterfront Scarcity"
              description="Directly accessible beachfront properties are the most resilient assets in real estate, offering permanent value and prestige."
            />
            <LuxInvestmentCard
              icon={Palmtree}
              title="The Khareef Effect"
              description="The unique seasonal climate of Salalah creates a specific high-demand window that drives premium short-term rental yields."
            />
            <LuxInvestmentCard
              icon={ShieldCheck}
              title="Institutional Quality"
              description="Developed with world-class standards, ensuring that the infrastructure and amenities maintain their value over generations."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="Sovereign Living"
        title="Top Locations in Hawana Salalah"
        content="Hawana Salalah is home to some of Oman's most desirable waterfront locations, featuring luxury villas, beachfront apartments, marina residences, and lagoon homes. Every location offers a unique lifestyle, premium amenities, and excellent opportunities to buy property in Hawana Salalah.
Marina Residences,
Lagoon Residences,
Beachfront Villas,
Fanar Residences,
and Rotana Residences
"
        image="/communities/Hawana Salalah/1 (2).png"
      />

      <LuxFeaturedProperties
        communitySlug="hawana-salalah"
        title="Waterfront Collections"
      />

      <LuxTimeline
        title="A Journey of Excellence"
        items={[
          { year: "The Vision", title: "The Masterplan", description: "Conceptualizing a world-class integrated resort and residential community in the south.", type: 'past' },
          { year: "The Rise", title: "Phased Delivery", description: "The opening of the first luxury hotels and the most exclusive beachfront villas.", type: 'present' },
          { year: "The Future", title: "The Global Hub", description: "Becoming a primary destination for global luxury travelers and high-net-worth residents.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="The Visual Portfolio"
        images={["/communities/Hawana Salalah/1 (1).jpg", "/communities/Hawana Salalah/1 (1).png", "/communities/Hawana Salalah/1 (2).png", "/communities/Hawana Salalah/1 (3).png", "/communities/Hawana Salalah/1 (1).jpg", "/communities/Hawana Salalah/1 (1).png"]}
      />

      <LuxLocationMap
        title="The Southern Gateway"
        center={{ lat: 17.21, lng: 54.05 }}
        landmarks={[
          { name: "Salalah Int Airport", distance: "15 km", time: "12 mins" },
          { name: "The Marina", distance: "0 km", time: "0 mins" },
          { name: "Sultan Qaboos Mosque", distance: "10 km", time: "15 mins" },
          { name: "Mughsail Beach", distance: "30 km", time: "25 mins" },
        ]}
      />

      <LuxFAQ
       title="FAQ's"
        faqs={[
  {
    question: "Why do property buyers choose Hawana Salalah?",
    answer:
      "Buyers choose Hawana Salalah for its beachfront lifestyle, premium residences, freehold ownership, and long-term investment potential.",
  },
  {
    question: "Which properties are available in Hawana Salalah?",
    answer:
      "Hawana Salalah offers luxury villas, beachfront apartments, marina residences, lagoon homes, and waterfront properties.",
  },
  {
    question: "Is Hawana Salalah a good place to buy a holiday home?",
    answer:
      "Yes, Hawana Salalah is one of the best destinations in Oman for holiday homes, offering year-round resort-style living and exceptional coastal experiences.",
  },
  {
    question: "Can foreign buyers purchase property in Hawana Salalah?",
    answer:
      "Yes, eligible international buyers can purchase freehold property in Hawana Salalah under Oman's Integrated Tourism Complex (ITC) regulations.",
  },
  {
    question: "How does Hawana Salalah support property investment?",
    answer:
      "Growing tourism, premium waterfront locations, and strong rental demand make Hawana Salalah a valuable long-term real estate investment.",
  },
  {
    question: "What lifestyle can residents enjoy in Hawana Salalah?",
    answer:
      "Residents enjoy private beaches, marina facilities, luxury resorts, restaurants, walking trails, and a relaxed coastal lifestyle.",
  },
  {
    question: "Are beachfront properties available in Hawana Salalah?",
    answer:
      "Yes, Hawana Salalah features beachfront villas, waterfront apartments, and lagoon-view residences within a premium resort community.",
  },
  {
    question: "Who should buy property in Hawana Salalah?",
    answer:
      "Hawana Salalah is ideal for families, holiday home buyers, retirees, and investors looking for luxury coastal property in Oman.",
  },
  {
    question: "Why is Hawana Salalah different from other waterfront developments in Oman?",
    answer:
      "Its tropical climate, natural lagoons, luxury resorts, and year-round tourism create a unique lifestyle unlike any other waterfront destination in Oman.",
  },
  {
    question: "Does Hawana Salalah offer lagoon-view properties?",
    answer:
      "Yes, buyers can choose from premium lagoon-view apartments and waterfront homes with spectacular scenic views.",
  },
  {
    question: "Is Hawana Salalah suitable for short-term rental investment?",
    answer:
      "Yes, Hawana Salalah attracts holiday visitors throughout the year, creating strong demand for short-term rental properties and excellent rental income potential.",
  },
  {
    question: "Can I buy a second home in Hawana Salalah?",
    answer:
      "Yes, Hawana Salalah is one of Oman's most popular destinations for second homes, vacation properties, and luxury waterfront living.",
  },
  {
    question: "What is the best property to buy in Hawana Salalah?",
    answer:
      "Luxury villas, beachfront apartments, and lagoon residences are among the most sought-after property options in Hawana Salalah.",
  },
  {
    question: "Why is Hawana Salalah popular with international buyers?",
    answer:
      "International buyers value Hawana Salalah for its freehold ownership, waterfront lifestyle, premium resort community, and strong long-term investment opportunities.",
  },
]}
      />

      <LuxRelatedCommunities
        currentSlug="hawana-salalah"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Claim Your Paradise"
        subtitle="The most prestigious address in the south is now available for a select few. Secure your legacy in Hawana Salalah."
        primaryCta={{ text: "Request Private Viewing", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
