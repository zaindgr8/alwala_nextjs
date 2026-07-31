'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { COMMUNITIES_DATA } from "@/data/communities";

export default function TopCommunities() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<number | undefined>(undefined);

  const communityImageMap: Record<string, string> = {
    "AIDA": "/communities/AIDA/1 (1).jpeg",
    "Al Mouj": "/communities/Al Mouj/1 (1).jpg",
    "Hawana Salalah":"/communities/Hawana Salalah/1 (1).jpg",
    "Jebel Sifah": "/communities/Jebel Sifah/1 (1).png",
    "Madinat Al Irfan": "/communities/Madinat Al Irfan/1 (1).jpg",
    "Muscat Bay": "/communities/Muscat Bay/image.png",
    "Sultan Haithem City": "/communities/Sultan Haithem City/1.jpg",
    "Sustainable City": "/p2.jpg",
  };

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const data = Object.entries(COMMUNITIES_DATA).map(([slug, metadata]) => ({
          id: slug,
          slug: slug,
          name: slug.replace(/-/g, ' ').toUpperCase(),
          description: metadata.introduction.content,
          imageUrl: metadata.hero.bannerImage,
        }));
        setCommunities(data);
      } catch (e) {
        console.error('Failed to load communities', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommunities();
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 320;
      const maxScroll = container.scrollWidth / 2;

      if (container.scrollLeft + cardWidth >= maxScroll) {
        container.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const scheduleAutoScroll = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      startAutoScroll();
      timeoutRef.current = undefined;
    }, 2000);
  }, [startAutoScroll]);

  useEffect(() => {
    if (communities.length > 0) startAutoScroll();
    return () => {
      stopAutoScroll();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [communities, startAutoScroll, stopAutoScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 320;
    const maxScroll = container.scrollWidth / 2;

    stopAutoScroll();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (direction === 'left') {
      if (container.scrollLeft - cardWidth < 0) {
        container.scrollTo({ left: maxScroll - cardWidth, behavior: 'instant' });
      } else {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft + cardWidth >= maxScroll) {
        container.scrollTo({ left: 0, behavior: 'instant' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }

    scheduleAutoScroll();
  }, [stopAutoScroll, scheduleAutoScroll]);

  if (isLoading) {
    return (
      <section className="relative py-24 bg-background flex items-center justify-center">
        <div className="text-center text-zinc-400 animate-pulse">
          Curating exclusive enclaves...
        </div>
      </section>
    );
  }

  if (communities.length === 0) {
    return (
      <section className="relative py-24 bg-background flex items-center justify-center">
        <div className="text-center text-zinc-400">
          No communities available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* Section Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            The Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-matte-black leading-tight mb-6"
          >
            Explore Top <br />
            <span className="italic text-gold">Communities In Oman</span>
          </motion.h2>
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto text-zinc-600 text-base md:text-lg leading-relaxed font-light"
          >
           Oman offers a range of prime locations for freehold property Known as Integrated tourism complexes ( ITC ) zones, Catering to diverse lifestyles and preferences. Many of these property also provide opportunities for lifetime residency Oman, allowing buyers to enjoy both a premium lifestyle and long term security.

          </motion.p> */}
        </div>
      </div>

      {/* Carousel with Arrow Controls */}
      <div className="relative w-full">
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-matte-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...communities, ...communities].map((community, index) => (
            <div
              key={`${community.id}-${index}`}
              className="flex-shrink-0 px-3 w-[calc(100vw/2)] md:w-[calc(100vw/4)] lg:w-[calc(1280px/4)]"
            >
              <Link
                href={`/${community.slug}`}
                className="group relative overflow-hidden rounded-3xl cursor-pointer block h-[400px]"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={communityImageMap[community.name] || community.imageUrl || '/placeholder.jpg'}
                    alt={community.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-ivory">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Exclusive Enclave
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif mb-2 group-hover:text-gold transition-colors duration-500">
                        {community.name}
                      </h3>
                      <p className="text-sm text-ivory/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-2 group-hover:translate-y-0">
                        {community.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-matte-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-center gap-5"
        >
          <p className="text-zinc-500 text-sm font-light">
            Discover all 8 ITC-approved communities with freehold &amp; residency eligibility
          </p>
          <a
            href="/property-search"
            className="inline-flex items-center gap-3 bg-matte-black text-ivory px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-matte-black transition-all duration-500"
          >
            View All Communities
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

