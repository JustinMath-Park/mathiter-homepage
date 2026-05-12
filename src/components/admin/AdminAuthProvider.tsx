"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getClientAuth,
  isFirebaseClientConfigured,
  onAuthStateChanged,
  isAdminEmail,
  type User,
} from "@/lib/firebase-client";

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
};

const AdminAuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  loading: true,
  configured: false,
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured] = useState(isFirebaseClientConfigured());

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = isAdminEmail(user?.email);

  // Once an admin has signed in on this browser, mark localStorage so the
  // public blog view tracker (BlogViewTracker.tsx) can skip counting views
  // from this device. Justin uses Tailscale (100.x.x.x is internal, not
  // public IP), so IP-only exclusion is unreliable — localStorage is the
  // robust path.
  useEffect(() => {
    if (isAdmin && typeof window !== "undefined") {
      window.localStorage.setItem("mathiter_admin_seen", "1");
    }
  }, [isAdmin]);

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin, loading, configured }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
