"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyHeader from "@/components/properties/PropertyHeader";
import PropertyStats from "@/components/properties/PropertyStats";
import PropertyDescription from "@/components/properties/PropertyDescription";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PaymentPlan from "@/components/properties/PaymentPlan";
import PropertyHighlights from "@/components/properties/PropertyHighlights";
import PropertyLocation from "@/components/properties/PropertyLocation";
import InquiryPanel from "@/components/properties/InquiryPanel";
import RelatedProperties from "@/components/properties/RelatedProperties";
import { MOCK_PROPERTIES } from "@/lib/properties-data";
import { motion } from "framer-motion";

export default function PropertyDetailPage() {
  const params = useParams();
  const property = MOCK_PROPERTIES.find(p => p.slug === params.slug);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-matte-black">Property Not Found</h1>
          <p className="text-matte-black/60 font-light">The luxury residence you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PropertyGallery images={property.images} />
        </motion.div>

        <PropertyHeader property={property} />

        <PropertyStats property={property} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-20">
            <PropertyDescription description={property.description} />
            <PropertyAmenities amenities={property.amenities} />
            <PaymentPlan plan={property.paymentPlan} />
            <PropertyHighlights highlights={property.highlights} />
            <PropertyLocation location={property.location} coordinates={property.coordinates} />
          </div>

          <div className="lg:col-span-1">
            <InquiryPanel property={property} />
          </div>
        </div>
        <RelatedProperties currentProperty={property} />
      </div>
      <Footer />
    </main>
  );
}
