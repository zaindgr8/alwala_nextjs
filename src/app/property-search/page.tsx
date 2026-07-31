'use client';

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyHero from "@/components/properties/PropertyHero";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyCard from "@/components/properties/PropertyCard";
import { PropertyFilters as FiltersType, PropertyUI } from "@/types/property";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const PAGE_SIZE = 20;

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <PropertiesContent />
    </Suspense>
  );
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [properties, setProperties] = useState<PropertyUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FiltersType & { query: string }>({
    status: [],
    communities: [],
    type: [],
    minBeds: 1,
    maxBeds: 6,
    minBaths: 1,
    maxBaths: 6,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    sortBy: "Newest First",
    query: "",
  });

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const newStatus = params.status ? params.status.split(",") : [];
    const newCommunities = params.communities ? params.communities.split(",") : [];
    const newType = params.type ? params.type.split(",") : [];
    const newMinPrice = params.minPrice ? Number(params.minPrice) : null;
    const newMaxPrice = params.maxPrice ? Number(params.maxPrice) : null;
    const newSortBy = params.sortBy || "Newest First";
    const newQuery = params.query || "";

    setFilters(prev => ({
      ...prev,
      status: newStatus,
      communities: newCommunities,
      type: newType,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      sortBy: newSortBy,
      query: newQuery,
    }));
  }, [searchParams]);

  const updateFilters = (newFilters: Partial<FiltersType & { query: string }>) => {
    const updated = { ...filters, ...newFilters };

    const params = new URLSearchParams();
    if (updated.status.length > 0) params.set("status", updated.status.join(","));
    if (updated.communities.length > 0) params.set("communities", updated.communities.join(","));
    if (updated.type.length > 0) params.set("type", updated.type.join(","));
    if (updated.minPrice) params.set("minPrice", updated.minPrice.toString());
    if (updated.maxPrice) params.set("maxPrice", updated.maxPrice.toString());
    if (updated.sortBy !== "Newest First") params.set("sortBy", updated.sortBy);
    if (updated.query) params.set("query", updated.query);

    setFilters(updated);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.status.length > 0) params.set('status', filters.status[0]); // Simplified for API
        if (filters.type.length > 0) params.set('type', filters.type[0]);
        if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
        if (filters.communities.length > 0) params.set('communityId', filters.communities[0]);

        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];

        // Transform Prisma data to PropertyUI
        const mapped = arr.map((p: any) => ({
          ...p,
          location: p.community?.location || p.location,
          community: p.community?.name || '',
          images: p.gallery || [],
          area: Number(p.areaSqm),
        }));

        setProperties(mapped);
      } catch (e) {
        console.error('Failed to fetch properties', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, [filters]);

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const matchesTitle = prop.title?.toLowerCase().includes(q);
        const matchesLocation = prop.location?.toLowerCase().includes(q);
        const matchesCommunity = prop.community?.toLowerCase().includes(q);
        const matchesDesc = prop.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesCommunity && !matchesDesc) return false;
      }
      if (filters.status.length > 0 && !filters.status.includes(prop.status as any)) return false;
      if (filters.type.length > 0 && !filters.type.includes(prop.type as any)) return false;
      if (filters.communities.length > 0 && !filters.communities.includes(prop.community)) return false;
      if (filters.minPrice != null && prop.price != null && prop.price < filters.minPrice) return false;
      if (filters.maxPrice != null && prop.price != null && prop.price > filters.maxPrice) return false;
      if (prop.bedrooms && filters.minBeds && prop.bedrooms < filters.minBeds) return false;
      if (prop.bedrooms && filters.maxBeds && prop.bedrooms > filters.maxBeds) return false;
      return true;
    });
  }, [filters, properties]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));

  // Keep the current page valid when filters shrink the result set.
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Only render the current page's slice so the grid stays fast with 500+ listings.
  const pagedProperties = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProperties.slice(start, start + PAGE_SIZE);
  }, [filteredProperties, page]);


  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />

      <PropertyHero />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="space-y-12">
          <PropertyFilters filters={filters} setFilters={updateFilters} />

          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <p className="text-sm text-matte-black/60 font-light">
                Showing <span className="text-matte-black font-medium">{filteredProperties.length}</span> exceptional properties
              </p>

              <div className="relative group">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="bg-transparent border-b border-matte-black/20 text-xs uppercase tracking-widest py-2 pl-2 pr-8 appearance-none outline-none cursor-pointer hover:text-gold transition-colors"
                >
                  <option value="Newest First">Newest First</option>
                  <option value="Price Low To High">Price Low To High</option>
                  <option value="Price High To Low">Price High To Low</option>
                  <option value="Featured First">Featured First</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none w-3 h-3 border-r border-b border-matte-black/40 rotate-45" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {isLoading ? (
                <div className="col-span-full py-20 text-center text-matte-black/40 animate-pulse">
                  Loading the collection...
                </div>
              ) : (
                pagedProperties.map((prop, index) => (
                  <PropertyCard key={prop.id} property={prop} index={index} />
                ))
              )}
            </div>

            {!isLoading && filteredProperties.length > PAGE_SIZE && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-matte-black/10">
                <p className="text-xs uppercase tracking-widest text-matte-black/50 font-light">
                  Showing {(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, filteredProperties.length)} of {filteredProperties.length}
                </p>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page <= 1}
                    className="text-xs uppercase tracking-widest text-matte-black border-b border-matte-black/30 pb-1 hover:text-gold hover:border-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-matte-black disabled:hover:border-matte-black/30"
                  >
                    Previous
                  </button>
                  <span className="text-xs uppercase tracking-widest text-matte-black/60 font-light">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page >= totalPages}
                    className="text-xs uppercase tracking-widest text-matte-black border-b border-matte-black/30 pb-1 hover:text-gold hover:border-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-matte-black disabled:hover:border-matte-black/30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {!isLoading && filteredProperties.length === 0 && (
              <div className="py-32 text-center space-y-4">
                <h3 className="text-3xl font-serif text-matte-black">No Properties Found</h3>
                <p className="text-matte-black/60 font-light">We couldn't find any properties matching your current filters.</p>
                <button
                  onClick={() => updateFilters({
                    status: [], communities: [], type: [],
                    minBeds: 1, maxBeds: 6, minBaths: 1, maxBaths: 6,
                    minPrice: null, maxPrice: null, minArea: null, maxArea: null,
                    sortBy: "Newest First"
                  })}
                  className="text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:text-matte-black hover:border-matte-black transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
