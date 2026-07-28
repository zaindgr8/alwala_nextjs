'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // Pull the full list (already newest-first) and float featured ones to
        // the top, so the grid always fills to 3 even when few are flagged.
        const res = await fetch('/api/properties');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        const sorted = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
        setProperties(sorted);
      } catch (e) {
        console.error('Failed to fetch featured properties', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 px-6 bg-warm-white border-t border-champagne/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-gold uppercase tracking-[0.25em] text-[10px] font-bold mb-2 block">
              Elite Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-matte-black leading-tight">
              Featured <span className="italic text-gold">Properties</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-[11px] uppercase tracking-widest text-matte-black hover:text-gold transition-all duration-300 group flex items-center gap-2"
          >
            <span>Explore All Listings</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </Link>
        </div>

        {/* Minimalist 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full py-16 text-center text-zinc-400 animate-pulse text-sm">
              Curating elite collection...
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-full py-16 text-center text-zinc-400 text-sm">
              No featured properties currently available.
            </div>
          ) : (
            properties.slice(0, 3).map((prop: any, i: number) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                {/* Compact Image Card */}
                <Link
                  href={`/properties/${prop.slug}`}
                  className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-zinc-100 mb-4 block"
                >
                  <Image
                    src={prop.gallery?.[0] || '/placeholder.jpg'}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-matte-black/70 backdrop-blur-sm text-ivory text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
                    {prop.status?.replace(/_/g, ' ')}
                  </div>
                </Link>

                {/* Details Container below the Image */}
                <div className="flex flex-col flex-1 px-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-gold text-[9px] uppercase tracking-widest font-semibold">
                        {prop.community?.name || prop.location}
                      </p>
                      <Link href={`/properties/${prop.slug}`}>
                        <h3 className="text-lg font-serif text-matte-black mt-1 group-hover:text-gold transition-colors duration-300">
                          {prop.title}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  {/* Property Specs */}
                  <div className="flex items-center gap-4 mt-3 py-3 border-y border-champagne/20 text-[11px] text-matte-black/50 font-light">
                    {prop.bedrooms && (
                      <span>{prop.bedrooms} {prop.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                    )}
                    {prop.bathrooms && (
                      <span>{prop.bathrooms} {prop.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    )}
                    {prop.areaSqm && (
                      <span>{Number(prop.areaSqm)} Sqm</span>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="flex justify-between items-center mt-3 pt-1">
                    <p className="text-matte-black font-semibold text-sm">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: prop.currency || 'OMR',
                        maximumFractionDigits: 0
                      }).format(Number(prop.price))}
                    </p>
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="text-[10px] uppercase tracking-widest text-matte-black hover:text-gold transition-all font-semibold"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
