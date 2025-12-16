"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Links from "@/components/links";
import Products from "@/components/Products";
import EditSpaceModal from "@/components/editcrud";
import DeleteSpaceModal from "@/components/DeleteSpaceModal";
import MercadoPagoWallet from "@/components/MercadoPago";
import { useSession } from "next-auth/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { toast, ToastContainer } from "react-toastify";
import { DateSelectArg } from "@fullcalendar/core";

interface Product {
  id: number;
  categorieId: number;
  maxCapacity: number;
  spaceName: string;
  branchId: number;
  price: number;
  description: string;
  userId: number;
  photos: any[];
  createdAt: string;
  updatedAt: string;
}

interface CreateReservation {
  spaceId: number;
  userId: number;
  start: string;
  end: string;
  notes: string;
}

export default function ProductPage() {
  const whatsappNumber = "+573195510295";
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // ← NUEVO ESTADO
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // ← NUEVO ESTADO
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);


  const { data: session } = useSession();

  // seccion whattsap
const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría saber mas sobre los coworkings que ofrece workPoint");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  useEffect(() => {
    if (!id) {
      setError("ID de producto no válido");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const res = await fetch(
          `https://work-point-9be66ef1d8d3.herokuapp.com/api/space/getById/${id}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Producto no encontrado");
          setLoading(false);
          return;
        }

        setProduct(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error al cargar el producto");
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSelect = (info: DateSelectArg) => {
    setSelectedRange({
      start: info.start,
      end: info.end,
    });
  };

  const handleReservation = async () => {
    if (!selectedRange) {
      toast.error("Por favor selecciona un rango de tiempo");
      return;
    }

    if (!session?.user?.id) {
      toast.error("Usuario no autenticado");
      return;
    }

    const payload: CreateReservation = {
      spaceId: product!.id,
      userId: parseInt(session.user.id),
      start: selectedRange.start.toISOString(),
      end: selectedRange.end.toISOString(),
      notes: "Reserva desde la página del producto",
    };

    try {
      const response = await fetch(
        "https://work-point-9be66ef1d8d3.herokuapp.com/api/Booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        toast.error("Error al crear la reserva");
        return;
      }

      toast.success("Reserva creada con éxito");
      setIsReservationModalOpen(false);
      setSelectedRange(null);
    } catch (error) {
      toast.error("Error al crear la reserva");
    }
  };

  // ← NUEVA FUNCIÓN para manejar actualización exitosa
  const handleUpdateSuccess = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  // ← NUEVA FUNCIÓN para manejar eliminación exitosa
  const handleDeleteSuccess = () => {
    router.back(); // Navegar de vuelta a la lista
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-lg text-slate-600 font-medium">Cargando espacio…</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = product?.photos ?? [];

  const numericPrice =
    typeof product.price === "number"
      ? product.price
      : Number(String(product.price).replace(/[^0-9.-]+/g, "")) || 0;

  return (
    <main>
      <ToastContainer />
      
      <section className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
     
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-50/50 to-yellow-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8 relative z-10">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              
         
              <div className="p-6 md:p-8 lg:p-8">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 shadow-inner">
                  {images.length > 0 ? (
                    <Image
                      src={images[currentIndex].urlImage}
                      alt={product.spaceName}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                      <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Sin imágenes disponibles</span>
                    </div>
                  )}

                  {images.length > 0 && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-medium">
                      {currentIndex + 1} / {images.length}
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:bg-white hover:scale-110 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                          idx === currentIndex
                            ? "ring-2 ring-slate-900 ring-offset-2 opacity-100"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.urlImage}
                          alt={`Thumbnail ${idx + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 lg:p-8 lg:pl-4 flex flex-col">
                <div className="space-y-4 flex-grow">
                  {/* Badge + Edit Button ← NUEVO BOTÓN DE EDICIÓN */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/50">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Espacio Coworking
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Disponible
                      </span>
                    </div>
                    
                  
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="group flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Editar</span>
                    </button>

                  
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="group flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span className="text-sm font-medium">Eliminar</span>
                    </button>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    {product.spaceName}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-slate-900">4.9</span>
                      <span className="text-slate-500">(128 reseñas)</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-slate-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Centro de la ciudad</span>
                    </div>
                  </div>

                  {/* Descripción con botón de edición inline */}
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-slate-600 leading-relaxed text-base flex-1">
                        {product.description || "Espacio de trabajo moderno y funcional, diseñado para impulsar tu productividad. Ideal para freelancers, startups y equipos remotos."}
                      </p>
                      {/* Botón de edición inline pequeño */}
                      <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                        title="Editar descripción"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Features - se mantiene igual */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">WiFi Premium</p>
                        <p className="text-xs text-slate-500">Alta velocidad</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Capacidad</p>
                        <p className="text-xs text-slate-500">{product.maxCapacity || 10} personas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">24/7</p>
                        <p className="text-xs text-slate-500">Acceso flexible</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Monitor</p>
                        <p className="text-xs text-slate-500">Pantalla 27"</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Precio por día</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900">
                          ${numericPrice.toLocaleString("es-CO")}
                        </span>
                        <span className="text-slate-500 text-lg">COP</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cancelación gratuita
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 cursor-pointer">

                    <button
                          onClick={() => {
                            if (!session) {
                              setIsLoginModalOpen(true);
                              return;
                            }
                            setIsReservationModalOpen(true);
                          }}
                          className="py-2  rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold hover:from-slate-800 hover:to-slate-700 hover:shadow-lg hover:shadow-slate-300/30 transition-all duration-300 flex items-center justify-center cursor-pointer gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Reservar
                        </button>


                    <button onClick={() => {
                      handleWhatsAppClick();
                    }}
                    className="py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      
                      Contacta Agente Chat
                    </button>
                    
                    <MercadoPagoWallet
                    title={product.spaceName}
                    price={numericPrice}
                    spaceId={product.id}
                    isAuthenticated={!!session}
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-8 flex">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {product.spaceName}
            </h1>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-slate-600 leading-relaxed text-base">
              {product.description || "Espacio de trabajo moderno y funcional, diseñado para impulsar tu productividad. Ideal para freelancers, startups y equipos remotos."}
            </p>
          </div>
        </div>
        <Products />
      </section>

      {/* ← MODAL DE EDICIÓN */}
      {product && (
        <EditSpaceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={product}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* ← MODAL DE ELIMINACIÓN */}
      {product && (
        <DeleteSpaceModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          spaceId={product.id}
          spaceName={product.spaceName}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Modal de Login Requerido */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Iniciar Sesión Requerido</h2>
            <p className="mb-4">Debes iniciar sesión para poder reservar este espacio.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => { setIsLoginModalOpen(false); router.push('/login'); }} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => setIsLoginModalOpen(false)} 
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reserva */}
      {isReservationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reservar {product?.spaceName}</h2>
              <button
                onClick={() => setIsReservationModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="min-h-[400px] mb-4">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  interactionPlugin,
                  timeGridPlugin,
                  listPlugin,
                ]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                events={[]}
                selectable={true}
                select={handleSelect}
                selectMirror={true}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsReservationModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleReservation}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    

    </main>
  );
}