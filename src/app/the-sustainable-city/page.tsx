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
import { Leaf, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function SustainableCityPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="The Sustainable City"
        tagline="ECO-INNOVATION • ZERO-CARBON LUXURY"
        description=" Live smarter at The Sustainable City Oman, where eco-friendly villas, smart homes and premium apartments create a healthier, sustainable lifestyle. Whether you are looking to buy property in Sustainable City in Oman or secure a future-ready investment in Oman, this green community offers freehold ownership, world-class amenities and lasting value."
        image="/p2.jpg"
        primaryCta={{ text: "Explore Green Estates", href: "/property-search?communities=Sustainable%20City" }}
        secondaryCta={{ text: "Sustainability Report", href: "#contact" }}
      />

      <LuxEditorial
        badge="The Green Manifesto"
        title="Why invest in The Sustainable City"
        content=" Muscat Bay offers a rare combination of luxury, location, and long-term value, making it one of the best places to buy property in Oman. Located just minutes from central Muscat and surrounded by the Arabian Sea and the Al Hajar Mountains, this exclusive waterfront community offers freehold ownership for eligible local and international buyers. From luxury beachfront villas to premium sea view apartments, Muscat Bay features world-class amenities, strong rental demand, and excellent capital appreciation, making it an outstanding choice for luxury property investment in Oman."
        image="/p4.jpg"
      />

      <LuxStatGrid
        title="The Efficiency Metrics"
        subtitle="Quantifying the impact of sustainable luxury."
        stats={[
          { label: "Carbon Footprint", value: "Zero", unit: "Net" },
          { label: "Energy Savings", value: "40", unit: "%" },
          { label: "Green Space", value: "50", unit: "%" },
          { label: "Investment Score", value: "9.1", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
             The Sustainable City<span className="text-gold italic">Investment Highlights</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title=" Eco-Friendly Homes"
              description="Buy property in The Sustainable City Oman with eco-friendly and smart homes that reduce energy costs, promote healthier living and deliver long-term property value."
            />
            <LuxInvestmentCard
              icon={Zap}
              title="Freehold Ownership"
              description=" Own freehold property in Sustainable City with luxury villas and premium apartments, offering secure ownership for local and international property buyers."
            />
            <LuxInvestmentCard
              icon={Leaf}
              title="Smart Community"
              description=" Live in a smart community with green spaces, premium amenities, and sustainable design, creating one of the most desirable eco-friendly lifestyles in Oman."
            />
            <LuxInvestmentCard
              icon={ShieldCheck}
              title="String Investment"
              description=" Property in The Sustainable City offers strong investment potential through sustainable living, rising demand, and premium homes built for long-term value."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="Pure Living"
        title="Key Reasons to Invest"
        content="Eco-friendly lifestyle with solar energy, recycled water, and green mobility.Close to Muscat city, beaches, and the international airport.High return on investment due to rising demand for sustainable homes.Freehold property ownership available for all nationalities.Equipped with smart infrastructure and modern amenities.Safe, family-friendly community with parks, schools, andhealthcare.Multiple options including villas, townhouses, and apartments for sale in Muscat."
        image="/p1.jpg"
      />

      <LuxFeaturedProperties
        communitySlug="the-sustainable-city"
        title="Eco-Luxury Estates"
      />

      <LuxTimeline
        title="The Roadmap to Zero"
        items={[
          { year: "The Concept", title: "Ideation", description: "The vision to create Oman's first fully sustainable urban center.", type: 'past' },
          { year: "The Launch", title: "Infrastructure", description: "Deployment of the solar-grid and water reclamation systems.", type: 'present' },
          { year: "The Horizon", title: "Net-Zero", description: "Achieving full carbon neutrality and global certification.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="Sustaining Beauty"
        images={["/p2.jpg", "/p3.jpg", "/p4.jpg", "/p1.jpg", "/p5.jpg", "/p6.jpg"]}
      />

      <LuxLocationMap
        title="The Green Heart"
        center={{ lat: 23.55, lng: 58.40 }}
        landmarks={[
          { name: "Muscat City Centre", distance: "10 km", time: "12 mins" },
          { name: "Botanical Gardens", distance: "2 km", time: "5 mins" },
          { name: "International Airport", distance: "15 km", time: "15 mins" },
          { name: "Sustainable Hub", distance: "0 km", time: "0 mins" },
        ]}
      />

      <LuxFAQ
  title="FAQ's"
  faqs={[
    {
      question: "What is The Sustainable City – Yiti in Oman?",
      answer:
        "The Sustainable City Yiti is Oman’s first fully integrated eco-city featuring villas and apartments with solar power, water recycling, vertical farms and net-zero carbon design.",
    },
    {
      question: "What is the Yiti price range?",
      answer:
        "Starting prices are around OMR 66,000, while large luxury villas can reach approximately OMR 450,000 depending on size, location and finishes.",
    },
    {
      question: "Is there a payment plan for Yiti properties?",
      answer:
        "Yes. The Sustainable City offers a flexible 30/70 payment plan with 5% booking, staged construction payments and the remaining balance upon handover.",
    },
    {
      question: "Can expats buy property in Yiti Oman?",
      answer:
        "Yes. Eligible expatriates can purchase freehold property in The Sustainable City Yiti and may qualify for Oman's investor residency program, subject to current government regulations.",
    },
    {
      question: "What types of sustainable villas are available?",
      answer:
        "The Sustainable City offers 3 and 4-bedroom eco-friendly villas with private gardens, smart home technology, energy-efficient systems and sustainable architectural design.",
    },
    {
      question: "What property types are available in The Sustainable City?",
      answer:
        "The community features apartments, townhouses and luxury villas designed around sustainable living principles with premium amenities and green spaces.",
    },
    {
      question: "Can I rent property in The Sustainable City?",
      answer:
        "Yes. Apartments and villas are expected to be available for both long-term rentals and premium leasing opportunities as the community continues to develop.",
    },
    {
      question: "Why invest in The Sustainable City Oman?",
      answer:
        "Investing in The Sustainable City offers sustainable living, smart infrastructure, freehold ownership, lower operating costs and excellent long-term capital appreciation potential.",
    },
    {
      question: "Is The Sustainable City Oman a good investment?",
      answer:
        "Yes. The Sustainable City Oman is one of the country's most future-focused real estate developments, combining sustainable living, freehold ownership and strong long-term investment potential.",
    },
  ]}
/>

      <LuxRelatedCommunities
        currentSlug="the-sustainable-city"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Pioneer the Future"
        subtitle="Join the movement toward a zero-carbon future. Secure your piece of Oman's most innovative luxury community."
        primaryCta={{ text: "Request Green Brochure", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
