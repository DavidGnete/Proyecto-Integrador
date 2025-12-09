// app/layout.tsx
import "./globals.css";// ✅ Import your Tailwind/global styles here
import type { Metadata } from "next";
import SesionProvider from "./providers";

export const metadata: Metadata = {
  title: "My App",
  description: "Auth and Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SesionProvider>
      <body>
        <script src="https://upload-widget.cloudinary.com/latest/global/all.js"
        type="text/javascript" />
        
      {children}
      </body>
      </SesionProvider>
  </html>
  );
}

