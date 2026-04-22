import { create } from "zustand";
import type { UserRole, User } from "@/types";

interface AuthState {
  currentUser: User | null;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  login: (user: User) => void;
  logout: () => void;
}

// Mock users for dev role-switching
const mockClient: User = {
  id: "client-001",
  name: "Carlos Ramírez",
  avatarUrl: "/images/featured-provider.png",
  role: "client",
  location: "Ciudad de México",
  isVerified: true,
  verificationLevel: "standard",
};

const mockProfessional: User = {
  id: "pro-001",
  name: "Ing. Ricardo Mendoza",
  avatarUrl: "/images/featured-provider.png",
  role: "professional",
  location: "Ciudad de México",
  isVerified: true,
  verificationLevel: "premium",
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  currentRole: "guest",
  setRole: (role) => {
    if (role === "client") {
      set({ currentUser: mockClient, currentRole: "client" });
    } else if (role === "professional") {
      set({ currentUser: mockProfessional, currentRole: "professional" });
    } else {
      set({ currentUser: null, currentRole: "guest" });
    }
  },
  login: (user) => set({ currentUser: user, currentRole: user.role }),
  logout: () => set({ currentUser: null, currentRole: "guest" }),
}));
