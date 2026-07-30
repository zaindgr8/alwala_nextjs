// Local database types & enums — replaces the generated `@prisma/client` types
// now that all data access goes through Supabase. Values mirror the Postgres
// enums and table columns exactly (see the former prisma/schema.prisma).

export enum PropertyType {
  APARTMENT = "APARTMENT",
  VILLA = "VILLA",
  TOWNHOUSE = "TOWNHOUSE",
  PENTHOUSE = "PENTHOUSE",
  DUPLEX = "DUPLEX",
  STUDIO = "STUDIO",
  COMMERCIAL = "COMMERCIAL",
  LAND = "LAND",
  OFFICE = "OFFICE",
  RETAIL = "RETAIL",
}

export enum PropertyStatus {
  OFF_PLAN = "OFF_PLAN",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  READY_TO_MOVE = "READY_TO_MOVE",
  FOR_SALE = "FOR_SALE",
}

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
}

export enum UserStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum InvestmentGrade {
  A = "A",
  B = "B",
  C = "C",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  ARCHIVED = "ARCHIVED",
}

// ---- Row types (shape of a single row as returned by Supabase) ----

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  slug: string;
  userId: string;
  fullName: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  location: string;
  imageUrl: string | null;
  featured: boolean;
  metadata: unknown | null;
  createdAt: string;
}

export interface InvestmentMetric {
  id: string;
  propertyId: string;
  expectedRentalYield: number | null;
  roiProjection: number | null;
  paymentPlanDetails: string | null;
  investmentGrade: InvestmentGrade | null;
  lastUpdated: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  city: string;
  location: string;
  communityId: string;
  agentId: string;
  price: number;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSqm: number | null;
  gallery: string[];
  bannerImageUrl: string | null;
  amenities: string[];
  coordinates: unknown | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string | null;
  message: string;
  status: LeadStatus;
  createdAt: string;
}
