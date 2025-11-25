import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "layout y template",
  description: "Demo layout y templates",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
    <video
    className="hidden sm:block absolute inset-0 w-full h-full object-cover -z-10"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-hidden="true"
    >
    <source src="/videos/coworking.mp4" type="video/mp4" />
    </video>


    <div className="absolute inset-0 bg-black/40 -z-5" />

    <main className="relative z-10 flex min-h-screen items-center justify-center">
      {children}
    </main>
    </div>
  );
}

