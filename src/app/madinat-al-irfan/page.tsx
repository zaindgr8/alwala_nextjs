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
import { Building2, TrendingUp, Users, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMMUNITIES_DATA } from '@/data/communities';

export default function MadinatAlIrfanPage() {
  const relatedCommunities = Object.entries(COMMUNITIES_DATA).map(([slug, data]) => ({
    slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    image: data.hero.bannerImage,
  }));

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <LuxHero
        title="Madinat Al Irfan"
        tagline="THE NEW HEART OF MUSCAT • ARCHITECTURAL BRILLIANCE"
        description="A visionary urban development that redefines the city center. Combining state-of-the-art infrastructure with an uncompromising commitment to luxury and elegance."
        image="/communities/Madinat Al Irfan/1 (1).jpg"
        primaryCta={{ text: "Explore Urban Portfolio", href: "/property-search?communities=Madinat%20Al%20Irfan" }}
        secondaryCta={{ text: "View Masterplan", href: "#contact" }}
      />

      <LuxEditorial
        badge="The Urban Vision"
        title="A Legacy of Progress"
        content="Madinat Al Irfan is not just a development; it is a statement of intent for the future of Oman. By creating a multifaceted hub of commerce, culture, and residential luxury, it serves as the new gravitational center of Muscat. Every street is designed for elegance, and every building is a celebration of modern architectural achievement."
        image="/communities/Madinat Al Irfan/1 (2).jpg"
      />

      <LuxStatGrid
        title="The Pulse of the City"
        subtitle="A strategic lauchpad for the most ambitious investors."
        stats={[
          { label: "Commercial Hubs", value: "5+", unit: "Zones" },
          { label: "Cultural Sites", value: "12", unit: "Points" },
          { label: "Smart Grid", value: "100", unit: "%" },
          { label: "Investment Score", value: "9.3", unit: "/10" },
        ]}
      />

      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Why Irfan is the <span className="text-gold italic">Strategic Epicenter</span>
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LuxInvestmentCard
              icon={TrendingUp}
              title="Aggressive Yields"
              description="The concentration of commercial activity ensures a massive and consistent demand for high-end residential rentals."
            />
            <LuxInvestmentCard
              icon={Building2}
              title = "Mixed-Use Value"
              description="Properties here benefit from the synergistic growth of the adjacent luxury retail and business districts."
            />
            <LuxInvestmentCard
              icon={Users}
              title = "Demographic Shift"
              description="Attracting the new generation of Omani entrepreneurs and global corporate executives."
            />
            <LuxInvestmentCard
              icon={MapPin}
              title = "Central Connectivity"
              description="Reduced commute times and strategic access to all major government and business hubs in Muscat."
            />
          </div>
        </div>
      </div>

      <LuxEditorial
        reverse
        badge="The Lifestyle"
        title="Cosmopolitan Elegance"
        content="Living in Madinat Al Irfan means living at the intersection of power and pleasure. From the high-end dining experiences to the sophisticated galleries and boutique shopping, it offers a lifestyle of effortless convenience and absolute prestige. It is the city's new address for the modern elite."
        image="/communities/Madinat Al Irfan/1 (3).jpg"
      />

      <LuxFeaturedProperties
        communitySlug="madinat-al-irfan"
        title="Urban Masterpieces"
      />

      <LuxTimeline
        title="The Journey of Growth"
        items={[
          { year: "The Plan", title: "Visionary Blueprint", description: "The conceptualization of the city as the new administrative and commercial heart of Oman.", type: 'past' },
          { year: "The Rise", title: "Infrastructure Boom", description: "The rapid deployment of smart-roads and the opening of the first luxury commercial zones.", type: 'present' },
          { year: "The Peak", title: "Full Realization", description: "The integration of the final residential phases and the completion of the central park.", type: 'future' },
        ]}
      />

      <LuxGallery
        title="Urban Sophistication"
        images={["/communities/Madinat Al Irfan/1 (1).jpg", "/communities/Madinat Al Irfan/1 (2).jpg", "/communities/Madinat Al Irfan/1 (3).jpg", "/communities/Madinat Al Irfan/1 (1).jpg", "/communities/Madinat Al Irfan/1 (2).jpg", "/communities/Madinat Al Irfan/1 (3).jpg"]}
      />

      <LuxLocationMap
        title="The Central Nexus"
        center={{ lat: 23.59, lng: 58.42 }}
        landmarks={[
          { name: "Muscat Int Airport", distance: "8 km", time: "8 mins" },
          { name: "Royal Opera House", distance: "12 km", time: "15 mins" },
          { name: "Sultan Qaboos Grand Mosque", distance: "5 km", time: "7 mins" },
          { name: "City Business Hub", distance: "1 km", time: "2 mins" },
        ]}
      />

      <LuxFAQ
        title="Market Intelligence"
        faqs={[
          { question: "Is Madinat Al Irfan a good entry point for new investors?", answer: "Yes, it is currently in a high-growth phase. Investing now allows you to capitalize on the infrastructure-led appreciation." },
          { question:  "What is the rental demand like?", answer: "Extremely high, especially for luxury apartments catering to the professional and corporate class." },
          { question: "How does the infrastructure support smart living?", answer: "The entire community is built with integrated smart-grid technology, optimizing everything from energy to waste management." },
          { question: "Can foreigners buy property here?", answer: "Yes, the development is open to international investors with secure ownership and straightforward processes." },
          { question: "What is the expected ROI?", answer: "Given the central location and growth trajectory, investors can expect competitive yields and strong capital gains." },
        ]}
      />

      <LuxRelatedCommunities
        currentSlug="madinat-al-irfan"
        communities={relatedCommunities}
      />

      <LuxCTA
        title="Own the Center"
        subtitle="Be at the heart of Oman's new urban era. Secure your residential or commercial asset in Madinat Al Irfan today."
        primaryCta={{ text: "Inquire About Inventory", href: "/contact" }}
      />

      <Footer />
    </main>
  );
}
