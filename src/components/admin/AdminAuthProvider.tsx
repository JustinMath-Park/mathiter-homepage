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

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin, loading, configured }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
