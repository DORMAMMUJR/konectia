"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { User } from "@/types";

function AuthContextHydrator() {
  const { data: session } = useSession();
  const { setRole, setUser } = useAuthStore();

  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      const mappedUser: User = {
        id: user.id || "",
        name: user.name || "Usuario",
        avatarUrl: user.image || user.avatarUrl || "/images/featured-provider.png",
        role: user.role || "guest",
        location: user.location || "Ubicación no especificada",
        isVerified: user.isVerified || false,
        verificationLevel: user.verificationLevel || "none",
      };
      setUser(mappedUser);
      setRole(user.role || "guest");
    } else {
      setUser(null);
      setRole("guest");
    }
  }, [session, setUser, setRole]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextHydrator />
      {children}
    </SessionProvider>
  );
}
