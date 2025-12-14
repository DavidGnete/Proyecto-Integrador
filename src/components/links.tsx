"use client"
import Link from "next/link";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Links() {
  const { isAuthenticated } = useAuth();

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[95%] max-w-6xl
        bg-white/90 backdrop-blur-xl
        border border-slate-200/50 
        shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        rounded-full
        py-3 px-8
        z-50
        transition-all duration-300
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]
      "
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/Home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent hidden sm:block">
            WorkPoint
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <Link 
            href="/Home" 
            className="
              relative px-5 py-2.5 
              text-slate-600 font-medium text-sm
              rounded-full
              hover:bg-slate-100 hover:text-slate-900
              transition-all duration-200
              group
            "
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </span>
          </Link>


          {isAuthenticated && (
            <Link 
              href="/config" 
              className="
                relative px-5 py-2.5 
                text-slate-600 font-medium text-sm
                rounded-full
                hover:bg-slate-100 hover:text-slate-900
                transition-all duration-200
                group
              "
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Publica Tu coworkPoint
              </span>
            </Link>
          )}


              <Navbar />
        </div>

        {/* CTA Button */}
        {isAuthenticated && (
          <Link 
            href="/reservar"
            className="
              hidden md:flex items-center gap-2
              px-6 py-2.5
              bg-gradient-to-r from-slate-900 to-slate-800
              text-white font-semibold text-sm
              rounded-full
              shadow-md hover:shadow-xl
              hover:from-slate-800 hover:to-slate-700
              transform hover:scale-105
              transition-all duration-300
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reservar
          </Link>
        )}
      </div>
    </nav>
  );
}
