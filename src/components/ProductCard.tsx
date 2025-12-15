"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Photo {
  id: number;
  urlImage: string;
}

interface ProductCardProps {
  id: number;
  categorieId: number;
  maxCapacity: number;
  spaceName: string;
  branchId: number;
  price: number;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  categorieId,
  maxCapacity,
  spaceName,
  branchId,
  price,
  description,
  photos,
  userId,
  createdAt,
  updatedAt,
}) => {
  const router = useRouter();

  return (
    <div
      className="group w-full bg-white rounded-xl overflow-hidden 
      border border-gray-200
      transition-all duration-300 ease-out
      hover:shadow-xl hover:border-transparent hover:-translate-y-1"
    >
      {/* Imagen */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          src={photos?.[0]?.urlImage || "/placeholder.jpg"}
          alt={spaceName}
          className="w-full h-full object-cover 
          transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badge de capacidad */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm 
        px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <svg 
            className="w-4 h-4 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" 
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">{maxCapacity}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Header con nombre y precio */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {spaceName}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-xl font-bold text-emerald-600">${price}</span>
            <span className="text-xs text-gray-500 block">/ hora</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Amenidades */}
        <div className="flex items-center gap-4 text-gray-400 text-xs mb-5">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <span>WiFi</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Flexible</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Equipado</span>
          </div>
        </div>

        {/* Botón */}
        <button
          className="w-full bg-gray-900 text-white 
          py-3 px-6 rounded-lg
          font-medium text-sm
          hover:bg-emerald-600
          transition-colors duration-300"
          onClick={() => router.push(`/product/${id}`)}
        >
          Ver disponibilidad
        </button>
      </div>
    </div>
  );
};

export default ProductCard;