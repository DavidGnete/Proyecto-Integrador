"use client";
import {Prompt, Plus_Jakarta_Sans, Neuton} from "next/font/google";
import Button from "@/components/Button";
import Products from "@/components/Products";
import { useRef } from "react";


const promptFont = Prompt({ subsets: ["latin"], weight: "400" });
const plusJakartaSansFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "200" });
const neutonFont = Neuton({ subsets: ["latin"], weight: "400" });
export default function Home(){

const productsRef = useRef<HTMLDivElement>(null);

const scrollpToProducts = () => {
  productsRef.current?.scrollIntoView({ behavior: "smooth" });
}
return (
  <div className="relative w-full bg-black">
    

    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-800/40 rounded-full blur-[200px]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-slate-700/30 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-violet-900/20 rounded-full blur-[150px]" />
    
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
      />
    </div>


    <div className="relative z-10 w-full h-screen">
      <video
        className="hidden sm:block w-full h-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/coworking.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="absolute top-[45%] md:top-1/2 lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        flex flex-col justify-center items-center 
        w-[95%] sm:w-[85%] md:w-[80%] lg:w-[60%] 
        gap-4 sm:gap-6 text-center z-20 
        px-4">
        <h1 className={`${promptFont.className} 
          text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
          text-white font-extrabold 
          drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]
          leading-tight`}>
          Encuentra <br />
          <span className="text-white/90">Tu</span>
          <span className="text-slate-400/90 "> WorkPoint</span>

        </h1>
        <p className={`${plusJakartaSansFont.className} 
          text-white/70 
          text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 
          leading-relaxed drop-shadow-lg 
          max-w-4xl`}>
          A través de WorkPoint accederás a espacios de alojamiento, trabajo y vivienda, diseñados para inspirar, conectar personas y brindar soluciones a las dinámicas de la actualidad.
          <span className="hidden sm:inline">
            <br /><br />
            <span className="text-white/50">
              Te acercamos a una comunidad, para rodearte de personas apasionadas, enriquecer tu estilo de vida y acceder a oportunidades profesionales y de negocio.
            </span>
          </span>
        </p>
        <Button
          onClick={() => { scrollpToProducts()}}
        variant="secondary" className="shadow-[0_0_40px_rgba(0,0,0,0.5)] mt-2 sm:mt-4">
          Agenda tu visita
        </Button>
      </div>
    </div>

    <div className="relative z-10 w-full">
      
      <div className="absolute inset-0 bg-black" />
      
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-900/15 rounded-full blur-[200px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-700/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-violet-800/10 rounded-full blur-[160px]" />


  
      <div className="relative flex flex-col items-center w-full 
        px-6 sm:px-8 md:px-12 lg:px-16 
        pt-0 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 
        pb-20 sm:pb-28 md:pb-32 lg:pb-40">
        
        <h2 className={`${neutonFont.className} 
          text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl 
          text-center`}>
          <strong className="text-slate-400/90 drop-shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            WORK
          </strong>
          <span className="text-white/80">POINT</span>
        </h2>
        <div  className="w-30 sm:w-160 h-px bg-white/20 mb-8 sm:mb-12 via-violet-500/50 to-transparent my-6" />
        
        <p className={`${plusJakartaSansFont.className} 
          text-white/60 text-center 
          text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 
          w-full max-w-3xl leading-relaxed
          px-2`}>
          Contamos con <span className="text-white/80">Oficinas</span>, <span className="text-white/80">Co-Offices</span>, <span className="text-white/80">Coworking</span>, Auditorios, Salas de Reuniones, y Espacios para Talleres Interactivos, en múltiples ubicaciones premium en la ciudad de Medellín.
        </p>
        <p className={`${plusJakartaSansFont.className} 
          text-white/40 text-center 
          text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 
          w-full max-w-3xl mt-4 sm:mt-6 leading-relaxed
          px-2`}>
          Durante años hemos construido una filosofía, en donde exaltamos el poder que hay detrás de hacer feliz a las personas en su día de trabajo, generando verdaderas conexiones y provocando la transferencia de conocimiento entre nuestros usuarios.
        </p>
      </div>

      <div className="relative flex flex-col items-center w-full ">
        
        <span className={`${plusJakartaSansFont.className} 
          text-white/30 
          text-xs sm:text-sm 
          tracking-[0.2em] sm:tracking-[0.3em] 
          uppercase mb-3 sm:mb-4`}>
          Explora
        </span>
        
        <h2 className={`${neutonFont.className} 
          text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 
          text-white/90 mb-3 sm:mb-4 
          text-center`}>
          Nuestros Espacios
        </h2>
        
        <div ref={productsRef} className="w-12 sm:w-16 h-px bg-white/20 mb-8 sm:mb-12" />
        
        <Products />
      </div>


     
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>

  </div>
)
}