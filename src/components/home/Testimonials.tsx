"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mohammed Al Balushi",
    role: "Property Investor",
    rating: 5,
    text: "Alwalaa Real Estate provided an exceptional experience from start to finish. Their knowledge of Oman's ITC zones is unmatched. I secured my villa in Muscat Hills and the process was seamless. Highly recommend to anyone looking to invest in Oman.",
    avatar: "MA",
    location: "Muscat, Oman",
  },
  {
    name: "Sarah Thompson",
    role: "Expat Buyer",
    rating: 5,
    text: "As an expat, navigating property laws in Oman felt overwhelming. The Alwalaa team guided me every step of the way. They found me a beautiful apartment in an Integrated Tourism Complex with lifetime residency eligibility. Outstanding service!",
    avatar: "ST",
    location: "London, UK",
  },
  {
    name: "Ahmed Al Rashdi",
    role: "Real Estate Investor",
    rating: 5,
    text: "I've worked with many real estate agencies in the GCC, but Alwalaa stands out. Their professionalism, market expertise, and genuine care for clients is rare. The ROI on my Oman investment has exceeded expectations.",
    avatar: "AR",
    location: "Dubai, UAE",
  },
  {
    name: "Fatima Al Hinai",
    role: "Luxury Home Buyer",
    rating: 5,
    text: "تجربة رائعة مع شركة الولاء للعقارات. الفريق محترف جداً وقدم لي أفضل الخيارات في مسقط. أنصح كل من يريد شراء عقار في عُمان بالتواصل معهم. خدمة ممتازة من البداية حتى النهاية.",
    avatar: "FH",
    location: "Muscat, Oman",
  },
  {
    name: "James Mitchell",
    role: "Portfolio Investor",
    rating: 5,
    text: "Alwalaa helped me build a diversified property portfolio across Oman's top ITC zones. Their market insights and developer relationships are invaluable. The team is responsive, transparent, and truly client-focused.",
    avatar: "JM",
    location: "Toronto, Canada",
  },
  {
    name: "Khalid Al Amri",
    role: "First-Time Buyer",
    rating: 5,
    text: "Buying my first property felt daunting but Alwalaa made it effortless. They explained every detail, from financing options to residency benefits. The after-sales support was equally impressive. A truly trustworthy agency.",
    avatar: "KA",
    location: "Muscat, Oman",
  },
  {
    name: "Priya Sharma",
    role: "Investment Consultant",
    rating: 5,
    text: "I referred several of my clients to Alwalaa Real Estate and every single one came back satisfied. Their portfolio spans the best developments in Oman and they genuinely match clients with the right properties. World-class service.",
    avatar: "PS",
    location: "Mumbai, India",
  },
  {
    name: "Abdullah Al Zadjali",
    role: "Business Owner",
    rating: 5,
    text: "الولاء العقارية من أفضل الشركات في السوق العُماني. اشتريت شقة فاخرة بمساعدتهم وكان الإجراء سريع وسهل. الفريق محترف ومتعاون. سأتعامل معهم مجدداً بلا شك.",
    avatar: "AZ",
    location: "Salalah, Oman",
  },
];

const allTestimonials = [...testimonials, ...testimonials];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[380px] bg-white/5 border border-gold/15 rounded-2xl p-7 mx-3 hover:border-gold/40 hover:bg-white/8 transition-all duration-500">
      <div className="mb-4">
        <Quote size={28} className="text-gold/40 fill-gold/10" />
      </div>
      <p className="text-ivory/75 text-sm leading-relaxed font-light mb-6 line-clamp-4">
        {t.text}
      </p>
      <div className="w-8 h-px bg-gold/30 mb-5" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/80 to-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="text-matte-black text-xs font-bold">{t.avatar}</span>
          </div>
          <div>
            <p className="text-ivory text-sm font-medium leading-tight">{t.name}</p>
            <p className="text-ivory/40 text-[10px] font-light">{t.role} · {t.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating count={t.rating} />
          <span className="text-[9px] text-ivory/30 uppercase tracking-widest">Google Review</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 bg-matte-black overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #c9a96e 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-matte-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-matte-black to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-3">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-ivory leading-tight">
              What Our Clients <br />
              <span className="italic text-gold">Say About Us</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 sm:pb-1">
            <div className="text-right">
              <p className="text-4xl font-serif text-gold">5.0</p>
              <StarRating count={5} />
              <p className="text-[10px] text-ivory/40 mt-1 uppercase tracking-widest">Google Rating</p>
            </div>
            <div className="w-px h-14 bg-gold/20" />
            <div>
              <p className="text-4xl font-serif text-ivory">200+</p>
              <p className="text-[10px] text-ivory/40 uppercase tracking-widest mt-1">Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...allTestimonials].reverse().map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-12 px-6"
      >
        <a
          href="https://www.google.com/search?q=alwala+oman+real+estate+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/40 hover:text-gold transition-colors duration-300 border-b border-ivory/10 hover:border-gold/40 pb-1"
        >
          Read all reviews on Google
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
