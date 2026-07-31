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
import { Mountain, Waves, ShieldCheck, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function MuscatBayPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Muscat Bay"
        tagline="SOPHISTICATED SERENITY • PEAKS & WATERS"
        description="Beachfront villas and sea-view apartments nestled between the Al Hajar Mountains and the Arabian Sea. Oman's most coveted coastal address."
        image="/communities/Muscat Bay/image.png"
        primaryCta={{ text: "View Exclusive Villas", href: "/property-search?communities=Muscat%20Bay" }}
        secondaryCta={{ text: "Request Private Guide", href: "#contact" }}
      />

      <LuxEditorial
  badge="The Sanctuary"
  title="Why Invest in Muscat Bay"
  content="Muscat Bay is where luxury meets lasting value, offering an exclusive collection of waterfront homes in one of Oman’s most sought-after coastal communities. Whether you are looking for villas for sale in Muscat Bay or modern apartments for sale in Muscat Bay, every residence combines breathtaking sea views, world-class amenities, freehold ownership and outstanding long-term investment potential."
  image="/communities/Muscat Bay/image (1).png"
/>

      <LuxStatGrid
        title="The Essence of Exclusivity"
        subtitle="A rare intersection of nature and high-end architectural engineering."
        stats={[
          { label: "Private Beach", value: "1.8", unit: "km" },
          { label: "Freehold", value: "100", unit: "%" },
          { label: "Avg. Annual ROI", value: "7", unit: "%+" },
          { label: "Completion", value: "2026", unit: "" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
               Key Reasons to Invest <span className="text-gold italic"> in Muscat Bay</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <LuxInvestmentCard
  icon={TrendingUp}
  title="Prime Waterfront Location"
  description="Own property in one of Muscat’s most exclusive waterfront destinations, offering breathtaking sea views, privacy and strong long-term property value."
/>

<LuxInvestmentCard
  icon={Mountain}
  title="Luxury Villas & Apartments"
  description="Choose from luxury villas and premium apartments in Muscat Bay, designed with modern architecture, world-class amenities and exceptional coastal living."
/>

<LuxInvestmentCard
  icon={Waves}
  title="Freehold Ownership"
  description="Eligible buyers can enjoy freehold ownership in Muscat Bay, making it a secure choice for both homeowners and international property investors."
/>

<LuxInvestmentCard
  icon={ShieldCheck}
  title="Strong Investment Potential"
  description="High rental demand, limited beachfront supply and premium location make Muscat Bay one of the best places for long-term property investment in Oman."
/>
          </div>
        </div>
      </div>

      <LuxEditorial
  reverse
  badge="Coastal Lifestyle"
  title="Life at the Water's Edge"
  content="Experience the finest luxury coastal living at Muscat Bay, where beachfront villas, sea view apartments and premium waterfront residences come together in one of Oman's most exclusive communities. Surrounded by the Arabian Sea, private beaches and world-class amenities, Muscat Bay offers an exceptional lifestyle with lasting value for homeowners and property investors."
  image="/communities/Muscat Bay/image.png"
/>

      <LuxFeaturedProperties
        communitySlug="muscat-bay"
        title="Secluded Estates"
      />

      <LuxTimeline
        title="The Evolution of Serenity"
        items={[
          { year: "Phase I", title: "The Foundation", description: "Delivery of the first signature beachfront villas, private beach access, and core community infrastructure.", type: 'past' },
          { year: "Phase II", title: "The Expansion", description: "Launch of the beach club, waterfront promenade, wellness centre, and expanded apartment residences.", type: 'present' },
          { year: "2026+", title: "The Pinnacle", description: "Completion of the marina, fine-dining precinct, and Muscat Bay's final collection of ultra-premium residences.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="A Visual Symphony"
        images={["/communities/Muscat Bay/image.png", "/communities/Muscat Bay/image (1).png", "/communities/Muscat Bay/image.png", "/communities/Muscat Bay/image (1).png", "/communities/Muscat Bay/image.png", "/communities/Muscat Bay/image (1).png"]}
      />

      <LuxLocationMap
        title="Sovereign Location"
        center={{ lat: 23.45, lng: 58.48 }}
        landmarks={[
          { name: "Muscat City Center", distance: "25 km", time: "20 mins" },
          { name: "Al Hajar Mountains", distance: "0 km", time: "0 mins" },
          { name: "Luxury Yacht Club", distance: "2 km", time: "5 mins" },
          { name: "Private Beach", distance: "0 km", time: "0 mins" },
        ]}
      />

     <LuxFAQ
  title="FAQ's"
  faqs={[
    {
      question: "What makes Muscat Bay the best resort village in Oman?",
      answer:
        "Muscat Bay stands out as one of the best resort villages in Oman thanks to its unique blend of luxury, nature and modern living. Nestled between the Al Hajar Mountains and the Gulf of Oman, it offers an exceptional coastal lifestyle."
    },
    {
      question: "What types of properties are available in Muscat Bay?",
      answer:
        "Muscat Bay offers luxury villas, sea view apartments and premium waterfront residences designed for homeowners, holiday buyers and long-term property investors."
    },
    {
      question: "Can foreigners buy property in Muscat Bay?",
      answer:
        "Yes. Eligible international buyers can purchase freehold property in Muscat Bay under Oman's approved real estate regulations, with potential residency benefits for qualifying investments."
    },
    {
      question: "Are there villas for sale in Muscat Bay?",
      answer:
        "Yes. Muscat Bay features luxury beachfront villas with spacious layouts, private surroundings, premium amenities and breathtaking Arabian Sea views."
    },
    {
      question: "Why choose Bay Village at Muscat Bay for your stay?",
      answer:
        "Bay Village at Muscat Bay offers family-friendly resorts, luxury accommodation and a relaxed coastal lifestyle, making it ideal for travelers, residents and investors."
    },
    {
      question: "Why is Muscat Bay a top travel destination in Oman?",
      answer:
        "Muscat Bay combines scenic beauty, luxury living and cultural richness, offering visitors world-class dining, leisure activities, beaches and a premium lifestyle experience."
    },
    {
      question: "Are apartments for sale available in Muscat Bay?",
      answer:
        "Yes. Muscat Bay offers modern sea view apartments with contemporary designs, resort-style facilities and direct access to one of Muscat's most exclusive coastal communities."
    },
    {
      question: "Are there beachfront villas available in Muscat Bay?",
      answer:
        "Yes. Muscat Bay features stunning beachfront villas with panoramic sea views, private beach access and spacious luxury living."
    },
    {
      question: "Where is Muscat Bay located?",
      answer:
        "Muscat Bay is located on the coast of Muscat, surrounded by the Al Hajar Mountains and the Arabian Sea, offering a unique blend of natural beauty and luxury living."
    },
    {
      question: "What amenities are available in Muscat Bay?",
      answer:
        "Residents enjoy private beach access, swimming pools, fitness facilities, fine dining, landscaped spaces and resort-style amenities designed for luxury coastal living."
    },
    {
      question: "Can I invest in real estate in Muscat Bay?",
      answer:
        "Absolutely. Muscat Bay offers luxury villas, apartments and investment-friendly freehold properties, making it an excellent choice for long-term real estate investment in Oman."
    },
    {
      question: "Can I rent apartments in Muscat Bay?",
      answer:
        "Yes. Muscat Bay apartments are available for both holiday rentals and long-term leasing through various local and international platforms."
    },
    {
      question: "Is Muscat Bay suitable for family vacations?",
      answer:
        "Yes. Muscat Bay is one of the most family-friendly resorts in Oman, offering a safe environment, kids' activities, spacious accommodation and a premium coastal lifestyle."
    }
  ]}
/>

      <LuxRelatedCommunities
        currentSlug="muscat-bay"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Escape to Excellence"
        subtitle="Private viewings of our most secluded villas are now available. Step into a world of absolute serenity."
        primaryCta={{ text: "Schedule Private Tour", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
