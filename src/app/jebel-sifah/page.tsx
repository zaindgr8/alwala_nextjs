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
import { Wind, Sun, ShieldCheck, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function JebelSifahPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Jebel Sifah"
        tagline="COASTAL ESCAPE • NATURE'S LUXURY"
        description="Buy Property in Jebel Sifah with luxury and marina apartments for sale, offering beachfront living, championship golf and exceptional long-term investment value."
        image="/communities/Jebel Sifah/1 (1).png"
        primaryCta={{ text: "View Secluded Estates", href: "/property-search?communities=Jebel%20Sifah" }}
        secondaryCta={{ text: "Request Site Map", href: "#contact" }}
      />

      <LuxEditorial
        badge="The Hidden Retreat"
        title="Why Invest In Jebel Sifah"
        content="Investing in Jebel Sifah means owning a piece of a thoughtfully planned, luxurious resort town. It’s perfect for both living and holiday rental income, especially with increasing demand for property for sale in Jebel Sifah. The region offers strong potential for value appreciation, backed by tourism growth and continuous infrastructure upgrades."
        image="/communities/Jebel Sifah/1 (2).png"
      />

      <LuxStatGrid
        title="The Metrics of Peace"
        subtitle="Defining luxury through the lens of nature and seclusion."
        stats={[
          { label: "Beach Privacy", value: "Absolute", unit: "" },
          { label: "Mountain Views", value: "360", unit: "Deg" },
          { label: "Air Quality", value: "Pure", unit: "" },
          { label: "Investment Score", value: "8.8", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
             Key Reason to Buy<span className="text-gold italic">Property in Jebel Sifah</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="Beachfront Property "
              description="Own beachfront property in Jebel Sifah with direct beach access, breathtaking sea views, and one of Oman's most desirable waterfront communities."
            />
            <LuxInvestmentCard
              icon={Sun}
              title="Luxury Villas & Apartments "
              description="Choose from luxury villas and apartments for sale in Jebel Sifah, designed for holiday living, family life, and long-term property investment. "
            />
            <LuxInvestmentCard
              icon={Wind}
              title="Freehold Ownership"
              description="Buy property in Jebel Sifah with freehold ownership, giving eligible local and international buyers a secure long-term real estate investment."
            />
            <LuxInvestmentCard
              icon={ShieldCheck}
              title=" Strong Investment Value"
              description="Jebel Sifah Property continues to attract buyers with growing tourism, rental demand, championship golf, and premium marina living."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="Luxe Escape"
        title="Luxury Coastal Living in Jebel Sifah"
        content=" Luxury villas, marina apartments, private beach access, and championship golf make Jebel Sifah one of Oman's most desirable waterfront communities. Every home is designed to deliver exceptional coastal living, everyday comfort, and a premium lifestyle surrounded by nature."
        image="/communities/Jebel Sifah/1 (3).png"
      />

      <LuxFeaturedProperties
        communitySlug="jebel-sifah"
        title="Secluded Sanctuaries"
      />

      <LuxTimeline
        title="A Natural Evolution"
        items={[
          { year: "Origins", title: "The Discovery", description: "Identifying the unique geological intersection of peaks and waters as a potential luxury retreat.", type: 'past' },
          { year: "Present", title: "The Awakening", description: "The launch of curated villa collections and high-end hospitality services.", type: 'present' },
          { year: "Future", title: "The Ultimate Retreat", description: "Completion of the full-service luxury wellness and eco-resort network.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="The Raw Beauty"
        images={["/communities/Jebel Sifah/1 (1).png", "/communities/Jebel Sifah/1 (2).png", "/communities/Jebel Sifah/1 (3).png", "/communities/Jebel Sifah/1 (4).png", "/communities/Jebel Sifah/1 (5).png", "/communities/Jebel Sifah/1 (1).png"]}
      />

      <LuxLocationMap
        title="Secluded Yet Accessible"
        center={{ lat: 23.21, lng: 58.62 }}
        landmarks={[
          { name: "Muscat Int Airport", distance: "50 km", time: "40 mins" },
          { name: "Sifah Beach", distance: "0 km", time: "0 mins" },
          { name: "Coastal Trail", distance: "2 km", time: "10 mins" },
          { name: "Nearby Fishing Village", distance: "5 km", time: "10 mins" },
        ]}
      />

     <LuxFAQ
  title="FAQ's"
  faqs={[
    {
      question: "Is Jebel Sifah a freehold property in Oman?",
      answer:
        "Yes, Jebel Sifah is an Integrated Tourism Complex (ITC) where eligible foreign buyers can purchase freehold property, subject to Oman's property regulations.",
    },
    {
      question: "What types of properties are available in Jebel Sifah?",
      answer:
        "Jebel Sifah offers luxury villas, beachfront homes, marina apartments, townhouses, and golf-view residences for homeowners and property investors.",
    },
    {
      question: "Is Jebel Sifah suitable for holiday homes?",
      answer:
        "Yes, Jebel Sifah is one of Oman's leading holiday home destinations, offering private beaches, a marina, golf facilities, and year-round resort-style living.",
    },
    {
      question: "Does Jebel Sifah offer a payment plan?",
      answer:
        "Yes, selected villas and apartments in Jebel Sifah are available with flexible payment plans. Payment options may vary depending on the property and developer.",
    },
    {
      question: "Can foreigners buy property in Jebel Sifah Oman?",
      answer:
        "Yes, eligible international buyers can buy freehold property in Jebel Sifah through Oman's Integrated Tourism Complex (ITC) framework.",
    },
    {
      question: "How far is Jebel Sifah from Muscat?",
      answer:
        "Jebel Sifah is approximately 45 minutes from Muscat, offering a peaceful coastal lifestyle while remaining conveniently connected to the city.",
    },
    {
      question: "Is Jebel Sifah a good investment in Oman?",
      answer:
        "Jebel Sifah is one of Oman's most attractive coastal investment destinations, offering freehold ownership, luxury waterfront living, strong rental demand, and excellent long-term capital appreciation.",
    },
    {
      question: "Can buying property in Jebel Sifah help with Oman residency?",
      answer:
        "Eligible property investments may qualify buyers for Oman Residency by Investment, subject to the latest government regulations and investment requirements.",
    },
    {
      question: "Are there beachfront villas for sale in Jebel Sifah?",
      answer:
        "Yes, Jebel Sifah features luxury beachfront villas for sale with direct beach access, premium amenities, and stunning Arabian Sea views.",
    },
    {
      question: "Are marina apartments available in Jebel Sifah?",
      answer:
        "Yes, buyers can choose from modern marina apartments for sale in Jebel Sifah, offering waterfront views, resort-style facilities, and outstanding investment potential.",
    },
    {
      question: "Is Jebel Sifah a good place to live year-round?",
      answer:
        "Yes, Jebel Sifah is ideal for year-round living, with a secure community, modern amenities, private beaches, golf facilities, and a peaceful waterfront lifestyle.",
    },
    {
      question: "Who is the developer of Jebel Sifah?",
      answer:
        "Jebel Sifah is a master-planned waterfront development by Muriya, developed in partnership with Omran to create one of Oman's premier coastal destinations.",
    },
  ]}
/>

      <LuxRelatedCommunities
        currentSlug="jebel-sifah"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Rediscover Your Peace"
        subtitle="The most exclusive escape in Oman is waiting. Step away from the world and into the luxury of nature."
        primaryCta={{ text: "Request a Private Visit", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
