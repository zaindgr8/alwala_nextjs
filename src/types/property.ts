import { Property as PrismaProperty, Community, Agent, InvestmentMetric, User } from '@/types/db';

export type PropertyType = string;
export type PropertyStatus = string;
export type AgentRole = User['role'];
export type InvestmentGrade = InvestmentMetric['investmentGrade'];

export interface Amenity {
  title: string;
  icon: string;
}

export interface PaymentPlanStep {
  percentage: string;
  condition: string;
  timing: string;
}

export interface PropertyUI {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  community: string;
  price: number;
  currency: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  plotArea?: number;
  description: string;
  images: string[];
  amenities: Amenity[];
  paymentPlan: PaymentPlanStep[];
  highlights: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  createdAt: string;
}

export interface PropertyWithDetails extends PrismaProperty {
  community: Community;
  agent: Agent;
  metrics?: InvestmentMetric | null;
}

export interface CommunityWithProperties extends Community {
  properties: PrismaProperty[];
}

export interface AgentWithProperties extends Agent {
  properties: PrismaProperty[];
}

export interface PropertyFilters {
  status: PropertyStatus[];
  communities: string[];
  type: PropertyType[];
  minBeds: number;
  maxBeds: number;
  minBaths: number;
  maxBaths: number;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  sortBy: string;
}

