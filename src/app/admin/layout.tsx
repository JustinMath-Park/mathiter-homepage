import type { Metadata } from "next";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mathiter Admin",
  description: "Mathiter Tutoring blog editor",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-surface min-h-screen">
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}
