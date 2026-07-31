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
import { Leaf, Zap, Globe, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function AidaPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="AIDA"
        tagline="THE FUTURE OF LUXURY • COASTAL SOPHISTICATION"
        description=" Explore AIDA in Muscat Oman, a premium destination for luxury property in Oman with villas and apartments for sale, creating one of the most prestigious coastal communities in Oman."
        image="/communities/AIDA/1 (1).jpeg"
        primaryCta={{ text: "Discover the Vision", href: "/property-search?communities=AIDA" }}
        secondaryCta={{ text: "Early Access Brochure", href: "#contact" }}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Why   <span className="text-gold italic">Invest in</span> AIDA Oman
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <LuxEditorial
              title=" Luxury Property in Oman"
              content=" AIDA Oman Property offers luxury property in Oman with breathtaking sea view villas, premium apartments and freehold ownership in one of Muscat’s most prestigious coastal communities. Home to Trump Golf Villas for Sale in AIDA, it combines world-class amenities, flexible payment plans and outstanding long-term investment potential."
              image="/communities/AIDA/1 (1).jpg"
              badge="Eco-Luxury"
            />
            <LuxEditorial
              reverse
              title="Sea View Villas Oman"
              content="Sea View Villas Oman at AIDA Oman feature iconic branded apartments for sale in AIDA, panoramic coastal views and modern architecture beside the Trump International Golf Club Oman. Eligible buyers can benefit from AIDA Oman investor Visa opportunities, tax-friendly ownership and an exceptional luxury lifestyle with strong future value."
              image="/communities/AIDA/1 (2).jpg"
              badge="The Design"
            />
          </div>
        </div>
      </div>

      <LuxStatGrid
        title="Projected Excellence"
        subtitle="Analyzing the potential of the South Coast's most ambitious development."
        stats={[
          { label: "Project Area", value: "2", unit: "Million Sqm" },
          { label: "Projected Units", value: "1,200", unit: "Units" },
          { label: "Growth Potential", value: "12", unit: "%" },
          { label: "Investment Score", value: "9.2", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Key Benefits of<span className="text-gold italic">AIDA Property</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="First-Mover Advantage"
              description="Entering a new luxury market at the conceptual phase allows for maximum capital appreciation as the vision becomes reality."
            />
            <LuxInvestmentCard
              icon={Globe}
              title="Global Appeal"
              description="Targeting the growing demand for secondary vacation homes and eco-luxury retreats among international HNWI."
            />
            <LuxInvestmentCard
              icon={Leaf}
              title="Eco-Sovereignty"
              description="Sustainable certifications increase asset value and attract a higher caliber of conscious luxury investors."
            />
            <LuxInvestmentCard
              icon={Zap}
              title="Rapid Appreciation"
              description="The strategic development of the southern coast ensures a sharp rise in land values over the next decade."
            />
          </div>
        </div>
      </div>

      <LuxFeaturedProperties
        communitySlug="aida"
        title="Early-Bird Opportunities"
      />

      <LuxTimeline
        title="The AIDA Evolution"
        items={[
          { year: "2024", title: "The Blueprint", description: "Conceptual design and environmental impact studies completed. The vision for a sustainable paradise is set.", type: 'past' },
          { year: "2025", title: "Groundbreaking", description: "Initiating the first phase of infrastructure and the luxury resort core.", type: 'present' },
          { year: "2027", title: "First Delivery", description: "The unveiling of the first collection of seaside villas and the wellness hub.", type: 'future' },
          { year: "2030", title: "The Full Horizon", description: "A completed ecosystem of luxury, nature, and innovation on the southern coast.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="A Glimpse into Tomorrow"
        images={["/communities/AIDA/1 (1).jpeg", "/communities/AIDA/1 (1).jpg", "/communities/AIDA/1 (2).jpg", "/communities/AIDA/1 (3).jpg", "/communities/AIDA/1 (4).jpg", "/communities/AIDA/1 (5).jpg"]}
      />

      <LuxLocationMap
        title="The Southern Frontier"
        center={{ lat: 17.24, lng: 54.09 }}
        landmarks={[
          { name: "Salalah International Airport", distance: "30 km", time: "25 mins" },
          { name: "Hawsaba Beach", distance: "5 km", time: "8 mins" },
          { name: "Salalah City Centre", distance: "20 km", time: "18 mins" },
          { name: "Mughsail Beach", distance: "45 km", time: "35 mins" },
        ]}
      />

      <LuxFAQ
        title="FAQ’s"
        faqs={[
  {
    question: "What is the primary appeal of AIDA?",
    answer:
      "AIDA offers a first-mover advantage in a brand-new luxury market, combining sustainable living with a high-growth coastal location.",
  },
  {
    question: "How does the payment plan work for off-plan units?",
    answer:
      "AIDA offers bespoke flexible payment plans designed for international investors, with specific milestones tied to construction progress.",
  },
  {
    question: "Is it a good alternative to Muscat's luxury market?",
    answer:
      "Yes, for investors seeking diversification and higher potential growth, AIDA provides an attractive alternative to the more established Muscat luxury market.",
  },
  {
    question: "What sustainability features are included?",
    answer:
      "From zero-carbon energy solutions to smart water management and native landscaping, AIDA is designed as a sustainable community for the future.",
  },
  {
    question: "When can I expect the first handover?",
    answer:
      "Phased delivery is planned, with the first premium residential units expected to be handed over by 2027.",
  },
  {
    question: "How can I buy a villa in AIDA Oman?",
    answer:
      "You can purchase a villa directly through approved brokers such as Alwalaa Real Estate or through the official developer. Freehold ownership is available for eligible local and international buyers.",
  },
  {
    question: "Is AIDA Oman a good place to invest in property?",
    answer:
      "Yes. AIDA offers luxury branded villas and apartments, strong capital appreciation potential, attractive rental yields, tax-free ownership benefits, and eligibility for investor residency visas.",
  },
  {
    question: "Can foreigners get a residency visa by buying property in AIDA?",
    answer:
      "Yes. Foreign buyers purchasing qualifying property valued at OMR 250,000 or more may be eligible for a renewable 5-year investor residency visa in Oman, subject to government regulations.",
  },
  {
    question: "What type of homes are available in AIDA Oman?",
    answer:
      "AIDA offers a selection of Trump Golf Villas, smart townhouses, branded apartments, luxury residences, and cliffside homes with panoramic sea views.",
  },
  {
    question: "How far is AIDA from Muscat city center?",
    answer:
      "AIDA is approximately 20 minutes from downtown Muscat and around 25 km from Muscat International Airport, providing convenient access while maintaining an exclusive coastal setting.",
  },
  {
    question: "What is the starting price of villas in AIDA?",
    answer:
      "Villa prices in AIDA typically start from OMR 120,000, depending on the project phase, property type, size, and location.",
  },
  {
    question: "Do Trump Villas in AIDA include golf membership?",
    answer:
      "Yes. Most Trump Villas include either full or social membership to the Trump International Golf Club Oman, depending on the specific property and developer package.",
  },
  {
    question: "Are there freehold properties available in Yiti, Oman?",
    answer:
      "Yes. AIDA, located in Yiti, offers freehold ownership for eligible foreign buyers, including luxury villas, branded apartments, and premium residences.",
  },
  {
    question: "Is AIDA Oman a freehold development?",
    answer:
      "Yes. AIDA is a freehold development that allows eligible local and international buyers to own property, making it an excellent choice for long-term investment and residence.",
  },
  {
    question: "Who is the developer of AIDA Oman?",
    answer:
      "AIDA Oman is developed by Dar Global in partnership with Omran Group, creating a world-class luxury destination featuring premium residences, championship golf, and exceptional lifestyle amenities.",
  },
]}
      />

      <LuxRelatedCommunities
        currentSlug="aida"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Own the Future"
        subtitle="The most exclusive coastal opportunity in Oman is now available for early-bird investors. Secure your place in the vision."
        primaryCta={{ text: "Join the Exclusive Waitlist", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
