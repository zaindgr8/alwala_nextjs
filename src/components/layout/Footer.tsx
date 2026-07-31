"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePopup } from "@/context/PopupContext";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const EXPLORE_LINKS = [
  { name: "Properties", href: "/property-search" },
  { name: "Communities", href: "/property-search" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about-us" },
  { name: "Careers", href: "/careers" },
];

const PROPERTY_TYPES = [
  { name: "Villas", href: "/property-search" },
  { name: "Apartments", href: "/property-search" },
  { name: "Penthouses", href: "/property-search" },
  { name: "Off-Plan", href: "/property-search" },
  { name: "Freehold ITC", href: "/property-search" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/alwalaa.om", icon: <FaInstagram size={18} /> },
  { name: "YouTube", href: "https://www.youtube.com/@AlwalaaRealestate", icon: <FaYoutube size={18} /> },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61555342670178", icon: <FaFacebookF size={18} /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/alwalaa-realestate", icon: <FaLinkedinIn size={18} /> },
  { name: "WhatsApp", href: "https://wa.me/96893206024", icon: <FaWhatsapp size={18} /> },
];

const CONTACT = {
  phone: "+968 71 555 067",
  email: "info@alwalaaoman.com",
  address: "Muscat, Sultanate of Oman",
  hours: "Sun – Thu: 10am – 5pm",
};

const LEGAL = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Use", href: "#" },
  { name: "Disclaimer", href: "#" },
];

export default function Footer() {
  const { openPopup } = usePopup();

  return (
    <footer className="bg-[#0a0a0a] text-white">

      {/* ── MAIN BODY ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-12 items-start"
        >

          {/* ── Col 1: Brand ── */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex flex-col gap-4"
          >
            {/* Top anchor label — same height as section labels in other columns */}
            <div className="pb-2 border-b border-white/10">
              <Image
                src="/Logo white.png"
                alt="Alwalaa Real Estate"
                width={160}
                height={64}
                className="brightness-125"
                priority
              />
            </div>
            {/* Tagline block */}
            <div className="pt-1">
              <h3 className="text-white text-sm font-serif font-medium mb-2">
                Luxury Real Estate in Oman
              </h3>
              <p className="text-white/55 text-[13px] leading-relaxed font-light max-w-[230px]">
                Connecting discerning buyers with Oman&apos;s most exclusive residences, waterfront communities and investment opportunities.
              </p>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-5 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-white/50 hover:text-gold transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Explore ── */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } }}
            className="flex flex-col gap-5"
          >
            <p className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold pb-2 border-b border-white/10">
              Explore
            </p>
            <nav className="flex flex-col gap-3.5">
              {EXPLORE_LINKS.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="text-white/65 text-sm font-light hover:text-gold hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* ── Col 3: Property Types ── */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
            className="flex flex-col gap-5"
          >
            <p className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold pb-2 border-b border-white/10">
              Properties
            </p>
            <nav className="flex flex-col gap-3.5">
              {PROPERTY_TYPES.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="text-white/65 text-sm font-light hover:text-gold hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* ── Col 4: Contact + CTA ── */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } }}
            className="flex flex-col gap-6"
          >
            <p className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold pb-2 border-b border-white/10">
              Contact Us
            </p>

            {/* Phone — prominent like WhiteWill */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="text-gold text-3xl md:text-4xl font-serif leading-tight hover:text-white transition-colors duration-300"
            >
              {CONTACT.phone}
            </a>

            {/* Contact details */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/65 text-sm font-light hover:text-white transition-colors duration-300"
              >
                {CONTACT.email}
              </a>
              <p className="text-white/50 text-sm font-light">{CONTACT.address}</p>
              <p className="text-white/40 text-xs font-light">{CONTACT.hours}</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={openPopup}
              className="bg-gold text-matte-black text-[10px] uppercase tracking-[0.2em] font-bold py-4 px-6 hover:bg-white transition-all duration-300 text-center"
            >
              Book Free Consultation
            </button>
          </motion.div>

        </motion.div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-[11px] font-light">
            © {new Date().getFullYear()} Alwalaa Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-white/35 text-[11px] font-light hover:text-white/70 transition-colors duration-300"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
