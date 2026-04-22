import { create } from "zustand";
import type { UserRole } from "@/types";

interface AuthState {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
}

// Lightweight client-side role cache
// The real auth source of truth is NextAuth's session
export const useAuthStore = create<AuthState>((set) => ({
  currentRole: "guest",
  setRole: (role) => set({ currentRole: role }),
}));
