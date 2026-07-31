"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePopup } from "@/context/PopupContext";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "96893206024"; // ← Replace with real number

const paths = [
  {
    type: "Buy",
    title: "Looking to Buy?",
    subtitle: "Acquire the Extraordinary",
    description: "From waterfront villas to urban penthouses, we guide you through Oman's most exclusive listings and help you qualify for lifetime residency.",
    image: "/p1.jpg",
    ctaLabel: "Explore Listings",
    ctaHref: "/property-search",
    isPopup: false,
    buttonClass: "bg-gold text-matte-black hover:bg-ivory",
    bullets: ["Freehold properties", "Lifetime residency eligible", "Off-plan & ready units"],
  },
  {
    type: "Sell",
    title: "Looking to Sell?",
    subtitle: "Maximize Your Asset Value",
    description: "Leverage our global network and deep market expertise to position your luxury property before the most qualified high-net-worth investors.",
    image: "/p2.jpg",
    ctaLabel: "Get Free Valuation",
    ctaHref: "#",
    isPopup: true,
    buttonClass: "bg-ivory text-matte-black hover:bg-gold",
    bullets: ["Global HNW investor network", "Expert market valuation", "Fast, discreet process"],
  },
];

export default function BuySellSection() {
  const { openPopup } = usePopup();

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Tailored Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-matte-black leading-tight"
          >
            Your Gateway to <span className="italic text-gold">Oman Real Estate</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Full Image Background */}
              <Image
                src={path.image}
                alt={path.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/95 via-matte-black/40 to-transparent transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-ivory">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-gold text-xs uppercase tracking-widest font-bold mb-3 block">
                    {path.subtitle}
                  </span>
                  <h3 className="text-4xl font-serif mb-3 leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-ivory/70 text-base font-light mb-5 max-w-md leading-relaxed">
                    {path.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 mb-7">
                    {path.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-ivory/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4">
                    {path.isPopup ? (
                      <button
                        onClick={openPopup}
                        className={cn(
                          "px-8 py-3.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 rounded-full",
                          path.buttonClass
                        )}
                      >
                        {path.ctaLabel}
                      </button>
                    ) : (
                      <Link
                        href={path.ctaHref}
                        className={cn(
                          "px-8 py-3.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-500 rounded-full",
                          path.buttonClass
                        )}
                      >
                        {path.ctaLabel}
                      </Link>
                    )}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      className="w-11 h-11 rounded-full border border-ivory/30 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all duration-300"
                    >
                      <FaWhatsapp className="text-ivory text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
