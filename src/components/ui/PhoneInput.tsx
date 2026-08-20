"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, X } from "lucide-react";
import {
  COUNTRY_CODES,
  CountryCode,
  DEFAULT_COUNTRY,
  matchCallingCode,
  findCountryByCode,
  formatFullPhone,
} from "@/lib/country-codes";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "minimal" | "boxed";
  className?: string;
  required?: boolean;
  onValidationError?: (error: string | null) => void;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "0000 0000",
  variant = "minimal",
  className,
  required = false,
  onValidationError,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Initialize and synchronize with external `value` prop
  useEffect(() => {
    if (!value) {
      // If empty on mount, initialize parent with default country code (+968 )
      onChange(`${DEFAULT_COUNTRY.code} `);
      return;
    }

    // If external value has changed or was provided
    const matchedCode = matchCallingCode(value);
    if (matchedCode) {
      const country = findCountryByCode(matchedCode);
      setSelectedCountry(country);
      
      const allDigits = value.replace(/\D/g, "");
      const bareCode = matchedCode.replace("+", "");
      const remainingDigits = allDigits.startsWith(bareCode)
        ? allDigits.slice(bareCode.length)
        : allDigits;
      setPhoneDigits(remainingDigits);
    } else {
      // If no code matched but digits exist
      const rawDigits = value.replace(/\D/g, "");
      setPhoneDigits(rawDigits);
    }
  }, []); // Run on initial mount

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isDropdownOpen]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRY_CODES;
    const query = searchQuery.toLowerCase().trim().replace("+", "");
    return COUNTRY_CODES.filter(
      (c) =>
        c.country.toLowerCase().includes(query) ||
        c.code.includes(query) ||
        c.iso.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle phone number typing
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;

    // Check if user pasted a full number with '+' or international code
    if (rawVal.startsWith("+") || rawVal.startsWith("00")) {
      const matched = matchCallingCode(rawVal);
      if (matched) {
        const country = findCountryByCode(matched);
        setSelectedCountry(country);
        const digits = rawVal.replace(/\D/g, "").slice(matched.replace("+", "").length);
        setPhoneDigits(digits);
        onChange(`${country.code} ${digits}`.trim());
        onValidationError?.(null);
        return;
      }
    }

    // Only allow numbers and spaces in the subscriber field
    const digitsOnly = rawVal.replace(/[^\d\s]/g, "");
    setPhoneDigits(digitsOnly);

    // Always emit with (+) sign and country code: e.g. "+968 91234567"
    const formatted = digitsOnly.trim()
      ? `${selectedCountry.code} ${digitsOnly.trim()}`
      : `${selectedCountry.code} `;
    
    onChange(formatted);
    onValidationError?.(null);
  };

  // Handle selecting a country from the dropdown
  const handleSelectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery("");

    // Emit updated phone with new country code and existing digits
    const formatted = phoneDigits.trim()
      ? `${country.code} ${phoneDigits.trim()}`
      : `${country.code} `;
    
    onChange(formatted);
    onValidationError?.(null);

    // Focus back to phone number input
    phoneInputRef.current?.focus();
  };

  const isMinimal = variant === "minimal";

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div
        className={cn(
          "flex items-center transition-all duration-200",
          isMinimal
            ? "border-b border-champagne focus-within:border-gold bg-transparent"
            : "bg-luxury-black border border-luxury-border rounded-xl focus-within:ring-2 focus-within:ring-gold-primary/50"
        )}
      >
        {/* Interactive Country Code Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-3 text-sm transition-colors cursor-pointer select-none shrink-0 group",
            isMinimal
              ? "hover:bg-champagne/40 text-matte-black border-r border-champagne/60"
              : "hover:bg-luxury-border/60 text-white border-r border-luxury-border"
          )}
          title="Change Country Code"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span
            className={cn(
              "font-medium text-xs tracking-wider",
              isMinimal ? "text-gold font-semibold" : "text-gold-primary font-semibold"
            )}
          >
            {selectedCountry.code}
          </span>
          <ChevronDown
            size={14}
            className={cn(
              "transition-transform duration-200",
              isMinimal ? "text-matte-black/50 group-hover:text-matte-black" : "text-white/50 group-hover:text-white",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        {/* Phone Subscriber Digits Input */}
        <input
          ref={phoneInputRef}
          type="tel"
          required={required}
          value={phoneDigits}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-3 py-3 text-sm outline-none font-light bg-transparent transition-all",
            isMinimal
              ? "text-matte-black placeholder:text-matte-black/40"
              : "text-white placeholder:text-zinc-500"
          )}
        />
      </div>

      {/* Searchable Country Code Dropdown Popover */}
      {isDropdownOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-80 max-w-[95vw] rounded-xl shadow-2xl z-[150] border flex flex-col animate-in fade-in slide-in-from-top-2 duration-150",
            isMinimal
              ? "bg-ivory border-champagne shadow-black/10"
              : "bg-luxury-black border-luxury-border shadow-black/50"
          )}
        >
          {/* Search Box */}
          <div
            className={cn(
              "p-2.5 border-b flex items-center gap-2 shrink-0 rounded-t-xl",
              isMinimal
                ? "bg-ivory border-champagne"
                : "bg-luxury-black border-luxury-border"
            )}
          >
            <Search
              size={14}
              className={isMinimal ? "text-matte-black/40" : "text-zinc-500"}
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className={cn(
                "w-full text-xs outline-none bg-transparent",
                isMinimal
                  ? "text-matte-black placeholder:text-matte-black/40"
                  : "text-white placeholder:text-zinc-500"
              )}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={cn(
                  "p-0.5 rounded-full",
                  isMinimal ? "hover:bg-champagne" : "hover:bg-luxury-border"
                )}
              >
                <X size={12} className={isMinimal ? "text-matte-black/60" : "text-zinc-400"} />
              </button>
            )}
          </div>

          {/* Country List — scrollable, stops scroll from bubbling to modal */}
          <div
            className="overflow-y-auto p-1"
            style={{ maxHeight: "260px", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" as any }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {filteredCountries.length === 0 ? (
              <div
                className={cn(
                  "p-4 text-center text-xs",
                  isMinimal ? "text-matte-black/50" : "text-zinc-500"
                )}
              >
                No country found
              </div>
            ) : (
              filteredCountries.map((country) => {
                const isSelected = country.code === selectedCountry.code && country.country === selectedCountry.country;
                return (
                  <button
                    key={`${country.iso}-${country.code}-${country.country}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left cursor-pointer",
                      isMinimal
                        ? isSelected
                          ? "bg-gold/15 text-matte-black font-semibold"
                          : "hover:bg-champagne/60 text-matte-black"
                        : isSelected
                        ? "bg-gold-primary/20 text-white font-semibold"
                        : "hover:bg-luxury-border/60 text-zinc-300"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className="truncate">{country.country}</span>
                    </div>
                    <span
                      className={cn(
                        "ml-2 font-mono font-medium shrink-0",
                        isMinimal ? "text-gold" : "text-gold-primary"
                      )}
                    >
                      {country.code}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
