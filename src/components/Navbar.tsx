"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession(); 
  const router = useRouter();


  return (
    <nav className="flex justify-between p-4">
       {session?.user ? (
        // If user is logged in
       <div className="flex items-center gap-4 text-white">
          <div className="flex flex-col">
            <p className="font-medium">
              Bienvenido {session.user.name}
            </p>
            <span className="w-full h-px bg-white/40 mt-1" />
        </div>
           <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
         
        </div>
      ) : (
        // If no user is logged in
        <button
          onClick={() => router.push("/login")}
          className="relative 
          px-4 lg:px-5 py-2.5
              text-white text-base lg:text-lg font-bold
              font-medium text-sm
              rounded-full
              hover:bg-slate-100 hover:text-slate-900
              transition-all duration-200
              group"
        >
          <span className="flex items-center gap-2 cursor-pointer">
            <svg className="w-5 h-7 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1 " />
            </svg>
            Inicia Sesión
          </span>
        </button>
      )}
    </nav>
  );
}

