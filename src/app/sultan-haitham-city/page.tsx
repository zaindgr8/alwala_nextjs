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
import { Building2, Leaf, TrendingUp, Map } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function SultanHaithamCityPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Sultan Haitham City"
        tagline="VISIONARY URBANISM • THE FUTURE OF OMAN"
        description=" A new benchmark for modern living, Sultan Haitham City offers premium villas and apartments for sale in one of Oman’s leading smart communities and provides excellent investment opportunities."
        image="/communities/Sultan Haithem City/1.jpg"
        primaryCta={{ text: "Explore the Masterplan", href: "/property-search?communities=Sultan%20Haitham%20City" }}
        secondaryCta={{ text: "Investment Guide", href: "#contact" }}
      />

      <LuxEditorial
        badge="Urban Innovation"
        title="Why Invest in Sultan Haitham City"
        content=" Sultan Haitham City is one of the best places to buy property in Oman, part of a master-planned community inspired by Oman Vision 2040. Whether you are looking to buy property in Sultan Haitham City or make a long-term real estate investment in Oman, the city offers a prime location, excellent connectivity, modern infrastructure and strong growth potential, making it one of the top choices for homeowners and investors."
        image="/communities/Sultan Haithem City/1 (2).jpg"
      />

      <LuxStatGrid
        title="The Urban Blueprint"
        subtitle="Scaling luxury and sustainability at a national level."
        stats={[
          { label: "Green Areas", value: "30", unit: "%" },
          { label: "Walkability", value: "High", unit: "" },
          { label: "Smart Home", value: "100", unit: "%" },
          { label: "Investment Score", value: "9.4", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Investment  <span className="text-gold italic">Advantaged </span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="Oman Vision 2040"
              description="Developed under Oman Vision 2040, Sultan Haitham City support sustainable growth, modern infrastructure and long-term real estate investment in Oman. "
            />
            <LuxInvestmentCard
              icon={Building2}
              title="Master- planned Community"
              description="A master planned community designed with residential, retail, commercial and leisure spaces to create a connected lifestyle and enhance everyday living. "
            />
            <LuxInvestmentCard
              icon={Leaf}
              title="Sustainable Living"
              description="Enjoy green spaces, modern amenities and sustainable community planning that support healthier living and long-term property value."
            />
            <LuxInvestmentCard
              icon={Map}
              title="Prime Location"
              description="Located in AL Seeb near Muscat International Airport, Sultan Haitham City offers excellent connectivity to schools, business districts, healthcare and major attractions across Muscat."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="The Lifestyle"
        title=" Lifestyle in Sultan Haitham City"
        content="Experience modern lifestyle in SUltan Haitham City, a master planned community in Oman designed with green parks, walkable neighbourhoods and world class amenities. Located in Muscat, it is one of the top destinations for real estate investment in Oman. offering strong long-term property value for home buyers and investors seeking premium living."
        image="/communities/Sultan Haithem City/1 (3).jpg"
      />

      <LuxFeaturedProperties
        communitySlug="sultan-haitham-city"
        title="Visionary Estates"
      />

      <LuxTimeline
        title="Designing the Future"
        items={[
          { year: "2020", title: "The Royal Decree", description: "The vision is established to create a world-class urban center reflecting Oman's progress.", type: 'past' },
          { year: "2024", title: "Infrastructure Phase", description: "Core roads and smart grids are being deployed, preparing the land for luxury development.", type: 'present' },
          { year: "2027", title: "First Enclaves", description: "The first collection of sustainable villas and luxury apartments will be delivered.", type: 'future' },
          { year: "2040", title: "The Completed Vision", description: "A fully realized smart city serving as a global benchmark for sustainable urbanism.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="Architectural Visions"
        images={["/communities/Sultan Haithem City/1.jpg", "/communities/Sultan Haithem City/1 (2).jpg", "/communities/Sultan Haithem City/1 (3).jpg", "/communities/Sultan Haithem City/1.jpg", "/communities/Sultan Haithem City/1 (2).jpg", "/communities/Sultan Haithem City/1 (3).jpg"]}
      />

      <LuxLocationMap
        title="The Heart of the Capital"
        center={{ lat: 23.58, lng: 58.45 }}
        landmarks={[
          { name: "Muscat Int Airport", distance: "12 km", time: "10 mins" },
          { name:  "Royal Opera House", distance: "7 km", time: "8 mins" },
          { name: "Sultan Qaboos Grand Mosque", distance: "10 km", time: "12 mins" },
          { name: "National Museum", distance: "8 km", time: "10 mins" },
        ]}
      />

      <LuxFAQ
        title="FAQ’s"
        faqs={[
          { question: "What are the benefits of buying Off-Plan Property in Sultan Haitham City?", answer: "Off-Plan Property in Sultan Haitham City offers competitive prices, flexible payment plans and strong potential for long-term capital appreciation as the community dvelops." },
          { question: "Is Sultan Haitham City Property a good investment?", answer: "Yes, Sultan Haitham City Property offers excellent long-term property investment in Oman, backed by Oman Vision 2040, modern infrastructure and continuous urban development. " },
          { question: "Is Property for sale  in Sultan Haitham City available now?", answer: "Yes, property for sale in Sultan Haitham City includes apartments, villas, duplexes, penthouses and townhouses across premium residential communities in Muscat" },
          { question: "Can expats buy property in Sulatan Haitham City, Oman?", answer: "Yes, Eligible expats can buy Property in Sultan Haitham City Oman, including selected freehold apartments and villas, under Oman’s property ownership regulations." },
          { question: "What is the Sultan Haitham City Payment Plan?", answer: "The Sultan Haitham City Payment Plan varies by developer, with many projects offering flexible installments and attractive payment options for local and international buyers." },
          { question: "What is Sultan Haitham City Price?", answer: "The Sultan Haitham City price depends on the project, property type, location and size with options available for different budgets and investment goals." },
          { question: "How can I buy property in Sultan Haitham City?", answer: "To Buy Property in Sultan Haitham City, choose your preferred project, complete the booking process and follow the developer’s approved payment plan." },
          { question: "Can I get Oman Residency by Buying Property In Sultan Haitham City?", answer: "Eligible buyers may qualify for Oman residency by buying property in Sultan Haitham City, subject to the latest resident and investment regulations." },
          { question: "Which are the best Communities in Sultan Haitham City?", answer: "Popular Communities in Sultan Haitham City include Hay Al Wafa, Wadi Zaha and Yeneir, offering premium homes, modern amenities and strong investment potential." },
          { question: "Which Apartments for Sale in Sultan Haitham City are Available?", answer: "Apartments for Sale in Sultan Haitham City include 1,2 and 3-bedroom residences with smart layouts, premium facilities, and flexible payment plan." },
          { question: "Which Villas for Sale in Sultan Haitham City are available?", answer: "Villas for Sale in Sultan Haitham City range from luxury family villas to spacious detached homes designed for comfortable living and long-term property investment." },
        
        ]}
      />

      <LuxRelatedCommunities
        currentSlug="sultan-haitham-city"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Invest in the Vision"
        subtitle="Be part of the most ambitious urban project in Omani history. Secure your position in the future of Muscat."
        primaryCta={{ text: "Consult an Expert", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
