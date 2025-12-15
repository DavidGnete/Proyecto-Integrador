// app/layout.tsx
import "./globals.css";// ✅ Import your Tailwind/global styles here
import type { Metadata } from "next";
import SesionProvider from "./providers";
import Links from "@/components/links";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "My App",
  description: "Auth and Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SesionProvider>
        <AuthProvider>
          <body>
            <Links />
            <main className="pt-12 md:pt-16 lg:pt-20 xl:pt-24">
              {children}
            </main>
          </body>
        </AuthProvider>
      </SesionProvider>
  </html>
  );
}

