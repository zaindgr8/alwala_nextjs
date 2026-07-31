"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePopup } from "@/context/PopupContext";
import { FaWhatsapp } from "react-icons/fa";
import LuxurySelect from "@/components/core/LuxurySelect";

const WHATSAPP_NUMBER = "96893206024"; // ← Replace with real number

const trustTicker = [
  "189+ Happy Clients",
  "6–8% Annual ROI",
  "Lifetime Residency in Oman",
  "20+ Premier ITC Developers",
  "100% Free Consultation",
  "Freehold Properties Available",
];

const propertyTypes = ["Apartment", "Villa", "Penthouse", "Townhouse", "Studio", "Commercial"];
const communities = ["Al Mouj", "AIDA", "Muscat Bay", "Sultan Haitham City", "Jebel Sifah", "Hawana Salalah"];
const budgets = ["Under OMR 50K", "OMR 50K–100K", "OMR 100K–200K", "OMR 200K–500K", "OMR 500K+"];

const typeMap: Record<string, string> = {
  "Apartment": "APARTMENT",
  "Villa": "VILLA",
  "Townhouse": "TOWNHOUSE",
  "Penthouse": "PENTHOUSE",
  "Studio": "STUDIO",
  "Commercial": "COMMERCIAL",
};

const budgetMap: Record<string, { min?: number; max?: number }> = {
  "Under OMR 50K": { max: 50000 },
  "OMR 50K–100K": { min: 50000, max: 100000 },
  "OMR 100K–200K": { min: 100000, max: 200000 },
  "OMR 200K–500K": { min: 200000, max: 500000 },
  "OMR 500K+": { min: 500000 },
};


export default function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [community, setCommunity] = useState("");
  const [budget, setBudget] = useState("");
  const { openPopup } = usePopup();
  const hasOpened = useRef(false);
  const router = useRouter();

  // Trust ticker rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % trustTicker.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Popup on scroll (30% scroll depth)
  useEffect(() => {
    const handleScroll = () => {
      if (hasOpened.current) return;
      const scrollDepth = window.scrollY / document.body.scrollHeight;
      if (scrollDepth > 0.3) {
        hasOpened.current = true;
        openPopup();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openPopup]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (propertyType && typeMap[propertyType]) {
      params.set("type", typeMap[propertyType]);
    }

    if (community) {
      params.set("communities", community);
    }

    if (budget && budgetMap[budget]) {
      const { min, max } = budgetMap[budget];
      if (min) params.set("minPrice", min.toString());
      if (max) params.set("maxPrice", max.toString());
    }

    router.push(`/property-search?${params.toString()}`);
  };

  return (
    <section className="relative z-50 h-screen w-full">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-matte-black/30 via-transparent to-matte-black/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-5xl"
        >
          {/* Trust badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/40 rounded-full px-4 py-1.5 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-[10px] uppercase tracking-[0.25em] font-semibold">
              Oman&apos;s Trusted Luxury Real Estate Partner
            </span
          </motion.div> */}

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl 2xl:text-7xl font-serif text-ivory leading-tight mb-3">
            Find Your Luxury <br />
            <span className="italic text-gold">Property in Oman</span>
          </h1>

          {/* Subheadline */}
          <p className="text-ivory/70 text-sm md:text-base font-light max-w-2xl mx-auto mb-5 leading-relaxed">
            Villas, apartments &amp; ITC investments — with lifetime residency opportunities and 6–8% annual ROI
          </p>

          {/* Property Search Bar */}
          <div className="relative z-10 bg-matte-black/40 backdrop-blur-xl border border-gold/20 rounded-3xl p-3 md:p-5 max-w-4xl mx-auto mb-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <LuxurySelect
                placeholder="Property Type"
                options={propertyTypes}
                value={propertyType}
                onChange={setPropertyType}
              />
              <LuxurySelect
                placeholder="Community / Area"
                options={communities}
                value={community}
                onChange={setCommunity}
              />
              <LuxurySelect
                placeholder="Budget Range"
                options={budgets}
                value={budget}
                onChange={setBudget}
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full bg-gold text-matte-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-ivory transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Properties
            </button>
          </div>

          {/* Secondary CTAs */}
          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm mt-4">
            <button
              onClick={openPopup}
              className="w-full sm:w-auto bg-gold/10 backdrop-blur-md text-gold border-2 border-gold/40 hover:border-gold hover:bg-gold hover:text-matte-black px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-gold/5 hover:shadow-gold/20 hover:scale-[1.02]"
            >
              Book Free Consultation
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500/10 backdrop-blur-md text-green-400 border-2 border-green-500/30 hover:border-green-500 hover:bg-green-500 hover:text-white px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-green-500/5 hover:shadow-green-500/20 hover:scale-[1.02]"
            >
              <FaWhatsapp className="text-lg" />
              Chat on WhatsApp
            </a
          </div> */}
        </motion.div>
      </div>

      {/* Trust Ticker — bottom of hero */}
      {/* <div className="absolute bottom-0 mt-5 left-0 right-0 z-10 bg-matte-black/70 backdrop-blur-sm border-t border-gold/20 py-3 overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={tickerIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-gold text-[11px] uppercase tracking-[0.25em] font-semibold"
            >
              {trustTicker[tickerIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
        </div
      </div> */}

      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-400 transition-colors duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
        <span className="absolute right-16 bg-matte-black text-ivory text-[10px] px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider font-medium">
          Chat with us
        </span>
      </motion.a>
    </section>
  );
}
