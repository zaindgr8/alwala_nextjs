"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePopup } from "@/context/PopupContext";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Properties",
    href: "/property-search",
    children: [
      { name: "Off-Plan", href: "/property-search?status=OFF_PLAN" },
      { name: "Ready-To-Move", href: "/property-search?status=READY_TO_MOVE" },
    ]
  },
  { name: "Blogs", href: "/blog" },
  { name: "About", href: "/about-us" },
  { name: "Careers", href: "/careers" },
];

export default function Navbar({ forceBlack = false }: { forceBlack?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const { openPopup } = usePopup();

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-[60] transition-all duration-500 px-6 py-4",
          isScrolled
            ? "bg-ivory/80 backdrop-blur-md py-3 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <Image
                src="/Logo.png"
                alt="Alwalaa Logo"
                width={80}
                height={80}
               
                className=" max-h-24 scale-325"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveMenu(link.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-gold",
                    forceBlack ? "text-matte-black" : (isScrolled ? "text-matte-black" : "text-gold")
                  )}
                >
                  {link.name}
                  {link.children && <ChevronDown className="inline-block ml-1 w-4 h-4" />}
                </Link>

                {/* Mega Menu */}
                {/* Dropdown Menu */}
<AnimatePresence>
  {link.children && activeMenu === link.name && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full mt-3 w-56 rounded-md bg-white shadow-xl border border-gray-200 overflow-hidden z-50"
    >
      {link.children.map((child) => (
        <Link
          key={child.name}
          href={child.href}
          className="block px-5 py-3 text-sm text-matte-black hover:bg-gold hover:text-white transition-colors"
        >
          {child.name}
        </Link>
      ))}
    </motion.div>
  )}
</AnimatePresence>
              </div>
            ))}

              <button
               onClick={openPopup}
                className="bg-matte-black text-ivory px-6 py-2 text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-300"
              >
                Book Call
              </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-[70] relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Moved outside <nav> to prevent clipping/scrolling issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 bg-ivory z-[55] flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="text-3xl font-serif text-matte-black uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.children && (
                  <div className="flex flex-col items-center gap-3 -mt-2 mb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="text-xl text-matte-black/60 font-light uppercase tracking-wide hover:text-gold transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <Link
              href="#contact"
              className="bg-matte-black text-ivory px-8 py-3 text-sm uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Book Call         
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
