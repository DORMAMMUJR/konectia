/* ============================================
   INTECNIA TypeScript Type Definitions
   Models the future database schema
   ============================================ */

export type UserRole = "client" | "professional" | "guest";

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  location: string;
  isVerified: boolean;
  verificationLevel: "premium" | "standard" | "none";
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  span?: "large" | "normal" | "wide";
}

export interface VerificationBadge {
  type: "biometric" | "conocer" | "sat";
  label: string;
  sublabel: string;
  status: "verified" | "pending" | "unverified";
  icon: string;
}

export interface Professional extends User {
  role: "professional";
  title: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  completedJobs: number;
  recurringClients: number;
  responseTime: string;
  hourlyRate: number;
  badges: VerificationBadge[];
  education: Education[];
  experience: WorkExperience[];
  portfolio: PortfolioItem[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  expertCount: number;
}

export interface ServiceRequest {
  id: string;
  client: User;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  budgetUnit: "fixed" | "hourly" | "daily" | "monthly";
  urgency: "urgent" | "new" | "standard";
  category: string;
  categoryIcon: string;
  location: string;
  createdAt: string;
}

export interface TrustIndicator {
  icon: string;
  label: string;
  sublabel: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  isActive: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "quotation" | "system";
  quotation?: Quotation;
}

export interface Quotation {
  title: string;
  items: { label: string; amount: number }[];
  total: number;
  duration: string;
  startDate: string;
  warranty: string;
}

export interface Project {
  id: string;
  title: string;
  professional: User;
  progress: number;
  status: "active" | "pending" | "completed";
  imageUrl: string;
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  status: "received" | "released" | "pending";
  date: string;
  transactionId: string;
}

export interface Review {
  id: string;
  authorInitials: string;
  authorName: string;
  rating: number;
  text: string;
  projectType: string;
  date: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}
