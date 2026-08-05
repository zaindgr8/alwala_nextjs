"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, User, Mail } from "lucide-react";
import { PropertyUI } from "@/types/property";
import PhoneInput from "@/components/ui/PhoneInput";

interface InquiryPanelProps {
  property: PropertyUI;
}

export default function InquiryPanel({ property }: InquiryPanelProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          propertyId: property.id,
          message: `Inquiry about ${property.title}. Query: ${formData.query}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        query: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Inquiry panel error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 bg-white border border-champagne/30 shadow-xl rounded-sm p-8 space-y-8"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-serif text-matte-black">Inquire About Property</h3>
        <p className="text-xs uppercase tracking-widest text-gold font-bold">Request exclusive details</p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gold/10 border border-gold/30 text-center space-y-4"
        >
          <div className="text-gold flex justify-center"><Send size={32} /></div>
          <p className="text-sm text-matte-black font-medium">Your request has been sent. Our consultants will contact you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {phoneError && (
            <div className="text-red-500 text-[10px] uppercase tracking-widest font-bold text-center">
              {phoneError}
            </div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-matte-black/30" size={16} />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-ivory border border-champagne p-4 pl-10 text-xs outline-none focus:border-gold transition-all text-matte-black"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-matte-black/30" size={16} />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-ivory border border-champagne p-4 pl-10 text-xs outline-none focus:border-gold transition-all text-matte-black"
              />
            </div>
            <PhoneInput
              required
              placeholder="0000 0000"
              variant="minimal"
              className="[&>div]:bg-ivory [&>div]:border [&>div]:border-champagne [&>div]:focus-within:border-gold"
              value={formData.phone}
              onChange={val => setFormData({ ...formData, phone: val })}
              onValidationError={setPhoneError}
            />
            <div className="relative">
              <textarea
                required
                rows={4}
                placeholder="Query"
                value={formData.query}
                onChange={e => setFormData({ ...formData, query: e.target.value })}
                className="w-full bg-ivory border border-champagne p-4 text-xs outline-none focus:border-gold transition-all resize-none text-matte-black"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-matte-black text-ivory py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-matte-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Request Details <Send size={14} /></>
              )}
            </button>
            <button
              type="button"
              className="w-full border border-matte-black text-matte-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-matte-black hover:text-ivory transition-all duration-500 flex items-center justify-center gap-3"
            >
              <Calendar size={14} /> Schedule Viewing
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
