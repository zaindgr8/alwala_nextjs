"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const markets = [
  {
    id: "primary",
    title: "Primary Market",
    subtitle: "Off-Plan Investments",
    description: "Explore the finest property for sale in Oman with Alwalaa Real Estate a trusted real estate company in Oman. From off-plan developments and ready to move homes to luxury villas, waterfront residences, apartments and freehold properties in Muscat, discover exceptional real estate opportunities for living, investment and lifetime residency Oman. ",
    highlight: "High Capital Appreciation",
    features: ["Direct Developer Access", "Modern Design", "Flexible Payments", "Investment Growth"],
    image: "/p1.jpg",
    color: "gold",
  },
  {
    id: "secondary",
    title: "Secondary Market",
    subtitle: "Ready-to-Move Properties",
    description: "Immediate luxury for the discerning buyer. Our secondary market consists of ready-to-occupy residences, offering the certainty of finished quality, immediate residency benefits, and the opportunity to own established luxury within Oman's most coveted addresses.",
    highlight: "Immediate Occupancy",
    features: ["Ready to Move", "Proven Value", "Immediate Residency", "Established Locations"],
    image: "/p2.jpg",
    color: "matte-black",
  },
];

export default function ChooseProperty() {
  const router = useRouter();
  return (
    <section className="relative py-16 bg-matte-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - More Compact */}
        <div className="flex flex-col items-center text-center mb-12 gap-3">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block"
            >
              Investment Pathways
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif leading-tight"
            >
              Find the perfect  <span className="italic text-gold">Property in Oman</span>
            </motion.h2>
          </div>
        </div>

        {/* Symmetrical Luxury Layout - Compressed for viewport fit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {markets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              {/* Image Container - Reduced Aspect Ratio (more horizontal) */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden group">
                <Image
                  src={market.image}
                  alt={market.title}
                  fill
                 
                  className=" choose-img object-cover   transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  {/* <span className="text-gold text-[9px] uppercase tracking-widest font-bold mb-1 block">
                    Strategic Advantage
                  </span>
                  <h3 className="text-2xl font-serif text-ivory italic leading-tight">
                    {market.highlight}
                  </h3> */}
                </div>
              </div>

              {/* Content Area - More Compact */}
              <div className="flex flex-col gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gold text-[10px] font-medium uppercase tracking-widest">
                      {market.subtitle}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h4 className="text-2xl font-serif text-ivory">
                    {market.title}
                  </h4>
                  <p className="text-ivory/60 leading-relaxed font-light text-sm line-clamp-3">
                    {market.description}
                  </p>
                </div>

                {/* Features Grid - Compact */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 border-y border-white/10">
                  {market.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-ivory/50">
                      <div className="w-1 h-1 rounded-full bg-gold" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Action Button - Smaller padding */}
                <motion.button
                  onClick={() => router.push("/property-search")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-fit px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 rounded-full",
                    market.id === "primary"
                      ? "bg-gold text-matte-black hover:bg-ivory"
                      : "bg-ivory text-matte-black hover:bg-gold"
                  )}
                >
                  Discover Listings
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
