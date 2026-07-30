import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

import { supabaseRead } from "@/lib/supabase-read";
import { Property } from "@/types/db";
import { COMMUNITIES_DATA } from "@/data/communities";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityOverview from "@/components/community/CommunityOverview";
import CommunityIntroduction from "@/components/community/CommunityIntroduction";
import BrochureRequest from "@/components/community/BrochureRequest";
import InvestmentAnalysis from "@/components/community/InvestmentAnalysis";
import { WhyInvest, CommunityFacts, EconomicImpact } from "@/components/community/InvestmentDetails";
import { CommunityLocation, InvestorPriorities, CommunityGallery, CommunityFAQs, FinalCTA } from "@/components/community/CommunityFooterSections";
import PropertyCard from "@/components/community/PropertyGrid";

export async function generateStaticParams() {
  return Object.keys(COMMUNITIES_DATA).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const normalizedSlug = slug.toLowerCase();
  const data = COMMUNITIES_DATA[normalizedSlug];

  if (!data) return { title: "Community Not Found" };

  return {
    title: `${data.hero.locationBadge} | ${normalizedSlug.replace("-", " ").toUpperCase()} Luxury Real Estate`,
    description: `Discover the most exclusive properties in ${normalizedSlug}. ${data.hero.tagline}`,
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const normalizedSlug = slug.toLowerCase();
  const data = COMMUNITIES_DATA[normalizedSlug];

  if (!data) {
    notFound();
  }

  let properties: Property[] = [];
  try {
    // Inner-join on community so we only get properties whose community slug matches.
    const { data, error } = await supabaseRead
      .from("properties")
      .select("*,community:communities!inner(slug)")
      .eq("community.slug", normalizedSlug)
      .order("createdAt", { ascending: false });
    if (error) throw error;
    properties = (data ?? []) as unknown as Property[];
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return (
    <main className="bg-background min-h-screen selection:bg-gold selection:text-matte-black">
      {/* High-Impact Narrative Flow */}
      <CommunityHero data={data.hero} name={normalizedSlug.replace("-", " ").toUpperCase()} />

      <div className="relative">
        <CommunityOverview data={data.overview} />
        {/* Luxury Section Separator */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <CommunityIntroduction data={data} name={normalizedSlug} />

      <div className="relative">
        <BrochureRequest data={data.brochure} communityName={normalizedSlug} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <InvestmentAnalysis data={data.investmentAnalysis} />

      <div className="relative">
        <WhyInvest data={data.whyInvest} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <CommunityFacts data={data.facts} />

      <div className="relative">
        <EconomicImpact data={data.economicImpact} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <CommunityLocation data={data.location} />

      <div className="relative">
        <InvestorPriorities data={data.investorPriorities} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <CommunityGallery data={data.gallery} />

      <section className="py-48 bg-background px-6 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">
              Available Estates
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-ivory leading-tight tracking-tight">
              The Curated <br />
              <span className="italic text-gold">Portfolio in {normalizedSlug.replace("-", " ").toUpperCase()}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {properties && properties.length > 0 ? (
              properties.map((prop) => (
                <PropertyCard key={prop.id} property={{
                  title: prop.title,
                  price: Number(prop.price),
                  currency: prop.currency,
                  bedrooms: prop.bedrooms ?? undefined,
                  bathrooms: prop.bathrooms ?? undefined,
                  areaSqm: prop.areaSqm ? Number(prop.areaSqm) : undefined,
                  type: prop.type,
                  gallery: prop.gallery,
                }} />
              ))
            ) : (
              <div className="col-span-full text-center py-48 text-ivory/40 italic border border-dashed border-ivory/20 rounded-[3rem] bg-matte-black/20 backdrop-blur-sm">
                No properties currently listed in this community. <br />
                <span className="text-gold not-italic font-serif text-xl mt-4 block">Contact our consultants for off-market opportunities.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <CommunityFAQs data={data} />
      <FinalCTA name={normalizedSlug.replace("-", " ").toUpperCase()} />
    </main>
  );
}
