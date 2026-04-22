import { create } from "zustand";
import type { UserRole, User } from "@/types";
import { signOut } from "next-auth/react";

interface AuthState {
  currentRole: UserRole;
  currentUser: User | null;
  setRole: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Lightweight client-side role cache
// The real auth source of truth is NextAuth's session
export const useAuthStore = create<AuthState>((set) => ({
  currentRole: "guest",
  currentUser: null,
  setRole: (role) => set({ currentRole: role }),
  setUser: (user) => set({ currentUser: user }),
  logout: () => {
    set({ currentRole: "guest", currentUser: null });
    signOut({ callbackUrl: "/" });
  },
}));
