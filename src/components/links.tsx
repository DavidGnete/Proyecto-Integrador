"use client"
import Link from "next/link";
import Navbar from "./Navbar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Links() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
  
      <nav
        className="
          sticky top-0 w-full
          bg-white shadow-sm border-b border-slate-200
          z-50
        "
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* ===== LOGO ===== */}
          <Link href="/Home" className="flex items-center gap-2.5">
            <div 
              className="
                w-8 h-8
                bg-gradient-to-br from-slate-900 to-slate-700 
                rounded-lg
                flex items-center justify-center 
                shadow-md
              "
            >
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
            <span 
              className="
                text-lg sm:text-xl font-bold 
                bg-gradient-to-r from-slate-900 to-slate-600 
                bg-clip-text text-transparent
                hidden xs:block
              "
            >
              WorkPoint
            </span>
          </Link>

          {/* ===== LINKS DESKTOP ===== */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-2">
            
            {/* Link Inicio */}
            <Link 
              href="/Home" 
              className="
                px-3 lg:px-4 py-2
                text-slate-600 font-medium text-sm
                rounded-full
                hover:bg-slate-100 hover:text-slate-900
                transition-colors duration-200
                flex items-center gap-2
              "
            >
              <svg 
                className="w-4 h-4 opacity-70" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span className="hidden lg:inline">Inicio</span>
            </Link>

            {/* Link Publicar (solo autenticados) */}
            {isAuthenticated && (
              <Link 
                href="/config" 
                className="
                  px-3 lg:px-4 py-2
                  text-slate-600 font-medium text-sm
                  rounded-full
                  hover:bg-slate-100 hover:text-slate-900
                  transition-colors duration-200
                  flex items-center gap-2
                "
              >
                <svg 
                  className="w-4 h-4 opacity-70" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                <span className="hidden lg:inline">Publicar</span>
              </Link>
            )}

            {/* Separador */}
            <div className="w-px h-6 bg-slate-200 mx-1 lg:mx-2" />

            {/* Componente Navbar (auth buttons) */}
            <Navbar />
          </div>

          {/* ===== BOTÓN MENÚ MÓVIL ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              lg:hidden 
              p-2 
              rounded-lg
              hover:bg-slate-100 
              transition-colors duration-200
            "
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ========== MENÚ MÓVIL ========== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Panel del menú */}
          <div 
            className="
              absolute 
              top-16 sm:top-20 
              left-1/2 -translate-x-1/2 
              w-[90%] sm:w-[85%] 
              max-w-md
              bg-white 
              rounded-2xl 
              shadow-xl
              border border-slate-100
              overflow-hidden
            "
          >
            {/* Links principales */}
            <div className="p-4 sm:p-5 space-y-1">
              
              {/* Link Inicio */}
              <Link 
                href="/Home" 
                onClick={closeMenu}
                className="
                  flex items-center gap-3 
                  px-4 py-3 
                  text-slate-700 font-medium 
                  rounded-xl 
                  hover:bg-slate-50 
                  transition-colors duration-200
                "
              >
                <svg 
                  className="w-5 h-5 text-slate-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                Inicio
              </Link>

              {/* Link Publicar (solo autenticados) */}
              {isAuthenticated && (
                <Link 
                  href="/config" 
                  onClick={closeMenu}
                  className="
                    flex items-center gap-3 
                    px-4 py-3 
                    text-slate-700 font-medium 
                    rounded-xl 
                    hover:bg-slate-50 
                    transition-colors duration-200
                  "
                >
                  <svg 
                    className="w-5 h-5 text-slate-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                  Publica Tu CoworkPoint
                </Link>
              )}
            </div>

            {/* Separador */}
            <div className="h-px bg-slate-100 mx-4" />

            {/* Sección Navbar (login/logout) */}
            <div className="p-4 sm:p-5">
              <Navbar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}