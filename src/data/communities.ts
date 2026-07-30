import {
  PropertyType
} from "@/types/db";

export interface CommunityMetadata {
  hero: {
    tagline: string;
    locationBadge: string;
    investmentScore: string;
    startingPrice: string;
    bannerImage: string;
    bannerVideo?: string;
  };
  overview: {
    developer: string;
    propertyTypes: string[];
    avgRoi: string;
    rentalYield: string;
    completionStatus: string;
    airportDistance: string;
    lifestyleRating: string;
  };
  introduction: {
    title: string;
    content: string;
    highlights: string[];
  };
  brochure: {
    trustMessage: string;
    incentives: string[];
  };
  about: {
    vision: string;
    masterplan: string;
    lifestyle: string;
    amenities: { icon: string; title: string; description: string }[];
    infrastructure: string;
    growthPotential: string;
    images: { url: string; caption: string }[];
  };
  investmentAnalysis: {
    marketOutlook: string;
    appreciationTrends: string;
    demandForecast: string;
    rentalPerformance: string;
    indicators: { label: string; value: string; trend: 'up' | 'down' | 'stable' }[];
  };
  whyInvest: {
    cards: { icon: string; title: string; description: string }[];
  };
  facts: {
    stats: { label: string; value: string; unit?: string }[];
  };
  economicImpact: {
    commercialActivity: string;
    businessEcosystem: string;
    employmentGen: string;
    tourismContribution: string;
    futurePlans: string;
  };
  location: {
    mapCenter: { lat: number; lng: number };
    landmarks: { name: string; distance: string; time: string }[];
  };
  investorPriorities: {
    points: { title: string; description: string }[];
  };
  gallery: {
    categories: {
      name: string;
      images: string[];
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  blogCategoryTag: string;
}

const DEFAULT_DATA: CommunityMetadata = {
  hero: {
    tagline: "EXCLUSIVE REAL ESTATE • UNPARALLELED LUXURY",
    locationBadge: "Muscat, Oman",
    investmentScore: "9.0/10",
    startingPrice: "OMR 300,000",
    bannerImage: "/p3.jpg",
  },
  overview: {
    developer: "Premium Developers",
    propertyTypes: ["Villas", "Apartments"],
    avgRoi: "7.0%",
    rentalYield: "6.0%",
    completionStatus: "Operational",
    airportDistance: "20 Mins",
    lifestyleRating: "⭐⭐⭐⭐",
  },
  introduction: {
    title: "Discover the Enclave",
    content: "An extraordinary destination where luxury meets nature, providing a sanctuary for those who demand excellence in every detail.",
    highlights: ["Prime Location", "World-class Amenities", "High Capital Growth", "Secure Community"],
  },
  brochure: {
    trustMessage: "Receive exclusive investment insights and floor plans for this premium destination.",
    incentives: ["Priority Access", "Price List", "Consultation"],
  },
  about: {
    vision: "A vision of sustainable luxury and architectural brilliance.",
    masterplan: "A master-planned community integrating nature and modernism.",
    lifestyle: "A balanced lifestyle focused on wellness and elegance.",
    amenities: [
      { icon: "🏊", title: "Infinity Pools", description: "State-of-the-art wellness facilities." },
      { icon: "🌳", title: "Private Gardens", description: "Lush landscapes for serene living." },
    ],
    infrastructure: "Modern smart-city infrastructure.",
    growthPotential: "Consistent long-term appreciation trends.",
    images: [{ url: "/p3.jpg", caption: "Luxury Architecture" }],
  },
  investmentAnalysis: {
    marketOutlook: "Positive growth trajectory for 2026.",
    appreciationTrends: "Steady upward movement in property values.",
    demandForecast: "Increasing demand from global investors.",
    rentalPerformance: "High rental yields in the luxury segment.",
    indicators: [
      { label: "Growth", value: "+5%", trend: "up" },
      { label: "Demand", value: "High", trend: "up" },
    ],
  },
  whyInvest: {
    cards: [
      { icon: "💎", title: "Scarcity", description: "Limited availability of premium plots." },
      { icon: "📈", title: "ROI", description: "Strong rental performance history." },
    ],
  },
  facts: {
    stats: [
      { label: "Area", value: "1", unit: "Million Sqm" },
      { label: "Units", value: "500+", unit: "Units" },
    ],
  },
  economicImpact: {
    commercialActivity: "High-end retail and commercial hubs.",
    businessEcosystem: "Integrated business support centers.",
    employmentGen: "Significant job creation in luxury services.",
    tourismContribution: "Key destination for luxury tourism.",
    futurePlans: "Expansion of the commercial district.",
  },
  location: {
    mapCenter: { lat: 23.61, lng: 58.34 },
    landmarks: [
      { name: "International Airport", distance: "20 km", time: "15 mins" },
    ],
  },
  investorPriorities: {
    points: [
      { title: "Strategic Asset", description: "Prime land value ensures stability." },
      { title: "Luxury Appeal", description: "High demand for prestige addresses." },
    ],
  },
  gallery: {
    categories: [
      { name: "Architecture", images: ["/p3.jpg", "/p4.jpg"] },
    ],
  },
  faqs: [
    { question: "Is this a good investment?", answer: "Yes, the scarcity of luxury assets in this area ensures value." },
  ],
  blogCategoryTag: "investment-guides",
};

export const COMMUNITIES_DATA: Record<string, CommunityMetadata> = {
  "al-mouj": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "PRESTIGIOUS WATERFRONT LIVING • WORLD-CLASS GOLF",
      locationBadge: "Muscat, Oman",
      investmentScore: "9.8/10",
      startingPrice: "OMR 450,000",
      bannerImage: "/communities/Al Mouj/1 (1).jpg",
    },
    overview: {
      developer: "Al Mouj Muscat",
      propertyTypes: ["Villas", "Apartments", "Penthouses"],
      avgRoi: "8.2%",
      rentalYield: "7.5%",
      completionStatus: "Fully Operational",
      airportDistance: "15 Mins",
      lifestyleRating: "⭐⭐⭐⭐⭐",
    },
    introduction: {
      title: "Discover Al Mouj",
      content: "Al Mouj Muscat is not just a destination; it is a lifestyle statement. A breathtaking waterfront community that seamlessly blends Mediterranean charm with Omani hospitality.",
      highlights: ["World-class Marina", "18-hole golf course", "Luxury retail", "Gated enclaves"],
    },
    brochure: {
      trustMessage: "Receive exclusive investment insights and current availability for Oman's most prestigious address.",
      incentives: ["Priority Access", "Market Valuation Report", "Personalized Consultation"],
    },
    about: {
      vision: "To redefine luxury living in Oman by creating an integrated waterfront community.",
      masterplan: "A master-planned development featuring interconnected lagoons and a professional marina.",
      lifestyle: "A balanced mix of leisure and luxury, where yachting and golfing are daily routines.",
      amenities: [
        { icon: "⚓", title: "The Marina", description: "Direct access to the Arabian Gulf." },
        { icon: "⛳", title: "Golf Course", description: "18-hole championship course." },
        { icon: "🛍️", title: "Retail Promenade", description: "Curated luxury brands." },
        { icon: "🌊", title: "Waterfront Walk", description: "Manicured paths along lagoons." },
      ],
      infrastructure: "State-of-the-art utilities and smart home integration.",
      growthPotential: "Strong capital appreciation due to high demand.",
      images: [{ url: "/p3.jpg", caption: "The Heart of Al Mouj Marina" }],
    },
    investmentAnalysis: {
      marketOutlook: "Bullish. Scarcity of premium waterfront land makes it a high-demand asset.",
      appreciationTrends: "Consistent 5-7% annual growth.",
      demandForecast: "Increasing demand from diplomatic and corporate circles.",
      rentalPerformance: "Top-tier performance with high occupancy.",
      indicators: [
        { label: "Capital Growth", value: "+6.2%", trend: "up" },
        { label: "Demand Index", value: "High", trend: "up" },
        { label: "Vacancy Rate", value: "2.1%", trend: "down" },
      ],
    },
    whyInvest: {
      cards: [
        { icon: "📈", title: "Capital Appreciation", description: "Unmatched growth potential due to strategic location." },
        { icon: "💰", title: "Rental Income", description: "High yields from executive rental market." },
        { icon: "📍", title: "Prime Location", description: "Ideally situated for access to city and sea." },
        { icon: "🛡️", title: "Safe Haven", description: "Strong legal framework and reputation." },
      ],
    },
    facts: {
      stats: [
        { label: "Total Area", value: "4", unit: "Million Sqm" },
        { label: "Properties", value: "2,500+", unit: "Units" },
        { label: "Waterfront", value: "12", unit: "Kilometers" },
        { label: "Golf Holes", value: "18", unit: "Holes" },
      ],
    },
    economicImpact: {
      commercialActivity: "Hub for luxury retail and hospitality.",
      businessEcosystem: "Attracts international businesses.",
      employmentGen: "Created thousands of jobs in hospitality.",
      tourismContribution: "Primary attraction for luxury tourists.",
      futurePlans: "Expansion of retail zones and new residential phases.",
    },
    location: {
      mapCenter: { lat: 23.618, lng: 58.342 },
      landmarks: [
        { name: "Muscat Int Airport", distance: "15 km", time: "12 mins" },
        { name: "Royal Opera House", distance: "8 km", time: "10 mins" },
      ],
    },
    investorPriorities: {
      points: [
        { title: "Scarcity Value", description: "Limited waterfront land makes this a legacy asset." },
        { title: "Institutional Quality", description: "Managed by world-class teams." },
      ],
    },
    gallery: {
      categories: [
        { name: "Architecture", images: ["/p3.jpg", "/p4.jpg"] },
        { name: "Lifestyle", images: ["/p1.jpg", "/p2.jpg"] },
      ],
    },
    faqs: [
      { question: "Is Al Mouj a good investment?", answer: "Yes, it remains one of the most stable luxury assets in Oman." },
    ],
    blogCategoryTag: "investment-guides",
  },
  "aida": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "THE FUTURE OF LUXURY • COASTAL SOPHISTICATION",
      locationBadge: "Southern Coast, Oman",
      investmentScore: "9.2/10",
      startingPrice: "OMR 280,000",
      bannerImage: "/communities/AIDA/1 (1).jpeg",
    },
    overview: {
      developer: "AIDA Developers",
      propertyTypes: ["Villas", "Apartments"],
      avgRoi: "7.5%",
      rentalYield: "6.8%",
      completionStatus: "Under Construction",
      airportDistance: "45 Mins",
      lifestyleRating: "⭐⭐⭐⭐",
    },
    introduction: {
      title: "Discover AIDA",
      content: "A visionary development that redefines the coastal experience, combining modern architecture with the raw beauty of Oman's southern coast.",
      highlights: ["Architectural marvels", "Pristine beach access", "Sustainable design", "Wellness centers"],
    },
    brochure: {
      trustMessage: "Be part of the next big wave. Request the AIDA exclusive brochure for early-bird pricing.",
      incentives: ["Off-plan Pricing", "Payment Plan Options", "VIP Site Visit"],
    },
    about: {
      vision: "To create a sustainable coastal paradise harmonizing luxury and nature.",
      masterplan: "Phased development focusing on low-density residential and luxury resorts.",
      lifestyle: "Slow-living philosophy focused on wellness and absolute privacy.",
      amenities: [
        { icon: "🏖️", title: "Private Beaches", description: "Untouched white sands." },
        { icon: "🧘", title: "Wellness Hub", description: "State-of-the-art spas." },
      ],
      infrastructure: "Eco-friendly energy and smart water management.",
      growthPotential: "High potential as a new luxury tourism hub.",
      images: [{ url: "/p1.jpg", caption: "The AIDA Coastal Vista" }],
    },
    investmentAnalysis: {
      marketOutlook: "Growth. AIDA is pioneering the luxury market in a new region.",
      appreciationTrends: "Significant potential as first phases complete.",
      demandForecast: "High demand for secondary and vacation homes.",
      rentalPerformance: "Projected high yields from luxury tourism.",
      indicators: [
        { label: "Potential Growth", value: "+12%", trend: "up" },
        { label: "Risk Profile", value: "Moderate", trend: "stable" },
      ],
    },
    whyInvest: {
      cards: [
        { icon: "🚀", title: "First-Mover Advantage", description: "Enter a new luxury market before peak valuation." },
        { icon: "🌊", title: "Natural Beauty", description: "Irreplaceable coastal location." },
      ],
    },
    facts: {
      stats: [
        { label: "Project Area", value: "2", unit: "Million Sqm" },
        { label: "Projected Units", value: "1,200", unit: "Units" },
      ],
    },
    economicImpact: {
      commercialActivity: "Development of new luxury hotels.",
      businessEcosystem: "New ecosystem of luxury services.",
      employmentGen: "Creation of construction and operational jobs.",
      tourismContribution: "Significant increase in luxury arrivals.",
      futurePlans: "International boutique airport connection.",
    },
    location: {
      mapCenter: { lat: 17.24, lng: 54.09 },
      landmarks: [
        { name: "Salalah Airport", distance: "30 km", time: "25 mins" },
      ],
    },
    investorPriorities: {
      points: [
        { title: "Strategic Diversification", description: "Diversify away from the capital." },
        { title: "Eco-Luxury Appeal", description: "Capitalize on sustainable living trends." },
      ],
    },
    gallery: {
      categories: [
        { name: "Concept", images: ["/p1.jpg", "/p2.jpg"] },
      ],
    },
    faqs: [
      { question: "When will AIDA be completed?", answer: "Phased delivery, first units expected in 2027." },
    ],
    blogCategoryTag: "market-reports",
  },
  "muscat-bay": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "SOPHISTICATED SERENITY • PEAKS & WATERS",
      locationBadge: "Muscat Coast",
      investmentScore: "9.6/10",
      startingPrice: "OMR 600,000",
      bannerImage: "/communities/Muscat Bay/image.png",
    },
  },
  "sultan-haitham-city": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "VISIONARY URBANISM • THE FUTURE OF OMAN",
      locationBadge: "Muscat Central",
      investmentScore: "9.4/10",
      startingPrice: "OMR 200,000",
      bannerImage: "/communities/Sultan Haithem City/1.jpg",
    },
  },
  "jebel-sifah": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "COASTAL ESCAPE • NATURE'S LUXURY",
      locationBadge: "East Muscat",
      investmentScore: "8.8/10",
      startingPrice: "OMR 150,000",
      bannerImage: "/communities/Jebel Sifah/1 (1).png",
    },
  },
  "the-sustainable-city": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "ECO-INNOVATION • ZERO-CARBON LUXURY",
      locationBadge: "Muscat",
      investmentScore: "9.1/10",
      startingPrice: "OMR 220,000",
      bannerImage: "/sustainable-city.jpeg",
    },
  },
  // "madinat-al-irfan": {
  //   ...DEFAULT_DATA,
  //   hero: {
  //     tagline: "THE NEW HEART OF MUSCAT • ARCHITECTURAL BRILLIANCE",
  //     locationBadge: "Muscat Central",
  //     investmentScore: "9.3/10",
  //     startingPrice: "OMR 300,000",
  //     bannerImage: "/communities/Madinat Al Irfan/1 (1).jpg",
  //   },
  // },
  "hawana-salalah": {
    ...DEFAULT_DATA,
    hero: {
      tagline: "SOVEREIGN SHORES • THE JEWEL OF THE SOUTH",
      locationBadge: "Southern Coast, Oman",
      investmentScore: "9.0/10",
      startingPrice: "OMR 250,000",
      bannerImage: "/communities/Hawana Salalah/1 (1).jpg",
    },
  },
};
