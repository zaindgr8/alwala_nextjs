"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroPopup({ isOpen, onClose }: HeroPopupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    query: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          message: formData.query,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Popup error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-ivory z-[101] shadow-2xl max-h-[90dvh] flex flex-col overflow-hidden"
          >
            <div className="relative p-5 sm:p-8 overflow-y-auto flex-1">
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="space-y-2 max-w-[80%]">
                  <h3 className="text-2xl sm:text-3xl font-serif text-matte-black leading-tight">
                    Own Property in Oman. <br />
                    <span className="italic">Get Lifetime Residency.</span>
                  </h3>
                  <p className="text-sm text-matte-black/60 font-light">
                    Speak with our team and explore villas, apartments & investment options in Oman&apos;s top ITC zones.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-champagne rounded-full transition-colors text-matte-black"
                >
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center"
                  >
                    <CheckCircle2 size={64} className="text-gold" />
                  </motion.div>
                  <h4 className="text-xl font-serif text-matte-black">Request Sent</h4>
                  <p className="text-matte-black/60 font-light">Our luxury consultants will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="w-full bg-transparent border-b border-champagne p-3 text-sm outline-none focus:border-gold transition-all text-matte-black"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-transparent border-b border-champagne p-3 text-sm outline-none focus:border-gold transition-all text-matte-black"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold">Phone Number</label>
                        <input
                          required
                          type="tel"
                          placeholder="+968 00000000"
                          className="w-full bg-transparent border-b border-champagne p-3 text-sm outline-none focus:border-gold transition-all text-matte-black"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold">Budget Range</label>
                        <input
                          type="text"
                          placeholder="e.g. OMR 100K+"
                          className="w-full bg-transparent border-b border-champagne p-3 text-sm outline-none focus:border-gold transition-all text-matte-black"
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-matte-black/40 font-bold">Query</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Enter your query here..."
                        className="w-full bg-transparent border-b border-champagne p-3 text-sm outline-none focus:border-gold transition-all text-matte-black resize-none"
                        value={formData.query}
                        onChange={e => setFormData({...formData, query: e.target.value})}
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 bg-matte-black text-ivory text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-matte-black transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Request a Call <Send size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
