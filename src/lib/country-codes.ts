// Single source of truth for the calling codes offered in the phone input and
// recognised when splitting a stored number for the CRM. Keep the UI and the
// Leadrat push in agreement by importing from here rather than re-declaring.

export interface CountryCode {
  country: string;
  code: string; // E.164 calling code, "+" prefixed
  flag: string; // Emoji flag
  iso: string; // ISO 3166-1 alpha-2 code
}

export const COUNTRY_CODES: CountryCode[] = [
  // --- GCC & Middle East (Prioritized) ---
  { country: "Oman", code: "+968", flag: "🇴🇲", iso: "OM" },
  { country: "United Arab Emirates", code: "+971", flag: "🇦🇪", iso: "AE" },
  { country: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA" },
  { country: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA" },
  { country: "Kuwait", code: "+965", flag: "🇰🇼", iso: "KW" },
  { country: "Bahrain", code: "+973", flag: "🇧🇭", iso: "BH" },
  { country: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG" },
  { country: "Jordan", code: "+962", flag: "🇯🇴", iso: "JO" },
  { country: "Lebanon", code: "+961", flag: "🇱🇧", iso: "LB" },
  { country: "Iraq", code: "+964", flag: "🇮🇶", iso: "IQ" },
  { country: "Yemen", code: "+967", flag: "🇾🇪", iso: "YE" },
  { country: "Syria", code: "+963", flag: "🇸🇾", iso: "SY" },
  { country: "Palestine", code: "+970", flag: "🇵🇸", iso: "PS" },
  { country: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR" },
  { country: "Iran", code: "+98", flag: "🇮🇷", iso: "IR" },
  { country: "Cyprus", code: "+357", flag: "🇨🇾", iso: "CY" },

  // --- North America ---
  { country: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
  { country: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
  { country: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX" },

  // --- Europe ---
  { country: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
  { country: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
  { country: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
  { country: "Italy", code: "+39", flag: "🇮🇹", iso: "IT" },
  { country: "Spain", code: "+34", flag: "🇪🇸", iso: "ES" },
  { country: "Switzerland", code: "+41", flag: "🇨🇭", iso: "CH" },
  { country: "Netherlands", code: "+31", flag: "🇳🇱", iso: "NL" },
  { country: "Belgium", code: "+32", flag: "🇧🇪", iso: "BE" },
  { country: "Austria", code: "+43", flag: "🇦🇹", iso: "AT" },
  { country: "Sweden", code: "+46", flag: "🇸🇪", iso: "SE" },
  { country: "Norway", code: "+47", flag: "🇳🇴", iso: "NO" },
  { country: "Denmark", code: "+45", flag: "🇩🇰", iso: "DK" },
  { country: "Finland", code: "+358", flag: "🇫🇮", iso: "FI" },
  { country: "Ireland", code: "+353", flag: "🇮🇪", iso: "IE" },
  { country: "Portugal", code: "+351", flag: "🇵🇹", iso: "PT" },
  { country: "Greece", code: "+30", flag: "🇬🇷", iso: "GR" },
  { country: "Poland", code: "+48", flag: "🇵🇱", iso: "PL" },
  { country: "Czech Republic", code: "+420", flag: "🇨🇿", iso: "CZ" },
  { country: "Hungary", code: "+36", flag: "🇭🇺", iso: "HU" },
  { country: "Romania", code: "+40", flag: "🇷🇴", iso: "RO" },
  { country: "Bulgaria", code: "+359", flag: "🇧🇬", iso: "BG" },
  { country: "Croatia", code: "+385", flag: "🇭🇷", iso: "HR" },
  { country: "Slovakia", code: "+421", flag: "🇸🇰", iso: "SK" },
  { country: "Slovenia", code: "+386", flag: "🇸🇮", iso: "SI" },
  { country: "Estonia", code: "+372", flag: "🇪🇪", iso: "EE" },
  { country: "Latvia", code: "+371", flag: "🇱🇻", iso: "LV" },
  { country: "Lithuania", code: "+370", flag: "🇱🇹", iso: "LT" },
  { country: "Luxembourg", code: "+352", flag: "🇱🇺", iso: "LU" },
  { country: "Monaco", code: "+377", flag: "🇲🇨", iso: "MC" },
  { country: "Malta", code: "+356", flag: "🇲🇹", iso: "MT" },
  { country: "Iceland", code: "+354", flag: "🇮🇸", iso: "IS" },
  { country: "Serbia", code: "+381", flag: "🇷🇸", iso: "RS" },
  { country: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦", iso: "BA" },
  { country: "Albania", code: "+355", flag: "🇦🇱", iso: "AL" },
  { country: "North Macedonia", code: "+389", flag: "🇲🇰", iso: "MK" },
  { country: "Montenegro", code: "+382", flag: "🇲🇪", iso: "ME" },
  { country: "Ukraine", code: "+380", flag: "🇺🇦", iso: "UA" },
  { country: "Belarus", code: "+375", flag: "🇧🇾", iso: "BY" },
  { country: "Moldova", code: "+373", flag: "🇲🇩", iso: "MD" },
  { country: "Georgia", code: "+995", flag: "🇬🇪", iso: "GE" },
  { country: "Armenia", code: "+374", flag: "🇦🇲", iso: "AM" },
  { country: "Azerbaijan", code: "+994", flag: "🇦🇿", iso: "AZ" },
  { country: "Russia", code: "+7", flag: "🇷🇺", iso: "RU" },

  // --- South Asia & Central Asia ---
  { country: "India", code: "+91", flag: "🇮🇳", iso: "IN" },
  { country: "Pakistan", code: "+92", flag: "🇵🇰", iso: "PK" },
  { country: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD" },
  { country: "Sri Lanka", code: "+94", flag: "🇱🇰", iso: "LK" },
  { country: "Nepal", code: "+977", flag: "🇳🇵", iso: "NP" },
  { country: "Maldives", code: "+960", flag: "🇲🇻", iso: "MV" },
  { country: "Afghanistan", code: "+93", flag: "🇦🇫", iso: "AF" },
  { country: "Kazakhstan", code: "+7", flag: "🇰🇿", iso: "KZ" },
  { country: "Uzbekistan", code: "+998", flag: "🇺🇿", iso: "UZ" },
  { country: "Turkmenistan", code: "+993", flag: "🇹🇲", iso: "TM" },
  { country: "Kyrgyzstan", code: "+996", flag: "🇰🇬", iso: "KG" },
  { country: "Tajikistan", code: "+992", flag: "🇹🇯", iso: "TJ" },

  // --- East & Southeast Asia ---
  { country: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
  { country: "Hong Kong", code: "+852", flag: "🇭🇰", iso: "HK" },
  { country: "Taiwan", code: "+886", flag: "🇹🇼", iso: "TW" },
  { country: "Macau", code: "+853", flag: "🇲🇴", iso: "MO" },
  { country: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
  { country: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR" },
  { country: "Singapore", code: "+65", flag: "🇸🇬", iso: "SG" },
  { country: "Malaysia", code: "+60", flag: "🇲🇾", iso: "MY" },
  { country: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH" },
  { country: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID" },
  { country: "Thailand", code: "+66", flag: "🇹🇭", iso: "TH" },
  { country: "Vietnam", code: "+84", flag: "🇻🇳", iso: "VN" },
  { country: "Cambodia", code: "+855", flag: "🇰🇭", iso: "KH" },
  { country: "Myanmar", code: "+95", flag: "🇲🇲", iso: "MM" },
  { country: "Laos", code: "+856", flag: "🇱🇦", iso: "LA" },
  { country: "Brunei", code: "+673", flag: "🇧🇳", iso: "BN" },
  { country: "Mongolia", code: "+976", flag: "🇲🇳", iso: "MN" },

  // --- Oceania / Australasia ---
  { country: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
  { country: "New Zealand", code: "+64", flag: "🇳🇿", iso: "NZ" },
  { country: "Fiji", code: "+679", flag: "🇫🇯", iso: "FJ" },

  // --- South & Central America ---
  { country: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
  { country: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR" },
  { country: "Colombia", code: "+57", flag: "🇨🇴", iso: "CO" },
  { country: "Chile", code: "+56", flag: "🇨🇱", iso: "CL" },
  { country: "Peru", code: "+51", flag: "🇵🇪", iso: "PE" },
  { country: "Venezuela", code: "+58", flag: "🇻🇪", iso: "VE" },
  { country: "Ecuador", code: "+593", flag: "🇪🇨", iso: "EC" },
  { country: "Panama", code: "+507", flag: "🇵🇦", iso: "PA" },
  { country: "Costa Rica", code: "+506", flag: "🇨🇷", iso: "CR" },
  { country: "Dominican Republic", code: "+1809", flag: "🇩🇴", iso: "DO" },

  // --- Africa ---
  { country: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
  { country: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG" },
  { country: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
  { country: "Morocco", code: "+212", flag: "🇲🇦", iso: "MA" },
  { country: "Algeria", code: "+213", flag: "🇩🇿", iso: "DZ" },
  { country: "Tunisia", code: "+216", flag: "🇹🇳", iso: "TN" },
  { country: "Libya", code: "+218", flag: "🇱🇾", iso: "LY" },
  { country: "Sudan", code: "+249", flag: "🇸🇩", iso: "SD" },
  { country: "Ethiopia", code: "+251", flag: "🇪🇹", iso: "ET" },
  { country: "Ghana", code: "+233", flag: "🇬🇭", iso: "GH" },
  { country: "Tanzania", code: "+255", flag: "🇹🇿", iso: "TZ" },
  { country: "Uganda", code: "+256", flag: "🇺🇬", iso: "UG" },
  { country: "Rwanda", code: "+250", flag: "🇷🇼", iso: "RW" },
  { country: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU" },
];

// Distinct calling codes, longest first. Prefix matching must try longer codes first.
export const CALLING_CODES_BY_LENGTH: string[] = Array.from(
  new Set(COUNTRY_CODES.map((c) => c.code))
).sort((a, b) => b.length - a.length);

// Default country
export const DEFAULT_COUNTRY = COUNTRY_CODES[0]; // Oman +968

// Finds the calling code a raw phone string starts with.
export function matchCallingCode(raw: string): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;

  // If starts with +, match directly
  if (trimmed.startsWith("+")) {
    const digits = trimmed.replace(/\D/g, "");
    if (!digits) return null;
    for (const code of CALLING_CODES_BY_LENGTH) {
      const bare = code.slice(1);
      if (digits.startsWith(bare)) return code;
    }
  }

  // If starts with 00 (international format), treat as +
  if (trimmed.startsWith("00")) {
    const digits = trimmed.slice(2).replace(/\D/g, "");
    for (const code of CALLING_CODES_BY_LENGTH) {
      const bare = code.slice(1);
      if (digits.startsWith(bare)) return code;
    }
  }

  return null;
}

// Finds the CountryCode object by calling code or ISO
export function findCountryByCode(code: string): CountryCode {
  const cleanCode = code.startsWith("+") ? code : `+${code}`;
  return COUNTRY_CODES.find((c) => c.code === cleanCode) || DEFAULT_COUNTRY;
}

// Normalizes and formats any phone string into full E.164 with guaranteed '+' sign:
// e.g. "+968 91234567" or "+971 501234567"
export function formatFullPhone(raw: string, defaultCode = "+968"): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  // If already starts with '+', ensure clean structure
  if (trimmed.startsWith("+")) {
    const matched = matchCallingCode(trimmed);
    if (matched) {
      const digitsOnly = trimmed.replace(/\D/g, "");
      const bareCode = matched.replace("+", "");
      const subscriberDigits = digitsOnly.slice(bareCode.length);
      return `${matched} ${subscriberDigits}`.trim();
    }
    return trimmed;
  }

  // If starts with 00 (e.g. 0096891234567)
  if (trimmed.startsWith("00")) {
    const matched = matchCallingCode(trimmed);
    if (matched) {
      const digitsOnly = trimmed.slice(2).replace(/\D/g, "");
      const bareCode = matched.replace("+", "");
      const subscriberDigits = digitsOnly.slice(bareCode.length);
      return `${matched} ${subscriberDigits}`.trim();
    }
  }

  // Raw local digits without +, prepend default calling code
  const digits = trimmed.replace(/\D/g, "");
  const cleanDefault = defaultCode.startsWith("+") ? defaultCode : `+${defaultCode}`;
  return `${cleanDefault} ${digits}`.trim();
}
