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
            <script src="https://upload-widget.cloudinary.com/latest/global/all.js"
            type="text/javascript" />
          
            
          {children}
          </body>
        </AuthProvider>
      </SesionProvider>
  </html>
  );
}

