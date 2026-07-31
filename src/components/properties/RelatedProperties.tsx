"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PropertyUI } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/properties-data";

interface RelatedPropertiesProps {
  currentProperty: PropertyUI;
}

export default function RelatedProperties({ currentProperty }: RelatedPropertiesProps) {
  const related = MOCK_PROPERTIES
    .filter(p => p.id !== currentProperty.id && (p.city === currentProperty.city || p.type === currentProperty.type))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-24 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Similar Estates
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-matte-black">
            You May Also <span className="italic">Appreciate</span>
          </h2>
        </div>
        <Link
          href="/property-search"
          className="text-xs uppercase tracking-widest text-matte-black border-b border-matte-black/20 pb-2 hover:text-gold hover:border-gold transition-all duration-500"
        >
          Back to All Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((prop, i) => (
          <PropertyCard key={prop.id} property={prop} index={i} />
        ))}
      </div>
    </section>
  );
}
