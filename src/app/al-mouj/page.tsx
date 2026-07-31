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
import LuxConversionBanner from '@/components/communities/primitives/LuxConversionBanner';
import { Anchor, Trophy, ShieldCheck, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function AlMoujPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Al Mouj Muscat"
        tagline="PRESTIGIOUS WATERFRONT LIVING • WORLD-CLASS GOLF"
        description="Luxury villas, marina apartments and waterfront homes in one of Oman's most prestigious coastal communities — built for premium living and lasting investment value."
        image="/communities/Al Mouj/1 (1).jpg"
        primaryCta={{ text: "Explore the Portfolio", href: "/property-search?communities=Al%20Mouj" }}
        secondaryCta={{ text: "Request Brochure", href: "#contact" }}
      />

      {/* ── CONVERSION 1: Subtle strip immediately after hero scroll ── */}
      <LuxConversionBanner
        headline="Ready to explore Al Mouj listings? Talk to an advisor today."
        subtext="Free consultation • No obligation • Available 7 days"
        variant="subtle"
      />

      <LuxEditorial
        badge="The Waterfront Legacy"
        title="Why Invest in Al Mouj"
        content="Al Mouj Muscat is one of Oman's most popular and well-known places to buy property. It offers a mix of luxury living, great lifestyle, and strong investment value. Located on a beautiful part of the Muscat coast, Al Mouj includes freehold homes for foreigners, a world-class marina, a top golf course, five-star hotels, and many shops and restaurants. The area is carefully planned, with modern buildings and natural surroundings, making it attractive to both buyers and investors from around the world. With high rental demand, growing property prices, and solid infrastructure, Al Mouj is a smart and safe place to invest in Oman."
        image="/communities/Al Mouj/1 (1).png"
      />

      <LuxStatGrid
        title="The Metrics of Prestige"
        subtitle="A rare combination of scale, scarcity, and strategic value."
        stats={[
          { label: "Total Area", value: "4", unit: "Million Sqm" },
          { label: "Waterfront", value: "12", unit: "Kilometers" },
          { label: "Golf Holes", value: "18", unit: "Holes" },
          { label: "Investment Score", value: "9.8", unit: "/10" },
        ]}
      />

      {/* ── CONVERSION 2: Bold gold band after stats — high credibility moment ── */}
      <LuxConversionBanner
        headline="Secure your Al Mouj property before prices rise further."
        subtext="Our advisors have exclusive access to off-market listings and pre-launch units."
        variant="bold"
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Why Al Mouj is the <span className="text-gold italic">Ultimate Asset</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="Luxury Waterfront Homes"
              description="Choose from luxury villas, marina apartments, and waterfront homes in Al Mouj Oman, designed for premium coastal living and long-term property value."
            />
            <LuxInvestmentCard
              icon={Trophy}
              title="Freehold Ownership"
              description="Buy property in Al Mouj with freehold ownership, offering eligible local and international buyers a secure investment in one of Oman's most prestigious communities."
            />
            <LuxInvestmentCard
              icon={Anchor}
              title="The Marina Lifestyle"
              description="Direct access to the Arabian Gulf and professional yachting facilities creates a unique asset class with global appeal."
            />
            <LuxInvestmentCard
              icon={ShieldCheck}
              title="Safe Haven Asset"
              description="Managed by world-class operators with a proven track record of maintaining luxury standards and asset longevity."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="Curated Experience"
        title="Key Reasons to Invest"
        content="Freehold for Foreigners – Foreign buyers can own property with full ownership rights.
Luxury Lifestyle – Enjoy top facilities like a marina, golf course, five-star hotels, and fine dining.
Strong Rental Demand – High demand from locals, expats, and tourists ensures good rental returns.
Rising Property Values – Property prices are steadily increasing, offering strong capital growth.
Modern Infrastructure – Al Mouj is a master-planned community with excellent roads, utilities, and services.
Safe Investment – Backed by government support and a growing real estate market in Oman.
"
        image="/communities/Al Mouj/1 (2).jpg"
      />

      {/* ── CONVERSION 3: After investment reasons — buyer is most convinced here ── */}
      <LuxConversionBanner
        headline="Speak with an Al Mouj specialist — we'll match you to the right unit."
        subtext="Villas, marina apartments, golf-view homes — tell us your budget and we'll do the rest."
        variant="bold"
        showWhatsApp={true}
      />

      <LuxFeaturedProperties
        communitySlug="al-mouj"
        title="Curated Residences"
      />

      <LuxTimeline
        title="A Legacy in Motion"
        items={[
          { year: "2010", title: "The Vision", description: "The conceptualization of Oman's first integrated waterfront community, blending modernism with Omani heritage.", type: 'past' },
          { year: "2015", title: "Operational Excellence", description: "Full launch of the Marina and the first residential enclaves, setting the benchmark for luxury in Muscat.", type: 'past' },
          { year: "2026", title: "The New Era", description: "Introduction of ultra-luxury penthouse collections and smart-city infrastructure integration.", type: 'present' },
          { year: "2030", title: "Vision 2040 Alignment", description: "Becoming a primary global hub for luxury tourism and high-net-worth residential investment.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="Visualizing Excellence"
        images={["/communities/Al Mouj/1 (1).jpg", "/communities/Al Mouj/1 (1).png", "/communities/Al Mouj/1 (2).jpg", "/communities/Al Mouj/1 (3).jpg", "/communities/Al Mouj/1 (2).jpg", "/communities/Al Mouj/1 (1).jpg"]}
      />

      <LuxLocationMap
        title="Strategic Proximity"
        center={{ lat: 23.618, lng: 58.342 }}
        landmarks={[
          { name: "Muscat International Airport", distance: "15 km", time: "12 mins" },
          { name: "Royal Opera House", distance: "8 km", time: "10 mins" },
          { name: "The Ritz-Carlton", distance: "5 km", time: "7 mins" },
          { name: "Qurum Beach", distance: "10 km", time: "12 mins" },
        ]}
      />

      <LuxFAQ
        title="FAQ's"
        faqs={[
          {
            question: "Why should I buy property in Al Mouj Oman?",
            answer: "Al Mouj Oman offers luxury waterfront homes, freehold ownership, and one of the best property investment opportunities in Muscat.",
          },
          {
            question: "Is Al Mouj Oman a good place to invest in real estate?",
            answer: "Yes, Al Mouj Property combines a prime location, luxury lifestyle, and strong long-term investment potential with consistent buyer demand.",
          },
          {
            question: "What types of property can I buy in Al Mouj Oman?",
            answer: "You can buy luxury villas, marina apartments, townhouses, golf-view homes, and waterfront residences in Al Mouj Oman.",
          },
          {
            question: "Can foreigners buy property in Al Mouj Oman?",
            answer: "Yes, eligible foreign buyers can buy freehold property in Al Mouj Oman under Oman's Integrated Tourism Complex (ITC) regulations.",
          },
          {
            question: "Are there luxury villas for sale in Al Mouj Oman?",
            answer: "Yes, Al Mouj offers luxury villas for sale with premium amenities, private outdoor spaces, and access to world-class community facilities.",
          },
          {
            question: "Are marina apartments available in Al Mouj Oman?",
            answer: "Yes, buyers can choose from modern marina apartments with waterfront views and direct access to Al Mouj's vibrant marina lifestyle.",
          },
          {
            question: "Is Al Mouj Oman a good choice for families?",
            answer: "Yes, Al Mouj offers a safe, family-friendly community with parks, leisure facilities, retail outlets, and convenient access to Muscat.",
          },
          {
            question: "How close is Al Mouj Oman to Muscat International Airport?",
            answer: "Al Mouj is located just minutes from Muscat International Airport, making it ideal for residents, investors, and frequent travelers.",
          },
          {
            question: "Can buying property in Al Mouj Oman qualify for residency?",
            answer: "Eligible property purchases may qualify buyers for Oman Residency by Investment, subject to the latest government requirements.",
          },
          {
            question: "Why is Al Mouj one of the best places to buy property in Muscat?",
            answer: "Al Mouj combines luxury waterfront living, freehold ownership, an award-winning marina, championship golf, and premium residences in one of Muscat's most prestigious communities.",
          },
        ]}
      />

      {/* ── CONVERSION 4: After FAQ — researched buyer ready to act ── */}
      <LuxConversionBanner
        headline="Still have questions? Our team is available right now."
        subtext="Call, WhatsApp, or book a free 15-minute consultation — whichever suits you best."
        variant="subtle"
      />

      <LuxRelatedCommunities
        currentSlug="al-mouj"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Secure Your Legacy"
        subtitle="Private consultations are now open for the most exclusive listings within Al Mouj. Experience the pinnacle of Omani luxury."
        primaryCta={{ text: "Request Private Viewing", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
