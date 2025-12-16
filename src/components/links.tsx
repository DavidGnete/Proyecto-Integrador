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
      {/* ========== NAVBAR PRINCIPAL - TRANSPARENTE ========== */}
      <nav
        className="
          fixed top-0 left-0 right-0
          w-full
          bg-transparent
          z-50
        "
      >
        {/* Línea decorativa superior sutil */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div 
          className="
            w-full
            px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20
            py-5 sm:py-6 lg:py-7
            flex items-center justify-between
          "
        >
          
          {/* ===== LOGO ===== */}
          <Link href="/Home" className="flex items-center gap-3 group">
            {/* Icono del logo */}
            <div 
              className="
                w-10 h-10 sm:w-11 sm:h-11
                bg-white/5
                border border-white/10
                rounded-xl
                flex items-center justify-center 
                group-hover:bg-white/10
                group-hover:border-white/20
                transition-all duration-300
              "
            >
              <svg 
                className="w-5 h-5 sm:w-5 sm:h-5 text-white/90" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
            
            {/* Texto del logo */}
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-semibold tracking-tight">
                <span className="text-white">Work</span>
                <span className="text-white/50">Point</span>
              </span>
            </div>
          </Link>

          {/* ===== NAVEGACIÓN DESKTOP ===== */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* Link Inicio */}
            <Link 
              href="/Home" 
              className="
                group
                px-4 lg:px-5 py-2.5
                text-white/60 text-sm font-medium
                rounded-full
                hover:text-white
                hover:bg-white/5
                transition-all duration-300
                flex items-center gap-2.5
              "
            >
              <svg 
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span className="hidden lg:inline">Inicio</span>
            </Link>

            {/* Link Espacios */}
            <Link 
              href="/espacios" 
              className="
                group
                px-4 lg:px-5 py-2.5
                text-white/60 text-sm font-medium
                rounded-full
                hover:text-white
                hover:bg-white/5
                transition-all duration-300
                flex items-center gap-2.5
              "
            >
              <svg 
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" 
                />
              </svg>
              <span className="hidden lg:inline">Espacios</span>
            </Link>

            {/* Link Publicar (solo autenticados) */}
            {isAuthenticated && (
              <Link 
                href="/config" 
                className="
                  group
                  px-4 lg:px-5 py-2.5
                  text-white/60 text-sm font-medium
                  rounded-full
                  hover:text-white
                  hover:bg-white/5
                  transition-all duration-300
                  flex items-center gap-2.5
                "
              >
                <svg 
                  className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                <span className="hidden lg:inline">Publicar</span>
              </Link>
            )}

            {/* Separador vertical */}
            <div className="w-px h-5 bg-white/10 mx-3" />

            {/* Componente Navbar (auth buttons) */}
            <Navbar />
          </div>

          {/* ===== BOTÓN MENÚ MÓVIL ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              md:hidden 
              w-11 h-11
              flex items-center justify-center
              rounded-xl
              bg-white/5
              border border-white/10
              hover:bg-white/10
              hover:border-white/20
              transition-all duration-300
            "
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg 
              className="w-5 h-5 text-white/90" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ========== MENÚ MÓVIL ========== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          
          {/* Overlay oscuro con blur */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Panel del menú */}
          <div 
            className="
              absolute 
              top-24 sm:top-28
              left-4 right-4
              sm:left-1/2 sm:-translate-x-1/2 sm:right-auto
              sm:w-[85%] 
              max-w-sm
              bg-black/90
              backdrop-blur-xl
              border border-white/10
              rounded-2xl 
              shadow-2xl
              overflow-hidden
            "
          >
            {/* Encabezado del menú */}
            <div className="px-5 pt-5 pb-3">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
                Menú
              </p>
            </div>

            {/* Links principales */}
            <div className="px-3 pb-3 space-y-1">
              
              {/* Link Inicio */}
              <Link 
                href="/Home" 
                onClick={closeMenu}
                className="
                  flex items-center gap-4 
                  px-4 py-4
                  rounded-xl 
                  hover:bg-white/5
                  transition-all duration-300
                  group
                "
              >
                <div 
                  className="
                    w-11 h-11 
                    rounded-xl 
                    bg-white/5 
                    border border-white/10
                    flex items-center justify-center
                    group-hover:bg-white/10
                    transition-all duration-300
                  "
                >
                  <svg 
                    className="w-5 h-5 text-white/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Inicio</p>
                  <p className="text-white/40 text-xs mt-0.5">Página principal</p>
                </div>
              </Link>

              {/* Link Espacios */}
              <Link 
                href="/espacios" 
                onClick={closeMenu}
                className="
                  flex items-center gap-4 
                  px-4 py-4
                  rounded-xl 
                  hover:bg-white/5
                  transition-all duration-300
                  group
                "
              >
                <div 
                  className="
                    w-11 h-11 
                    rounded-xl 
                    bg-white/5 
                    border border-white/10
                    flex items-center justify-center
                    group-hover:bg-white/10
                    transition-all duration-300
                  "
                >
                  <svg 
                    className="w-5 h-5 text-white/70" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Espacios</p>
                  <p className="text-white/40 text-xs mt-0.5">Explora nuestros espacios</p>
                </div>
              </Link>

              {/* Link Publicar (solo autenticados) */}
              {isAuthenticated && (
                <Link 
                  href="/config" 
                  onClick={closeMenu}
                  className="
                    flex items-center gap-4 
                    px-4 py-4
                    rounded-xl 
                    hover:bg-white/5
                    transition-all duration-300
                    group
                  "
                >
                  <div 
                    className="
                      w-11 h-11 
                      rounded-xl 
                      bg-violet-500/10 
                      border border-violet-500/20
                      flex items-center justify-center
                      group-hover:bg-violet-500/20
                      transition-all duration-300
                    "
                  >
                    <svg 
                      className="w-5 h-5 text-violet-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M12 4v16m8-8H4" 
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Publicar</p>
                    <p className="text-white/40 text-xs mt-0.5">Publica tu CoworkPoint</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Separador */}
            <div className="h-px bg-white/5 mx-5" />

            {/* Sección Navbar (login/logout) */}
            <div className="p-5">
              <Navbar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}