"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { COUNTRY_CODES, matchCallingCode } from "@/lib/country-codes";

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
  const [inputValue, setInputValue] = useState("");
  const [selectedCode, setSelectedCode] = useState("+968");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCodes, setFilteredCodes] = useState(COUNTRY_CODES);
  // Default to true so +968 is pre-selected and always included in emitted value
  const [isCodeSelected, setIsCodeSelected] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // On mount: seed the parent with the default country code so the submitted
  // phone always carries a code even if the user never interacts with the picker.
  useEffect(() => {
    if (!value) {
      onChange("+968 ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value && !inputValue) {
      // Parse existing value — longest calling code first, so "+968 ..." isn't
      // matched as "+96"/"+9".
      const codeMatch = matchCallingCode(value);
      if (codeMatch) {
        setSelectedCode(codeMatch);
        // codeMatch is e.g. "+971" (length 4), bare digits of code = length-1 = 3
        const bareLen = codeMatch.length - 1; // digits-only length of the code
        setInputValue(value.replace(/\D/g, "").slice(bareLen));
        setIsCodeSelected(true);
      }
    }
  }, [value, inputValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // If user clears the number field, keep the code selected but clear the number.
    // The user can press Backspace again on an empty field to switch the country code.
    if (!val) {
      setInputValue("");
      onChange(`${selectedCode} `);
      onValidationError?.(null);
      return;
    }

    // If code is already selected, just update the number part
    if (isCodeSelected) {
      setInputValue(val);
      onChange(`${selectedCode} ${val}`);
      onValidationError?.(null);
      return;
    }

    // User is typing the country code
    setInputValue(val);

    // Filter matching codes
    const searchTerm = val.toLowerCase().replace("+", "");
    const matches = COUNTRY_CODES.filter(({ country, code }) =>
      code.includes(searchTerm) ||
      country.toLowerCase().includes(searchTerm)
    );

    setFilteredCodes(matches);
    setIsDropdownOpen(matches.length > 0);

    // Check for exact code match
    const exactMatch = COUNTRY_CODES.find(c => val === c.code || val === c.code.replace("+", ""));
    if (exactMatch) {
      setSelectedCode(exactMatch.code);
      setIsCodeSelected(true);
      setIsDropdownOpen(false);
      setInputValue("");
      onChange(exactMatch.code + " ");
      onValidationError?.(null);
    } else {
      onChange(val);
    }
  };

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setIsCodeSelected(true);
    setIsDropdownOpen(false);
    setInputValue("");
    onChange(code + " ");
    onValidationError?.(null);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (!isCodeSelected) {
      setIsDropdownOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && isCodeSelected) {
      // Allow user to go back and change the country code
      setIsCodeSelected(false);
      setInputValue(selectedCode);
      setIsDropdownOpen(true);
      e.preventDefault();
    }
  };

  const wrapperClasses = cn(
    "relative transition-all",
    className
  );

  const inputWrapperClasses = cn(
    "flex items-center gap-2 transition-all",
    variant === "minimal"
      ? "border-b border-champagne focus-within:border-gold bg-transparent"
      : "bg-luxury-black border border-luxury-border rounded-xl focus-within:ring-2 focus-within:ring-gold-primary/50 px-3"
  );

  const prefixClasses = cn(
    "font-light text-sm select-none",
    variant === "minimal"
      ? "text-matte-black/60 pl-3"
      : "text-white/60 pl-3"
  );

  const selectedCodeClasses = cn(
    "font-medium text-sm",
    variant === "minimal"
      ? "text-gold"
      : "text-gold-primary"
  );

  const inputClasses = cn(
    "outline-none font-light text-sm w-full transition-all",
    variant === "minimal"
      ? "bg-transparent text-matte-black p-3 placeholder:text-matte-black/40"
      : "bg-transparent text-white p-3 placeholder:text-zinc-500"
  );

  const dropdownClasses = cn(
    "absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto z-50 shadow-lg",
    variant === "minimal"
      ? "bg-ivory border border-champagne"
      : "bg-luxury-black border border-luxury-border rounded-lg"
  );

  const dropdownItemClasses = (isSelected: boolean) => cn(
    "px-4 py-2 cursor-pointer transition-colors text-sm",
    variant === "minimal"
      ? cn(
          "hover:bg-champagne",
          isSelected ? "bg-gold/10 text-gold font-medium" : "text-matte-black"
        )
      : cn(
          "hover:bg-luxury-border",
          isSelected ? "bg-gold-primary/10 text-gold-primary font-medium" : "text-white"
        )
  );

  return (
    <div className={wrapperClasses} ref={dropdownRef}>
      <div className={inputWrapperClasses}>
        <span className={prefixClasses}>+</span>
        {isCodeSelected && (
          <span className={selectedCodeClasses}>{selectedCode.replace("+", "")}</span>
        )}
        <input
          ref={inputRef}
          required={required}
          type="tel"
          placeholder={isCodeSelected ? placeholder : "971 or UAE..."}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={inputClasses}
        />
        {!isCodeSelected && (
          <ChevronDown
            size={16}
            className={cn(
              "mr-3 transition-transform",
              variant === "minimal" ? "text-matte-black/40" : "text-white/40",
              isDropdownOpen && "rotate-180"
            )}
          />
        )}
      </div>

      {isDropdownOpen && !isCodeSelected && filteredCodes.length > 0 && (
        <div className={dropdownClasses}>
          {filteredCodes.map(({ country, code }) => (
            <div
              key={`${country}-${code}`}
              className={dropdownItemClasses(code === selectedCode)}
              onClick={() => handleCodeSelect(code)}
            >
              <span className="font-medium">{code}</span>
              <span className={cn("ml-2", variant === "minimal" ? "text-matte-black/60" : "text-white/60")}>
                {country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
