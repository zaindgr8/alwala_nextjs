// Single source of truth for the calling codes offered in the phone input and
// recognised when splitting a stored number for the CRM. Keep the UI and the
// Leadrat push in agreement by importing from here rather than re-declaring.

export interface CountryCode {
  country: string;
  code: string; // E.164 calling code, "+" prefixed
}

export const COUNTRY_CODES: CountryCode[] = [
  { country: "Oman", code: "+968" },
  { country: "United Arab Emirates", code: "+971" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "United Kingdom", code: "+44" },
  { country: "United States", code: "+1" },
  { country: "India", code: "+91" },
  { country: "Qatar", code: "+974" },
  { country: "Kuwait", code: "+965" },
  { country: "Bahrain", code: "+973" },
  { country: "Egypt", code: "+20" },
  { country: "Pakistan", code: "+92" },
  { country: "Bangladesh", code: "+880" },
  { country: "Philippines", code: "+63" },
  { country: "Canada", code: "+1" },
  { country: "Australia", code: "+61" },
  { country: "Germany", code: "+49" },
  { country: "France", code: "+33" },
  { country: "Spain", code: "+34" },
  { country: "Italy", code: "+39" },
  { country: "Netherlands", code: "+31" },
];

// Distinct calling codes, longest first. Prefix matching must try "+968" before
// "+96" and "+9", otherwise a shorter code steals the match.
export const CALLING_CODES_BY_LENGTH: string[] = Array.from(
  new Set(COUNTRY_CODES.map((c) => c.code))
).sort((a, b) => b.length - a.length);

// Finds the calling code a raw phone string starts with. Only applied to input
// that carries an explicit "+", since a bare local number like "91234567" would
// otherwise be misread as India's "+91" followed by a truncated subscriber
// number. Returns null when nothing in the list matches.
export function matchCallingCode(raw: string): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed.startsWith("+")) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;
  for (const code of CALLING_CODES_BY_LENGTH) {
    const bare = code.slice(1);
    if (digits.startsWith(bare)) return code;
  }
  return null;
}
