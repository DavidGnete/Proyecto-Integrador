"use client";
import Products from "@/components/Publicard";
export default function Home(){
    return (
        <div>

        {/*Zona de video */}
            <video
                className="hidden sm:block inset-0 w-full h-full object-cover z-0" /* z-0 es el nivel base de la web */
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
    >
    <source src="/videos/coworking.mp4" type="video/mp4" />
    {/* Codigo Pendiente pendiente */}
        {/* <div className="absolute inset-0 bg-black/40 -z-5" /> */}
            </video>
            <div>
            <Products />
            </div>
        </div>

    )
}