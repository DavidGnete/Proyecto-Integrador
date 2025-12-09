"use client"
import Link from "next/link";

/* import Navbar from "./Navbar"; */
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
/* import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal"; */
/* import { Button } from "@heroui/button"; */
/* import handleWhatsAppClick from './whattsap'; */

export default function Links() {

  return (
  <nav
  className="
    fixed top-2 left-1/2 -translate-x-1/2
  w-full max-w-7xl
  bg-transparent backdrop-blur-md
  border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]
  rounded-2xl
  py-4 px-8
  z-50
  "
>

  <div className="flex gap-8 text-white font-bold text-2xl">
    <Link href="/Home" className="hover:text-white/70 transition-colors">Inicio</Link>
    <Link href="/contact" className="hover:text-white/70 transition-colors">Contactanos</Link>
    <Link href="/config" className="hover:text-white/70 transition-colors">Configuración</Link>
    <Link href="/zustand-demo" className="hover:text-white/70 transition-colors">Ditails</Link> 
  </div>

</nav>

  );
}
