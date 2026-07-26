"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePopup } from "@/context/PopupContext";
import { Award, Compass, ShieldCheck, Quote } from "lucide-react";
import { FaInstagram, FaLinkedin, FaFacebookF, FaYoutube } from "react-icons/fa";

const CORE_VALUES = [
  {
    icon: <ShieldCheck className="text-gold w-8 h-8" />,
    title: "Uncompromising Integrity",
    desc: "Complete transparency and trust are at the heart of every luxury transaction we guide.",
  },
  {
    icon: <Award className="text-gold w-8 h-8" />,
    title: "Bespoke Excellence",
    desc: "We curate Omani properties that match the demanding standards of global high-net-worth investors.",
  },
  {
    icon: <Compass className="text-gold w-8 h-8" />,
    title: "Local Authority, Global Vision",
    desc: "Deep knowledge of Oman's ITC regulations paired with an understanding of global investment standards.",
  },
];

export default function AboutPage() {
  const { openPopup } = usePopup();

  return (
    <main className="relative min-h-screen bg-ivory text-matte-black">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/p3.jpg"
            alt="About Alwalaa Real Estate"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-matte-black/40 via-transparent to-ivory" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            {/* <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold block">
              Our Legacy
            </span> */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-ivory leading-tight">
              Setting the Standard in <br />
              <span className="italic text-gold">Oman Real Estate</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND STORY SECTION ── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-matte-black leading-tight">
                Crafting a <span className="italic text-gold">Legacy of Trust</span>
              </h2>
            </div>
            <p className="text-matte-black/75 text-base md:text-lg leading-relaxed font-light">
              At Alwalaa Real Estate, led by Eng. Humood AlAdhari, we do not just facilitate property transactions; we help global investors build wealth, discover bespoke luxury residences, and navigate Oman&apos;s dynamic real estate landscape with complete confidence. 
            </p>
            <p className="text-matte-black/60 text-sm leading-relaxed font-light">
              From waterfront villas in Al Mouj and high-yielding apartments in Muscat Bay, to forward-looking off-plan developments in Sultan Haitham City, we provide premium consulting and end-to-end guidance.
            </p>
            <div className="w-16 h-px bg-gold" />
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold mr-2">Connect:</span>
              <a
                href="https://www.instagram.com/alwalaa.om/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black/5 hover:bg-gold text-matte-black transition-all duration-300 flex items-center justify-center hover:scale-105"
                aria-label="Instagram"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61555342670178&locale=et_EE#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black/5 hover:bg-gold text-matte-black transition-all duration-300 flex items-center justify-center hover:scale-105"
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="https://www.youtube.com/@AlwalaaRealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black/5 hover:bg-gold text-matte-black transition-all duration-300 flex items-center justify-center hover:scale-105"
                aria-label="YouTube"
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="https://www.linkedin.com/company/alwalaa-realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-matte-black/5 hover:bg-gold text-matte-black transition-all duration-300 flex items-center justify-center hover:scale-105"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={15} />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/omn.jpg"
              alt="Oman Waterfront Luxury"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
      {/* ── OUR ACHIEVEMENTS SECTION ── */}
      <section className="py-14 px-6 bg-matte-black relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header — compact inline layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3"
          >
            <div>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
                Recognition &amp; Excellence
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-ivory leading-tight">
                Our <span className="italic text-gold">Achievements</span>
              </h2>
            </div>
            <p className="text-ivory/40 text-xs font-light max-w-xs leading-relaxed sm:text-right">
              Awards &amp; recognition from Oman&apos;s most prestigious real estate platforms.
            </p>
          </motion.div>

          {/* Awards — continuous moving belt. The list is duplicated so the
              marquee can loop seamlessly (translateX(-50%) lands on the copy). */}
          <div
            className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <div className="achievements-marquee flex w-max gap-6">
              {[
                {
                  src: "/images/achievement-1.png",
                  alt: "التجمع العقاري 2026 Award",
                },
                {
                  src: "/images/achievement-2.png",
                  alt: "Al Mouj Broker Awards 2025",
                },
                {
                  src: "/images/achievement-3.png",
                  alt: "Al Ahly Sabbour Top Achiever 2025",
                },
                {
                  src: "/images/achievement-4.png",
                  alt: "التجمع العقاري الرمضاني Award",
                },
                {
                  src: "/images/achievement-5.png",
                  alt: "Top Achiever W9 2025",
                },
                {
                  src: "/images/achievement-6.png",
                  alt: "Top Achiever W9 2025 Second Award",
                },
                {
                  src: "/images/achievement-7.png",
                  alt: "Al Mouj Broker Certificate 2025",
                },
              ]
                .concat([
                  { src: "/images/achievement-1.png", alt: "التجمع العقاري 2026 Award" },
                  { src: "/images/achievement-2.png", alt: "Al Mouj Broker Awards 2025" },
                  { src: "/images/achievement-3.png", alt: "Al Ahly Sabbour Top Achiever 2025" },
                  { src: "/images/achievement-4.png", alt: "التجمع العقاري الرمضاني Award" },
                  { src: "/images/achievement-5.png", alt: "Top Achiever W9 2025" },
                  { src: "/images/achievement-6.png", alt: "Top Achiever W9 2025 Second Award" },
                  { src: "/images/achievement-7.png", alt: "Al Mouj Broker Certificate 2025" },
                ])
                .map((award, i) => (
                  <div
                    key={`${award.src}-${i}`}
                    className="group relative flex-shrink-0 w-56"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-gold/15 bg-[#171410] transition-all duration-400 group-hover:border-gold/40 group-hover:shadow-[0_0_24px_rgba(201,165,106,0.15)]">
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={award.src}
                          alt={award.alt}
                          fill
                          className="object-contain p-5 transition-transform duration-600 group-hover:scale-105"
                          sizes="224px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom rule */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1 max-w-32" />
            <span className="text-gold/30 text-[9px] uppercase tracking-[0.3em] font-light whitespace-nowrap">Recognised by Industry Leaders</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1 max-w-32" />
          </div>
        </div>
      </section>


      {/* ── EVENTS SECTION ── */}
      <section className="py-16 px-6 bg-warm-white overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3"
          >
            <div>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">
                Community &amp; Engagement
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-matte-black leading-tight">
                Our <span className="italic text-gold">Events</span>
              </h2>
            </div>
            <p className="text-matte-black/40 text-xs font-light max-w-xs leading-relaxed sm:text-right">
              From championship sponsorships to exclusive gala nights — Alwalaa where business meets community.
            </p>
          </motion.div>

          {/* Masonry Photo Grid */}
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[580px]">

            {/* Hero image — spans 5 cols, 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-5 row-span-2 group relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/event-4.jpg"
                alt="FFC Fitbox Fighting Championship – Alwalaa Sponsorship"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-matte-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block text-[9px] uppercase tracking-widest bg-gold text-matte-black font-bold px-2 py-0.5 rounded-full mb-2">FFC Championship</span>
                <p className="text-ivory font-serif text-lg leading-snug">Fitbox Fighting Championship<br /><span className="text-ivory/60 text-xs font-light">Official Sponsor — Alwalaa Real Estate</span></p>
              </div>
            </motion.div>

            {/* Top-right large — spans 4 cols, 1 row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-4 row-span-1 group relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/event-1.jpg"
                alt="FFC Trophy Presentation Ceremony"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="text-ivory text-xs font-serif">Trophy Presentation Ceremony</p>
              </div>
            </motion.div>

            {/* Top-right small — spans 3 cols, 1 row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-3 row-span-1 group relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/event-5.jpg"
                alt="FFC Event – Ring Side"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="text-ivory text-xs font-serif">Ringside Moments</p>
              </div>
            </motion.div>

            {/* Bottom-right medium — spans 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-3 row-span-1 group relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/event-2.jpg"
                alt="FFC – Winner Celebration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="text-ivory text-xs font-serif">Winner Celebration</p>
              </div>
            </motion.div>

            {/* Bottom-right wide — spans 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-4 row-span-1 group relative rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/event-8.jpg"
                alt="Alwalaa Gala Night – Executive Networking"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-matte-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="inline-block text-[9px] uppercase tracking-widest bg-ivory/20 backdrop-blur-sm text-ivory font-bold px-2 py-0.5 rounded-full mb-1.5">Gala Night</span>
                <p className="text-ivory text-xs font-serif">Executive Networking Evening</p>
              </div>
            </motion.div>

          </div>

          {/* Secondary strip — 3 remaining photos horizontal */}
          <div className="grid grid-cols-3 gap-3 mt-3 h-56">
            {[
              { src: "/images/event-3.jpg", label: "Championship Night – Outdoor Arena" },
              { src: "/images/event-6.jpg", label: "FFC Ring Ceremony" },
              { src: "/images/event-7.jpg", label: "Alwalaa at FFC – Ringside" },
            ].map((ev, i) => (
              <motion.div
                key={ev.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden"
              >
                <Image
                  src={ev.src}
                  alt={ev.label}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="text-ivory text-[10px] font-serif leading-snug">{ev.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CORE VALUES SECTION ── */}
      <section className="py-20 px-6 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-[0.2em] text-[10px] font-bold block mb-2">
              Our Pillars
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-matte-black">
              Founding Principles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-ivory border border-champagne/20 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-6">{val.icon}</div>
                <h3 className="text-lg font-serif text-matte-black mb-3">{val.title}</h3>
                <p className="text-matte-black/60 text-sm font-light leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP (EDITORIAL QUOTE LAYOUT) ── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12 lg:gap-16 items-center">
            {/* CEO Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/ceo.webp"
                alt="Eng. Humood Al-Adhari"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-ivory">
                <h4 className="text-xl font-serif">Eng. Humood Al-Adhari</h4>
                <p className="text-[10px] uppercase tracking-widest text-gold mt-1 mb-3">Chief Executive Officer</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/humood.aladhari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/60 hover:text-gold transition-colors flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="https://om.linkedin.com/in/humood-al-adhari-37bb67111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/60 hover:text-gold transition-colors flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CEO Quote & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Quote className="text-gold/40 w-12 h-12" />
              <blockquote className="text-xl md:text-2xl font-serif italic text-matte-black leading-relaxed">
                &ldquo;Our vision is to transform the Omani real estate landscape into a global hub for prestigious investment. We do not just build transactions, we construct lasting partnerships grounded in transparency and localized market expertise.&rdquo;
              </blockquote>
              <div className="space-y-3 text-matte-black/70 text-sm font-light leading-relaxed">
                <p>
                  With years of design, development, and advisory experience, Eng. Humood AlAdhari directs Alwalaa Real Estate with a strategic focus on premium Integrated Tourism Complex (ITC) community access, securing lifetime residency benefits for foreign investors, and ensuring maximum capital growth.
                </p>
              </div>
              <button
                onClick={openPopup}
                className="inline-flex bg-matte-black text-ivory text-[10px] uppercase tracking-[0.2em] font-bold py-3.5 px-8 hover:bg-gold hover:text-matte-black transition-all duration-300"
              >
                Schedule Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="py-24 px-6 bg-matte-black text-ivory relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 border border-gold/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 border border-gold/10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 p-8 md:p-12 border border-gold/20 rounded-2xl bg-[#111111]/50 backdrop-blur-sm"
            >
              <span className="text-gold uppercase tracking-[0.25em] text-[10px] font-bold block">
                The Goal
              </span>
              <h3 className="text-2xl md:text-3xl font-serif italic text-gold">Our Vision</h3>
              <p className="text-ivory/80 text-base md:text-lg font-light leading-relaxed">
                To stand as the absolute benchmark for international investors seeking Oman’s finest real estate portfolio, redefining luxury service and advisory transparency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 p-8 md:p-12 border border-gold/20 rounded-2xl bg-[#111111]/50 backdrop-blur-sm"
            >
              <span className="text-gold uppercase tracking-[0.25em] text-[10px] font-bold block">
                The Path
              </span>
              <h3 className="text-2xl md:text-3xl font-serif italic text-gold">Our Mission</h3>
              <p className="text-ivory/80 text-base md:text-lg font-light leading-relaxed">
                To empower global buyers by presenting curated real estate selections with verified ROI projections, enabling them to secure lifetime residency and outstanding homes in Oman.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="py-20 px-6 bg-gold text-matte-black text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            Ready to Invest in <span className="italic">Oman&apos;s Premium Market?</span>
          </h2>
          <p className="text-matte-black/80 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Connect with our advisory team to receive exclusive off-market listings and legal guidance on ITC ownership.
          </p>
          <button
            onClick={openPopup}
            className="inline-block bg-matte-black text-ivory text-xs uppercase tracking-[0.2em] font-bold py-4 px-10 hover:bg-white hover:text-matte-black transition-all duration-300"
          >
            Start Your Consultation
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
