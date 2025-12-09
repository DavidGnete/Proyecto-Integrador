"use client";
import {Prompt, Plus_Jakarta_Sans, Neuton} from "next/font/google";
import Button from "@/components/Button";
import Products from "@/components/Products";


const promptFont = Prompt({ subsets: ["latin"], weight: "400" });
const plusJakartaSansFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "200" });
const neutonFont = Neuton({ subsets: ["latin"], weight: "400" });
export default function Home(){

    return (
        <div >
            <div className="z-0 relative ">
        {/*Zona de video */}
            <video
                className="hidden sm:block w-full h-full object-cover" /* z-0 es el nivel base de la web */
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
    >
    <source src="/videos/coworking.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 w-full h-60
bg-gradient-to-t from-white/40 via-white/20 to-transparent
rounded-t-3xl -mt-15"></div>
            </div>
            <div className="absolute top-50 flex flex-col justify-center items-center w-[60%] mr-auto gap-x-3 gap-y-5"> 

            <h1 className={`${promptFont.className} text-9xl mt-[0.67em] mb-[0.30em] text-white font-extrabold `} >
                Connecting <br/>
                great people</h1>
                <p className={`${plusJakartaSansFont.className} text-white text-center text-2xl mb-5 ml-50 leading-loose`} >
                A través de NEWO accederás a espacios de alojamiento, trabajo y vivienda, diseñados para inspirar, conectar personas y brindar soluciones a las dinámicas de la actualidad.​​ <br/>

                Te acercamos a una comunidad, para rodearte de personas apasionadas, enriquecer tu estilo de vida y acceder a oportunidades profesionales y de negocio.

                
            </p>
            <Button variant="secondary">Agenda tu visita</Button>
            </div>
            <div className="w-full h-50
            bg-gradient-to-b
            from-gradient/80
            via-transparent/30
            to-gray/80 
            backdrop-blur-[2px]
            -mt-10 ">
            <div className="flex justify-between flex-col items-center w-full mr-auto mx-16  ">
                <div>
                <h2 className={`${neutonFont.className} text-9xl mt-[0.67em] mb-[0.30em] text-white`}><strong>RI</strong>
                <span className="text-violet-400">WORK</span></h2>
                </div>
            <div>
                <p className={`${plusJakartaSansFont.className} text-white text-center text-2xl   w-250 p-10`} >Contamos con Oficinas, Co-Offices, Coworking, Auditorios, Salas de Reuniones, y Espacios para Talleres Interactivos,
                en múltiples ubicaciones premium en la ciudad de Medellín.
                Durante años hemos construido una filosofía, en donde exaltamos el poder que hay detrás de hacer feliz a las personas en su día de trabajo,
                generando verdaderas conexiones y provocando la
                transferencia de conocimiento entre nuestros usuarios.</p>
            </div>
            {/* <Image src="/jazz.jpg" alt="Riwi Work" width={1920} height={1080} className="mt-10"/> */}
            </div>
            </div>
            <div className="p-50">
            <Products />
            </div>
        </div>

    )
}