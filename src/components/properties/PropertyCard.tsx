"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Bed, Bath, Square, MapPin, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { PropertyUI } from "@/types/property";
import PropertyInquiryModal from "./PropertyInquiryModal";

interface PropertyCardProps {
  property: PropertyUI;
  index: number;
}

// A swipe advances the slide if it travelled far enough, or was flicked hard
// enough that distance alone would understate the intent.
const SWIPE_DISTANCE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 500;

// The incoming slide enters from the side you're heading towards, and the
// outgoing one leaves the opposite way, so the motion tracks the swipe.
const slideVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? "100%" : "-100%" }),
  center: { x: "0%" },
  exit: (direction: number) => ({ x: direction >= 0 ? "-100%" : "100%" }),
};

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const images = property.images ?? [];
  const hasMultiple = images.length > 1;

  // Direction travels with the index so the exiting slide animates the same
  // way the entering one does.
  const [[currentImage, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paginate = (step: number) => {
    if (!hasMultiple) return;
    setSlide(([current]) => [(current + step + images.length) % images.length, step]);
  };

  const markLoaded = (i: number) =>
    setLoadedImages((prev) => (prev[i] ? prev : { ...prev, [i]: true }));

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      paginate(1);
    } else if (offset.x > SWIPE_DISTANCE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      paginate(-1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(1);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(-1);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative bg-white border border-champagne/30 overflow-hidden rounded-sm hover:shadow-2xl hover:shadow-gold/10 transition-all duration-700 h-full flex flex-col"
      >
        {/* Image Slider Container */}
        <div className="relative h-[300px] w-full overflow-hidden group/slider bg-champagne/20">
          {images.length > 0 ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt={property.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 260, damping: 30 } }}
                whileHover={{ scale: 1.05 }}
                drag={hasMultiple ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                draggable={false}
                onLoad={() => markLoaded(currentImage)}
                onError={() => markLoaded(currentImage)}
                // A cached image can finish loading before React attaches
                // onLoad, which would strand the spinner on screen.
                ref={(node) => {
                  if (node?.complete) markLoaded(currentImage);
                }}
                // Keep vertical page scrolling available over the image.
                style={{ touchAction: "pan-y" }}
                className={`absolute inset-0 w-full h-full object-cover select-none ${
                  hasMultiple ? "cursor-grab active:cursor-grabbing" : ""
                }`}
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-matte-black/25">
              <ImageOff size={28} />
            </div>
          )}

          {/* Loading state for the visible slide */}
          {images.length > 0 && !loadedImages[currentImage] && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-champagne/40 animate-pulse">
              <span className="h-8 w-8 rounded-full border-2 border-matte-black/15 border-t-gold animate-spin" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Status Tags */}
          <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
            <span className="bg-gold text-matte-black px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
              {property.status === "OFF_PLAN" ? "Off-Plan" :
               property.status === "UNDER_CONSTRUCTION" ? "Under Construction" :
               property.status === "READY_TO_MOVE" ? "Ready to Move" :
               property.status === "FOR_SALE" ? "For Sale" :
               property.status.replace(/_/g, " ")}
            </span>
            {property.featured && (
              <span className="bg-ivory text-matte-black px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                Featured
              </span>
            )}
          </div>

          {/* Navigation Arrows — always visible on touch, hover-revealed on
              pointer devices where the hover affordance actually exists. */}
          {hasMultiple && (
            <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 flex justify-between px-2 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover/slider:opacity-100 md:focus-within:opacity-100">
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="p-2 rounded-full bg-white/80 text-matte-black hover:bg-gold transition-colors shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="p-2 rounded-full bg-white/80 text-matte-black hover:bg-gold transition-colors shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Image Counter */}
          {hasMultiple && (
            <div className="absolute bottom-4 right-4 z-10 bg-matte-black/40 backdrop-blur-md text-ivory text-[9px] uppercase tracking-widest px-2 py-1 rounded-full">
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold/80">
              <MapPin size={14} />
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {property.location}
              </span>
            </div>
            <h3 className="text-xl font-serif text-matte-black group-hover:text-gold transition-colors duration-500">
              {property.title}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-serif text-matte-black">
              {Math.round(property.price).toLocaleString('en-US')} <span className="text-xs uppercase tracking-tighter">{property.currency}</span>
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-champagne/30">
            <div className="flex flex-col items-center gap-1">
              <Bed size={18} className="text-gold/60" />
              <span className="text-[10px] text-matte-black/60 font-light">{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath size={18} className="text-gold/60" />
              <span className="text-[10px] text-matte-black/60 font-light">{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Square size={18} className="text-gold/60" />
              <span className="text-[10px] text-matte-black/60 font-light">{property.area} m²</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-auto block w-full text-center py-4 bg-matte-black text-ivory text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-matte-black transition-all duration-500"
          >
            Request Details
          </button>
        </div>
      </motion.div>

      <PropertyInquiryModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
