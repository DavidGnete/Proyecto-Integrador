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
    <>
    <main className="font-sold shadow-md rounded-md"> {/* shadow-md sirve para sombra elementos */} 
        <nav className="flex justify-end p-15 fixed bg-black opacity-70 shadow-md rounded-md w-full z-5"> {/* justify-end, justify-rigth, justify-center */}
            <div className="flex gap-6 text-white ">
            <Link href="/Home" className="hover:text-white-300 transition-colors font-bold">Inicio</Link>
            <Link href="/contact" className="hover:text-gray-200 transition-colors font-bold">Contactanos</Link>
            <Link href="/config" className="hover:text-gray-200 transition-colors font-bold">configuracion</Link>        
            </div>
          </nav>
      </main>
    </>
  );
}
